import PurchaseService from '../service/purchaseservice';

class Purchase {

  static insertRoutes(app, dbCon) {

    const service = new PurchaseService();
    //create or add purchase
    app.post('/purchase/create', function(req, res) {
      var purchaseInfo = { 'dealer_id': req.body.dealer_id, 'item_id': req.body.item_id, 'date': req.body.date, 'quantity': req.body.quantity, 'rate': req.body.rate, 'total': req.body.total, 'description': req.body.description};
      service.insert(dbCon, purchaseInfo, function(err, result) {
        if (err) res.send(`Something went wrong ${err}`, 500);
        res.send('purchase added successfully ' + `purchase ID is ${result.insertId}`);
      });
    });

    //delete purchase by id
    app.post('/purchase/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data, function(err) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item deleted successfuly');
      });
    });

    //update purchase by id
    app.post('/purchase/update/:id', function(req, res) {
      var purchaseInfo = { 'dealer_id': req.body.dealer_id, 'item_id': req.body.item_id, 'date': req.body.date, 'quantity': req.body.quantity, 'rate': req.body.rate, 'total': req.body.total, 'description': req.body.description,'p_id' : req.params.id};
      service.update(dbCon, purchaseInfo, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item updated sucessfully ' + result.changedRows);
      });
    });
    //get list of all product
    app.get('/purchase', function(req, res) {
      service.list(dbCon, function(err, result) {
        if (err) {
          res.send('Something went wrong', 500);
        }
        res.send(result);
      });
    });
  }

}

export default Purchase;
