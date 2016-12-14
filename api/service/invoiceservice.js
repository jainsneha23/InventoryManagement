import DBQuery from '../utils/DBQuery';

class Invoice {
  constructor() {
    this.table = 'invoice';
    this.query = new DBQuery();
  }
  insert(dbCon, data) {
    return this.query.insert(dbCon, this.table, data);
  }
  deleteRow(dbCon, data) {
    return this.query.deleteRow(dbCon, this.table, 'invoice_id', data);
  }
  update(dbCon, data) {
    return this.query.update(dbCon, {
      table: this.table,
      query: 'date= ?,pay_type= ?,pay_status= ?,total_amount= ?,pay_date= ?, service_tax= ?, vat= ?, discount= ?,net_amount= ?, customer_id= ?',
      uid: 'invoice_id',
      data: [data.date, data.pay_type, data.pay_status, data.total_amount, data.pay_date, data.service_tax, data.vat,data.discount,data.net_amount,data.customer_id,data.invoice_id]
    });
  }
  list(dbCon) {
    return this.query.list(dbCon, this.table);
  }
  getbyid(dbCon, data) {
    return this.query.getbyid(dbCon, this.table, 'invoice_id', data);
  }
}


export default Invoice;
