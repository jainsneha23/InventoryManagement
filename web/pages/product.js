import React from 'react';

import CrudPage from '../components/crud-page/';

const Product = () => {
  const columns = [
    {key: 'item_id', header: 'ID', type: 'number', editable: false, primary: true},
    {key: 'name', header: 'Name', type: 'string'},
    {key: 'unit', header: 'Unit', type: 'select',
      options: [{text: 'Kilogram', value: 'kg'}, {text: 'Bag', value: 'bag'}, {text: 'Number', value: 'number'}]
    },
    {key: 'description', header: 'Description', type: 'textarea'}
  ];
  return (
    <div>
      <CrudPage
        header={'Product'}
        columns={columns}
        apiUrl={'/api/product'}
      />
    </div>
  );
};

export default Product;
