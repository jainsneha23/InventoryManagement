import DBQuery from '../utils/DBQuery';

class Customer {
  constructor() {
    this.table = 'customer_info';
    this.query = new DBQuery();
  }
  insert(dbCon, data, callback) {
    this.query.insert(dbCon, this.table, data, callback);
  }
  deleteRow(dbCon, data, callback) {
    this.query.deleteRow(dbCon, this.table, 'customer_id', data, callback);
  }
  update(dbCon, data, callback) {
    this.query.update(dbCon, {
      table: this.table,
      query: 'name = ?,company= ?, address=?, phone= ?, email=?, city=?,pan=?,description=?',
      uid: 'customer_id',
      data: [data.name, data.company, data.address, data.phone, data.email,data.city,data.pan,data.description,data.customer_id]
    }, callback);
  }
  list(dbCon, callback) {
    this.query.list(dbCon, this.table,callback);
  }
}


export default Customer;


