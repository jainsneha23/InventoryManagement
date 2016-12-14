import PurchaseService from '../service/purchaseservice';
import PurchageAggregator from '../aggregator/purchase';

class Purchase {

  static insertRoutes(app, dbCon) {

    const service = new PurchaseService();
    //create or add purchase
    app.post('/purchase/create', function(req, res) {
      var purchaseInfo = { 'dealer_id': req.body.dealer_id, 'item_id': req.body.item_id, 'date': req.body.date, 'quantity': req.body.quantity, 'rate': req.body.rate, 'total': req.body.total, 'description': req.body.description};
      service.insert(dbCon, purchaseInfo)
      .then(result => res.send(`purchase ${result.insertId} is added`))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //delete purchase by id
    app.post('/purchase/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data)
      .then(() => res.send('Item deleted sucessfully'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //update purchase by id
    app.post('/purchase/update/:id', function(req, res) {
      var purchaseInfo = { 'dealer_id': req.body.dealer_id, 'item_id': req.body.item_id, 'date': req.body.date, 'quantity': req.body.quantity, 'rate': req.body.rate, 'total': req.body.total, 'description': req.body.description,'p_id' : req.params.id};
      service.update(dbCon, purchaseInfo)
      .then(() => res.send('Item updated sucessfully'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
    //get list of all product
    app.get('/purchase', function(req, res) {
      PurchageAggregator.list(dbCon)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
  }

}

export default Purchase;
