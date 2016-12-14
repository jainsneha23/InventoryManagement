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
      service.insert(dbCon, salesInfo)
      .then(result => res.send(`sales ${result.insertId} is added`))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //delete sales by id
    app.post('/sales/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data)
      .then(() => res.send('Item deleted successfuly'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
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
      service.update(dbCon, salesInfo)
      .then(() => res.send('Item updated sucessfully'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
    //get list of all product
    app.get('/sales', function(req, res) {
      service.list(dbCon)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

      //get sales by id
    app.get('/sales/:id', function(req, res) {
      var data = req.params.id;
      service.getbyid(dbCon, data)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
  }

}

export default Sales;
