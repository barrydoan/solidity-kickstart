import React from 'react';
import {Form, Button, Message, Input} from "semantic-ui-react";
import Campaign from '../../../ethereum/campaign';
import web3 from "../../../ethereum/web3";
import {Link, Route} from '../../../routes';
import Layout from "../../../components/Layout";

class RequestNew extends React.Component {

  state = {
    value: '',
    description: '',
    recipient: ''
  };
  static async getInitialProps(props) {
    const {address} = props.query;
    return {address};
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const {description, value, recipient} = this.state;
    console.log(description, value, recipient);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).call({
          from: accounts[0]
        }
      );
    } catch (err) {
      console.log('error', err);
    }

  }

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({description: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Value of Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({recipient: event.target.value})}
            />
          </Form.Field>
          <Button primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;