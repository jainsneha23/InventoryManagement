import mysql from 'mysql';

const dbConnection = () => {
  // First you need to create a connection to the db
  /*var isOpenShift = process.env.OPENSHIFT_MYSQL_DB_HOST ? true : false;*/
  var con = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
    password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root',
    database: 'billing_software'
  });

  con.connect(function(err) {
    if (err) {
      console.log('Error connecting to Db'+err);
      return;
    }
    console.log('Connection established');
  });

  /*con.end(function(err) {
    console.log(err);
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });*/
  return con;
};

export default dbConnection;
