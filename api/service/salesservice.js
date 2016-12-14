import DBQuery from '../utils/DBQuery';

class Sales {
  constructor() {
    this.table = 'sales';
    this.query = new DBQuery();
  }
  insert(dbCon, data) {
    return this.query.insert(dbCon, this.table, data);
  }
  deleteRow(dbCon, data) {
    return this.query.deleteRow(dbCon, this.table, 'sales_id', data);
  }
  update(dbCon, data) {
    return this.query.update(dbCon, {
      table: this.table,
      query: 'item_id = ?,quantity= ?, rate=?, total_amount= ?, invoice_id=?, date=?,description=?,tax_rate=?,tax_amount=?,gross_amount=?',
      uid: 'sales_id',
      data: [data.item_id, data.quantity, data.rate, data.total_amount, data.invoice_id, data.date, data.description,data.tax_rate,data.tax_amount,data.gross_amount, data.sales_id]
    });
  }
  list(dbCon) {
    return this.query.list(dbCon, this.table);
  }
  getbyid(dbCon, data) {
    return this.query.getbyid(dbCon, this.table, 'sales_id', data);
  }
}


export default Sales;
