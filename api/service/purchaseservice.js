import DBQuery from '../utils/DBQuery';

class Purchase {
  constructor() {
    this.table = 'purchase';
    this.query = new DBQuery();
  }
  insert(dbCon, data) {
    return this.query.insert(dbCon, this.table, data);
  }
  deleteRow(dbCon, data) {
    return this.query.deleteRow(dbCon, this.table, 'p_id', data);
  }
  update(dbCon, data) {
    return this.query.update(dbCon, {
      table: this.table,
      query: 'dealer_id = ?,item_id= ?, date=?, quantity= ?, rate=?, total=?,description=?',
      uid: 'p_id',
      data: [data.dealer_id, data.item_id, data.date, data.quantity, data.rate, data.total, data.description, data.p_id]
    });
  }
  list(dbCon) {
    return this.query.list(dbCon, this.table);
  }
  getbyid(dbCon, data) {
    return this.query.getbyid(dbCon, this.table, 'p_id', data);
  }
}


export default Purchase;
