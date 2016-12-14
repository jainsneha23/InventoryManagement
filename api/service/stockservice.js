import DBQuery from '../utils/DBQuery';

class Stock {
  constructor() {
    this.table = 'stock';
    this.query = new DBQuery();
  }
  insert(dbCon, data) {
    return this.query.insert(dbCon, this.table, data);
  }
  deleteRow(dbCon, data) {
    return this.query.deleteRow(dbCon, this.table, 'stock_id', data);
  }
  update(dbCon, data) {
    return this.query.update(dbCon, {
      table: this.table,
      query: 'item_id = ?,quantity= ?',
      uid: 'stock_id',
      data: [data.item_id, data.quantity, data.stock_id]
    });
  }
  list(dbCon) {
    return this.query.list(dbCon, this.table);
  }
  getbyid(dbCon, data) {
    return this.query.getbyid(dbCon, this.table, 'stock_id', data);
  }
}


export default Stock;
