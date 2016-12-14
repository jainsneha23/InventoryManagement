import CustomerService from '../service/customerservice';

class Customer {

  static insertRoutes(app, dbCon) {

    const service = new CustomerService();
    //create or add customer
    app.post('/customer/create', function(req, res) {
      var customerInfo = { 'name': req.body.name, 'company': req.body.company, 'address': req.body.address, 'phone': req.body.phone, 'email': req.body.email, 'city': req.body.city, 'pan': req.body.pan, 'description': req.body.description, };
      service.insert(dbCon, customerInfo)
      .then(result => res.send(`Customer ${result.insertId} added successfully`))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //delete customer by id
    app.post('/customer/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data)
      .then(() => res.send('Item deleted successfuly'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //update customer by id
    app.post('/customer/update/:id', function(req, res) {
      var customerInfo = { 'name': req.body.name, 'company': req.body.company, 'address': req.body.address, 'phone': req.body.phone, 'email': req.body.email, 'city': req.body.city, 'pan': req.body.pan, 'description': req.body.description, 'customer_id': req.params.id };
      service.update(dbCon, customerInfo)
      .then(() => res.send('Item updated successfuly'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
    //get list of all products
    app.get('/customer', function(req, res) {
      service.list(dbCon)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
    //get customer by id
    app.get('/customer/:id', function(req, res) {
      var data = req.params.id;
      service.getbyid(dbCon, data)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
  }

}

export default Customer;
