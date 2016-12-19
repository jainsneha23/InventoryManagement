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
    this.columns = [{
      key: 'item_id',
      header: 'ID'
    }, {
      key: 'name',
      header: 'Name',
      type: 'string'
    }, {
      key: 'unit',
      header: 'Unit',
      type: 'select',
      options: ['kg', 'bag', 'number']
    }, {
      key: 'item_id',
      header: 'ID'
    }, {
      key: 'description',
      header: 'Description',
      type: 'textarea'
    }];
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    const self = this;
    fetch('/api/product')
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
