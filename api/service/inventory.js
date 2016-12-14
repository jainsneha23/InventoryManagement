import DBQuery from '../utils/DBQuery';

class Inventory {
  constructor() {
    this.table = 'product_master';
    this.query = new DBQuery();
  }
  insert(dbCon, data, callback) {
    this.query.insert(dbCon, this.table, data, callback);
  }
  deleteRow(dbCon, data, callback) {
    this.query.deleteRow(dbCon, this.table, 'item_id', data, callback);
  }
  update(dbCon, data, callback) {
    this.query.update(dbCon, {
      table: this.table,
      query: 'name = ?,quality= ?, description=?, unit= ?',
      uid: 'item_id',
      data: [data.name, data.quality, data.description, data.unit, data.item_id]
    }, callback);
  }
  list(dbCon) {
    return this.query.list(dbCon, this.table);
  }
  getbyid(dbCon, data, callback) {
    this.query.getbyid(dbCon, this.table, 'item_id', data, callback);
  }
}


export default Inventory;
