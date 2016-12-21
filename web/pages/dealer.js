import React from 'react';

import CrudPage from '../components/crud-page/';

const Dealer = () => {
  const columns = [
    { key: 'delaer_id', header: 'ID', type: 'number', editable: false, primary: true},
    { key: 'name', header: 'Name', type: 'string' },
    { key: 'phone', header: 'Phone', type: 'phone' },
    { key: 'email', header: 'Email', type: 'email' },
    { key: 'company', header: 'Company', type: 'string' },
    { key: 'pan', header: 'PAN', type: 'string' },
    { key: 'city', header: 'City', type: 'string' },
    { key: 'address', header: 'Address', type: 'string' },
    { key: 'description', header: 'Description', type: 'string' }
  ];
  return (
    <div>
      <CrudPage
        header={'Dealer'}
        columns={columns}
        apiUrl={'/api/dealer'}
      />
    </div>
  );
};

export default Dealer;

