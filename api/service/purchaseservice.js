import DBQuery from '../utils/DBQuery';

class Purchase {
  constructor() {
    this.table = 'purchase';
    this.query = new DBQuery();
  }
  insert(dbCon, data, callback) {
    this.query.insert(dbCon, this.table, data, callback);
  }
  deleteRow(dbCon, data, callback) {
    this.query.deleteRow(dbCon, this.table, 'p_id', data, callback);
  }
  update(dbCon, data, callback) {
    this.query.update(dbCon, {
      table: this.table,
      query: 'dealer_id = ?,item_id= ?, date=?, quantity= ?, rate=?, total=?,description=?',
      uid: 'p_id',
      data: [data.dealer_id, data.item_id, data.date, data.quantity, data.rate,data.total,data.description,data.p_id]
    }, callback);
  }
  list(dbCon, callback) {
    this.query.list(dbCon, this.table,callback);
  }
}


export default Purchase;


