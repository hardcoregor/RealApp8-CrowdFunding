import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { useStateContext } from '../context';
import DisplayCampaigns from "../components/DisplayCampaigns";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { currentAccount, getContract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
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
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  )
}
