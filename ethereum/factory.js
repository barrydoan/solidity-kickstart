import web3 from "./web3";
import CampaignFactory from './build/CampaingnFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xc540A540d9B6f51E8125e1b995dFD66DADf0b282'
);

export default instance;

