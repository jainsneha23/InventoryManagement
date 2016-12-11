import DealerService from '../service/dealerservice';

class Dealer {

  static insertRoutes(app, dbCon) {

    const service = new DealerService();
    //create or add product item
    app.post('/dealer/create', function(req, res) {
      var dealerInfo = {'name': req.body.name,'address': req.body.address,'city': req.body.city,'phone': req.body.phone ,'email':req.body.email};
      service.insert(dbCon, dealerInfo, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('Dealer added successfully ' + `Dealer ID is ${result.insertId}`);
      });
    });

    //delete product by id
    app.post('/dealer/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data, function(err) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item deleted successfuly');
      });
    });

    //update product by id
    app.post('/dealer/update/:id', function(req, res) {
      var product = {'name': req.body.name,'address': req.body.address,'city': req.body.city,'phone': req.body.phone ,'email':req.body.email, 'dealer_id': req.params.id};
      service.update(dbCon, product, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item updated sucessfully ' + result.changedRows);
      });
    });
    //get list of all products
    app.get('/dealer', function(req, res) {
      service.list(dbCon, function(err, result) {
        if (err) {
          res.send('Something went wrong', 500);
        }
        res.send(result);
      });
    });
  }

}

export default Dealer;
