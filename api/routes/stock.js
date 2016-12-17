import StockService from '../service/stockservice';
import StockAggregator from '../aggregator/stock';

class Stock {

  static insertRoutes(app, dbCon) {

    const service = new StockService();
    //create or add stock
    app.post('/api/stock/create', function(req, res) {
      var stockInfo = {
        'item_id': req.body.item_id,
        'quantity': req.body.quantity
      };
      service.insert(dbCon, stockInfo)
        .then(result => res.send(`stock ${result.insertId} is added`))
        .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //delete stock by id
    app.post('/api/stock/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data)
        .then(() => res.send('Item deleted successfuly'))
        .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //update stock by id
    app.post('/api/stock/update/:id', function(req, res) {
      var stockInfo = {
        'stock_id': req.params.id,
        'item_id': req.body.item_id,
        'quantity': req.body.quantity,
      };
      service.update(dbCon, stockInfo)
        .then(() => res.send('Item updated successfuly'))
        .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
    //get list of all product
    app.get('/api/stock', function(req, res) {
      StockAggregator.list(dbCon)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //get stock by id
    app.get('/api/stock/:id', function(req, res) {
      var data = req.params.id;
      service.getbyid(dbCon, data)
        .then(result => res.send(result))
        .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
  }

}

export default Stock;
