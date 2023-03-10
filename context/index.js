import React, { useContext, createContext, useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { abiContract, contractAddress } from '../constants';

const fetchContract = (signerOrProvider) => new ethers.Contract(contractAddress, abiContract, signerOrProvider);
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkWalletIsConnected = async () => {
    if (!window.ethereum)
      return console.log('Please install MetaMask for using our NFT platform!');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found.');
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const getContract = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    return contract;
  }

  const connectWallet = async () => {
    if (!window.ethereum) return console.log('Please install MetaMask for using our NFT platform!');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const publishCampaign = async (form) => {
    const { title, description, target, deadline, image } = form;

    const contract = await getContract();

    const amount = ethers.utils.parseUnits(target, 'ether');

    const dateToConvert = new Date(deadline);
    const timestamp = (dateToConvert.getTime()) / 1000;
    console.log(timestamp)


    const transaction = await contract.createCampaign(currentAccount, title, description, amount, timestamp, image);
    await transaction.wait();
  }

  const getCampaigns = async () => {
    const contract = await getContract();

    const campaigns = await contract.getCampaigns();

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaigns;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => (campaign.owner).toLowerCase() === (currentAccount).toLowerCase());

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const contract = await getContract();
    const data = await contract.donateToCampaign(pId, { value: ethers.utils.parseEther(amount) });

    return data;
  }

  const getDonations = async (pId) => {
    const contract = await getContract();
    const donations = await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{ connectWallet, publishCampaign, currentAccount, getContract, getCampaigns, getUserCampaigns, donate, getDonations }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);

