class DBQuery {
  constructor() {}
  insert(dbCon, table, data, callback) {
    dbCon.query(`INSERT INTO ${table} SET ?`, data, callback);
  }
  deleteRow(dbCon, table, deleteby, data, callback) {
    dbCon.query(`DELETE FROM ${table} WHERE ${deleteby} = ?`, data, callback);
  }
  update(dbCon, params, callback) {
    dbCon.query(`UPDATE ${params.table} SET ${params.query} Where ${params.uid} = ?`, params.data, callback);
  }
  list(dbCon, table) {
    return new Promise((resolve, reject) => {
      dbCon.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  getbyid(dbCon, table,getby, data, callback) {
    dbCon.query(`SELECT * FROM ${table} WHERE ${getby} = ?`,data, callback);
  }
}

export default DBQuery;
