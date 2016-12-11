class DBQuery {
  constructor() {}
  insert(dbCon, table, data, callback) {
    dbCon.query(`INSERT INTO ${table} SET ?`, data, callback);
  }
  deleteRow(dbCon, table, deleteby, data, callback) {
    dbCon.query(`DELETE FROM ${table} WHERE ${deleteby} = ?`, data, callback);
  }
  update(dbCon, table, data, callback) {
    const query = [data.name, data.quality, data.description, data.unit, data.item_id];
    dbCon.query(`UPDATE ${table} SET name = ?,quality= ?, description=?, unit= ? Where item_id = ?`, query, callback);
  }
  list(dbCon, table,callback) {
    dbCon.query(`SELECT * FROM ${table}`, callback);
  }
}

export default DBQuery;
