class DBQuery {
  constructor() {}
  insert(dbCon, table, data) {
    return new Promise((resolve, reject) => {
      dbCon.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  deleteRow(dbCon, table, deleteby, data) {
    return new Promise((resolve, reject) => {
      dbCon.query(`DELETE FROM ${table} WHERE ${deleteby} = ?`, data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  update(dbCon, params) {
    return new Promise((resolve, reject) => {
      dbCon.query(`UPDATE ${params.table} SET ${params.query} Where ${params.uid} = ?`, params.data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  list(dbCon, table) {
    return new Promise((resolve, reject) => {
      dbCon.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  getbyid(dbCon, table,getby, data) {
    return new Promise((resolve, reject) => {
      dbCon.query(`SELECT * FROM ${table} WHERE ${getby} = ?`,data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

export default DBQuery;
