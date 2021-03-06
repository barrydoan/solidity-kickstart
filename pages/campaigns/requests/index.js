import React, {Component} from 'react';
import Layout from "../../../components/Layout";
import {Button, Table} from "semantic-ui-react";
import {Link} from '../../../routes'
import Campaign from '../../../ethereum/campaign';
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const summary = await campaign.methods.getSummary().call();
    const requestCountInt = parseInt(requestCount);
    const requests = await Promise.all(
      Array(requestCountInt)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call()
      })
    );

    const approversCount = summary['3'];

    console.log('approversCount',summary['3']);

    return {address, requests, requestCount, approversCount};
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow key={index} id={index} request={request} address={this.props.address} approversCount={this.props.approversCount} />
      );
    });
  }

  render() {
    const {Header, Row, HeaderCell, Body} = Table;

    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{marginBottom: 10}}>Add request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <div>Found {this.props.requestCount} request(s)</div>

      </Layout>
    );
  }
}

export default RequestIndex;