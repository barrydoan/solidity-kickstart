import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8e248FB7464c624fb36B373C35339420305a0F2D'
);

export default instance;

