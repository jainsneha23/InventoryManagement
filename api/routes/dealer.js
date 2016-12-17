import DealerService from '../service/dealerservice';

class Dealer {

  static insertRoutes(app, dbCon) {

    const service = new DealerService();
    //create or add product item
    app.post('/api/dealer/create', function(req, res) {
      var dealerInfo = {'name': req.body.name,'address': req.body.address,'city': req.body.city,'phone': req.body.phone ,'email':req.body.email};
      service.insert(dbCon, dealerInfo)
      .then(result => res.send(`Dealer ${result.insertId} added successfully`))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //delete product by id
    app.post('/api/dealer/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data)
      .then(() => res.send('Item deleted successfuly'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //update product by id
    app.post('/api/dealer/update/:id', function(req, res) {
      var product = {'name': req.body.name,'address': req.body.address,'city': req.body.city,'phone': req.body.phone ,'email':req.body.email, 'dealer_id': req.params.id};
      service.update(dbCon, product)
      .then(() => res.send('Item updated successfuly'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
    //get list of all products
    app.get('/api/dealer', function(req, res) {
      service.list(dbCon)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //get dealer by id
    app.get('/api/dealer/:id', function(req, res) {
      var data = req.params.id;
      service.getbyid(dbCon, data)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
  }

}

export default Dealer;
