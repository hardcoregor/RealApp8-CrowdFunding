import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { useStateContext } from '../context';
import DisplayCampaigns from "../components/DisplayCampaigns";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { currentAccount, getContract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (getContract) {
      fetchCampaigns();
    }
  }, [currentAccount, getContract]);

  return (
    <div>
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  )
}

export default Profile;
