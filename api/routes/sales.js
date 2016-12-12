import SalesService from '../service/salesservice';

class Sales {

  static insertRoutes(app, dbCon) {

    const service = new SalesService();
    //create or add sales
    app.post('/sales/create', function(req, res) {
      var salesInfo = { 
        'item_id': req.body.item_id,
        'quantity': req.body.quantity, 
        'rate': req.body.rate,
        'total_amount': req.body.total_amount,
        'invoice_id': req.body.invoice_id, 
        'date': req.body.date,
        'description': req.body.description,
        'tax_rate': req.body.tax_rate,
        'tax_amount': req.body.tax_amount,
        'gross_amount': req.body.gross_amount
      };
      service.insert(dbCon, salesInfo, function(err, result) {
        if (err) res.send(`Something went wrong ${err}`, 500);
        res.send('sales added successfully ' + `sales ID is ${result.insertId}`);
      });
    });

    //delete sales by id
    app.post('/sales/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data, function(err) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item deleted successfuly');
      });
    });

    //update sales by id
    app.post('/sales/update/:id', function(req, res) {
      var salesInfo = { 
        'sales_id' : req.params.id,
        'item_id': req.body.item_id,
        'quantity': req.body.quantity, 
        'rate': req.body.rate,
        'total_amount': req.body.total_amount,
        'invoice_id': req.body.invoice_id, 
        'date': req.body.date,
        'description': req.body.description,
        'tax_rate': req.body.tax_rate,
        'tax_amount': req.body.tax_amount,
        'gross_amount': req.body.gross_amount
      };
      service.update(dbCon, salesInfo, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item updated sucessfully ' + result.changedRows);
      });
    });
    //get list of all product
    app.get('/sales', function(req, res) {
      service.list(dbCon, function(err, result) {
        if (err) {
          res.send('Something went wrong', 500);
        }
        res.send(result);
      });
    });

      //get sales by id
    app.get('/sales/:id', function(req, res) {
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

export default Sales;
