import React from 'react';

import CrudPage from '../components/crud-page/';

const Stock = () => {
  const columns = [
    {key: 'stock_id', header: 'ID', type: 'number', editable: false, primary: true},
    {key: 'item_name', header: 'Name', type: 'string'},
    {key: 'quantity', header: 'Quantity', type: 'number'}
  ];
  return (
    <div>
      <CrudPage
        header={'Stock'}
        columns={columns}
        apiUrl={'/api/stock'}
      />
    </div>
  );
};

export default Stock;
