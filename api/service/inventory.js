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
    this.query.update(dbCon, this.table, data, callback);
  }
  list(dbCon, callback) {
    this.query.list(dbCon, this.table,callback);
  }
}


export default Inventory;


