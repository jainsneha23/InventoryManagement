import DBQuery from '../utils/DBQuery';

class Dealer {
  constructor() {
    this.table = 'dealer';
    this.query = new DBQuery();
  }
  insert(dbCon, data, callback) {
    this.query.insert(dbCon, this.table, data, callback);
  }
  deleteRow(dbCon, data, callback) {
    this.query.deleteRow(dbCon, this.table, 'dealer_id', data, callback);
  }
  update(dbCon, data, callback) {
    this.query.update(dbCon, {
      table: this.table,
      query: 'name = ?,address= ?, city=?, phone= ?, email=?',
      uid: 'dealer_id',
      data: [data.name, data.address, data.city, data.phone, data.email, data.dealer_id]
    }, callback);
  }
  list(dbCon, callback) {
    this.query.list(dbCon, this.table, callback);
  }
  getbyid(dbCon, data, callback) {
    this.query.getbyid(dbCon, this.table, 'dealer_id', data, callback);
  }
}


export default Dealer;
