import DBQuery from '../utils/DBQuery';

class Customer {
  constructor() {
    this.table = 'customer_info';
    this.query = new DBQuery();
  }
  insert(dbCon, data) {
    return this.query.insert(dbCon, this.table, data);
  }
  deleteRow(dbCon, data) {
    return this.query.deleteRow(dbCon, this.table, 'customer_id', data);
  }
  update(dbCon, data) {
    return this.query.update(dbCon, {
      table: this.table,
      query: 'name = ?,company= ?, address=?, phone= ?, email=?, city=?,pan=?,description=?',
      uid: 'customer_id',
      data: [data.name, data.company, data.address, data.phone, data.email,data.city,data.pan,data.description,data.customer_id]
    });
  }
  list(dbCon) {
    return this.query.list(dbCon, this.table);
  }
  getbyid(dbCon, data) {
    return this.query.getbyid(dbCon, this.table, 'customer_id', data);
  }
}


export default Customer;


