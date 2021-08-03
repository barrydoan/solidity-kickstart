import React, {Component} from 'react';
import {Card, Grid} from "semantic-ui-react";
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";


class CampaignShow extends Component {
  static async getInitialProps(props) {
    console.log(props.query.address);
    const campaign = Campaign(props.query.address);
    console.log('campaign', campaign);
    const summary = await campaign.methods.getSummary().call();
    console.log('Summary', summary);
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address
    };
  }

  renderCards() {

    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props

    const items = [
      {
        header: manager,
        meta:'Address of Manager',
        description: 'The manager created this campaign',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta:'Minimum Contribution (wei)',
        description: 'You must contribute this amount to become an approver',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: requestsCount,
        meta:'Number of request',
        description: 'A request try to withdraw money from the contract',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: approversCount,
        meta:'Number of approvers',
        description: 'Number of people who have already donated to this contract',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta:'Balance of the contract (eth)',
        description: 'The balance of out contract',
        style: { overflowWrap: 'break-word'}
      }
    ];

    return <Card.Group items={items}/>
  }


  render() {
    return(
      <Layout>
        <h3>Compaign Show</h3>
        <Grid>
          <Grid.Column width={10}>
            {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;