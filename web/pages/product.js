import React from 'react';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
promise.polyfill();

import DatatableCard from '../components/datatable/';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [{
        key: 'item_id', header: 'ID', type: 'number', editable: false
      }, {
        key: 'name', header: 'Name', type: 'string'
      }, {
        key: 'unit', header: 'Unit', type: 'select',
        options: [{text: 'Kilogram', value: 'kg'}, {text: 'Bag', value: 'bag'}, {text: 'Number', value: 'number'}]
      }, {
        key: 'description', header: 'Description', type: 'textarea'
      }]
    };
    this.loadData = this.loadData.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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

  addItem(rowvalue) {
    const self = this;
    const data = rowvalue.filter(k => k.editable !== false).map(k => `${k.key}=${k.value}`).join('&');
    fetch('/api/product/create', {
      method: 'POST',
      body: encodeURI(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      const columns = self.state.columns.map((column) => {delete column.value;return column;});
      self.setState({columns});
      self.loadData();
    });
  }

  deleteItem(id) {
    const self = this;
    fetch(`/api/product/delete/${self.state.data[id].item_id}`, {
      method: 'POST'
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      self.loadData();
    });
  }


  render () {
    return (
      <div>
        <DatatableCard
          header={'Product'}
          data={this.state.data}
          columns={this.state.columns}
          addItem={this.addItem}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default Product;
