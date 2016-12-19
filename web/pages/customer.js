import React from 'react';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
promise.polyfill();

import Datatable from '../components/datatable/';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.columns = [
    { key: 'name', header: 'Name', type: 'string' },
    { key: 'phone', header: 'Phone', type: 'phone' },
    { key: 'email', header: 'Email', type: 'email' },
    { key: 'company', header: 'Company', type: 'string' },
    { key: 'pan', header: 'PAN', type: 'string' },
    { key: 'city', header: 'City', type: 'string' },
    { key: 'address', header: 'Address', type: 'string' },
    { key: 'description', header: 'Description', type: 'string' }];

    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    const self = this;
    fetch('/api/customer')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(function(data) {
      self.setState({data});
    });
  }


  render () {
    return (
      <div>
        <Datatable
          data={this.state.data}
          columns={this.columns}
        />
      </div>
    );
  }
}

export default Product;
