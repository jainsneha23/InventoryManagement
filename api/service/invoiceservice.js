import DBQuery from '../utils/DBQuery';

class Invoice {
  constructor() {
    this.table = 'invoice';
    this.query = new DBQuery();
  }
  insert(dbCon, data, callback) {
    this.query.insert(dbCon, this.table, data, callback);
  }
  deleteRow(dbCon, data, callback) {
    this.query.deleteRow(dbCon, this.table, 'invoice_id', data, callback);
  }
  update(dbCon, data, callback) {
    this.query.update(dbCon, {
      table: this.table,
      query: 'date= ?,pay_type= ?,pay_status= ?,total_amount= ?,pay_date= ?, service_tax= ?, vat= ?, discount= ?,net_amount= ?, customer_id= ?',
      uid: 'invoice_id',
      data: [data.date, data.pay_type, data.pay_status, data.total_amount, data.pay_date, data.service_tax, data.vat,data.discount,data.net_amount,data.customer_id,data.invoice_id]
    }, callback);
  }
  list(dbCon, callback) {
    this.query.list(dbCon, this.table, callback);
  }
  getbyid(dbCon, data, callback) {
    this.query.getbyid(dbCon, this.table, 'invoice_id', data, callback);
  }
}


export default Invoice;
