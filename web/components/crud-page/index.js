import React from 'react';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
promise.polyfill();

import DatatableCard from '../datatable/';

class CrudPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: this.props.columns
    };
    this.loadData = this.loadData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    const self = this;
    fetch(this.props.apiUrl)
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

  deleteItem(id) {
    const self = this;
    fetch(`${this.props.apiUrl}/delete/${self.state.data[id].item_id}`, {
      method: 'POST'
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      self.loadData();
    });
  }

  editItem(rowvalue, isEdit) {
    return new Promise((resolve, reject) => {
      const self = this;
      const data = rowvalue.filter(k => k.editable !== false).map(k => `${k.key}=${k.value}`).join('&');
      const id = rowvalue.filter(k => k.primary)[0].value;
      const url = isEdit ? `${this.props.apiUrl}/update/${id}` : '${this.props.apiUrl}/create';
      fetch(url, {
        method: 'POST',
        body: encodeURI(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(response) {
        if (response.status >= 400) {
          reject(response.message);
        }
        self.loadData();
        resolve();
      });
    });
  }


  render () {
    return (
      <div>
        <DatatableCard
          header={this.props.header}
          data={this.state.data}
          columns={this.state.columns}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
        />
      </div>
    );
  }
}

CrudPage.propTypes = {
  header: React.PropTypes.string.isRequired,
  columns: React.PropTypes.array.isRequired,
  apiUrl: React.PropTypes.string.isRequired
};

export default CrudPage;
