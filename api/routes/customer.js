import CustomerService from '../service/customerservice';

class Customer {

  static insertRoutes(app, dbCon) {

    const service = new CustomerService();
    //create or add customer
    app.post('/customer/create', function(req, res) {
      var customerInfo = { 'name': req.body.name, 'company': req.body.company, 'address': req.body.address, 'phone': req.body.phone, 'email': req.body.email, 'city': req.body.city, 'pan': req.body.pan, 'description': req.body.description, };
      service.insert(dbCon, customerInfo, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('customer added successfully ' + `customer ID is ${result.insertId}`);
      });
    });

    //delete customer by id
    app.post('/customer/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data, function(err) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item deleted successfuly');
      });
    });

    //update customer by id
    app.post('/customer/update/:id', function(req, res) {
      var customerInfo = { 'name': req.body.name, 'company': req.body.company, 'address': req.body.address, 'phone': req.body.phone, 'email': req.body.email, 'city': req.body.city, 'pan': req.body.pan, 'description': req.body.description, 'customer_id': req.params.id };
      service.update(dbCon, customerInfo, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item updated sucessfully ' + result.changedRows);
      });
    });
    //get list of all products
    app.get('/customer', function(req, res) {
      service.list(dbCon, function(err, result) {
        if (err) {
          res.send('Something went wrong', 500);
        }
        res.send(result);
      });
    });
    //get customer by id
    app.get('/customer/:id', function(req, res) {
      var data = req.params.id;
      service.getbyid(dbCon, data, function(err, result) {
        if (err) {
          res.send(`Something went wrong ${err}`, 500);
        }
        res.send(result);
      });
    });
  }

}

export default Customer;
