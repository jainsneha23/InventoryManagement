import DBQuery from '../utils/DBQuery';

class Product {
  constructor() {
    this.table = 'product_master';
    this.query = new DBQuery();
  }
  insert(dbCon, data) {
    return this.query.insert(dbCon, this.table, data);
  }
  deleteRow(dbCon, data) {
    return this.query.deleteRow(dbCon, this.table, 'item_id', data);
  }
  update(dbCon, data) {
    return this.query.update(dbCon, {
      table: this.table,
      query: 'name = ?, description=?, unit= ?',
      uid: 'item_id',
      data: [data.name, data.description, data.unit, data.item_id]
    });
  }
  list(dbCon) {
    return this.query.list(dbCon, this.table);
  }
  getbyid(dbCon, data) {
    return this.query.getbyid(dbCon, this.table, 'item_id', data);
  }
}


export default Product;
