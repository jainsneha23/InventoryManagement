import StockService from '../service/stockservice';
import StockAggregator from '../aggregator/stock';

class Stock {

  static insertRoutes(app, dbCon) {

    const service = new StockService();
    //create or add stock
    app.post('/stock/create', function(req, res) {
      var stockInfo = {
        'item_id': req.body.item_id,
        'quantity': req.body.quantity
      };
      service.insert(dbCon, stockInfo, function(err, result) {
        if (err) res.send(`Something went wrong ${err}`, 500);
        res.send('stock added successfully ' + `stock ID is ${result.insertId}`);
      });
    });

    //delete stock by id
    app.post('/stock/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data, function(err) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item deleted successfuly');
      });
    });

    //update stock by id
    app.post('/stock/update/:id', function(req, res) {
      var stockInfo = {
        'stock_id': req.params.id,
        'item_id': req.body.item_id,
        'quantity': req.body.quantity,
      };
      service.update(dbCon, stockInfo, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item updated sucessfully ' + result.changedRows);
      });
    });
    //get list of all product
    app.get('/stock', function(req, res) {
      StockAggregator.list(dbCon, function(err, result) {
        if (err) {
          res.send('Something went wrong', 500);
        }
        res.send(result);
      });
    });

    //get stock by id
    app.get('/stock/:id', function(req, res) {
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

export default Stock;
