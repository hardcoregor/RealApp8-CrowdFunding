import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';
import ABI from '../../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json';

export const abiContract = ABI.abi;
export const contractAddress = '0xD0B47491072Dd8E2256fdf9056C27EFab594a13A';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];