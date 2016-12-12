import DBQuery from '../utils/DBQuery';

class Stock {
  constructor() {
    this.table = 'stock';
    this.query = new DBQuery();
  }
  insert(dbCon, data, callback) {
    this.query.insert(dbCon, this.table, data, callback);
  }
  deleteRow(dbCon, data, callback) {
    this.query.deleteRow(dbCon, this.table, 'stock_id', data, callback);
  }
  update(dbCon, data, callback) {
    this.query.update(dbCon, {
      table: this.table,
      query: 'item_id = ?,quantity= ?',
      uid: 'stock_id',
      data: [data.item_id, data.quantity, data.stock_id]
    }, callback);
  }
  list(dbCon, callback) {
    this.query.list(dbCon, this.table, callback);
  }
  getbyid(dbCon, data, callback) {
    this.query.getbyid(dbCon, this.table, 'stock_id', data, callback);
  }
}


export default Stock;
