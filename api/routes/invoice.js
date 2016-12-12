import InvoiceService from '../service/invoiceservice';

class Invoice {

  static insertRoutes(app, dbCon) {

    const service = new InvoiceService();
    //create or add invoice
    app.post('/invoice/create', function(req, res) {
      var invoiceInfo = {
        'date': req.body.date,
        'pay_type': req.body.pay_type,
        'pay_status': req.body.pay_status,
        'total_amount': req.body.total_amount,
        'pay_date': req.body.pay_date,
        'service_tax': req.body.service_tax,
        'vat': req.body.vat,
        'discount': req.body.discount,
        'net_amount': req.body.net_amount,
        'customer_id': req.body.customer_id
      };
      service.insert(dbCon, invoiceInfo, function(err, result) {
        if (err) res.send(`Something went wrong ${err}`, 500);
        res.send('invoice added successfully ' + `invoice ID is ${result.insertId}`);
      });
    });

    //delete invoice by id
    app.post('/invoice/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data, function(err) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item deleted successfuly');
      });
    });

    //update invoice by id
    app.post('/invoice/update/:id', function(req, res) {
      var invoiceInfo = {
        'date': req.body.date,
        'pay_type': req.body.pay_type,
        'pay_status': req.body.pay_status,
        'total_amount': req.body.total_amount,
        'pay_date': req.body.pay_date,
        'service_tax': req.body.service_tax,
        'vat': req.body.vat,
        'discount': req.body.discount,
        'net_amount': req.body.net_amount,
        'customer_id': req.body.customer_id,
        'invoice_id' : req.params.id
      };
      service.update(dbCon, invoiceInfo, function(err, result) {
        if (err) res.send('Something went wrong', 500);
        res.send('Item updated sucessfully ' + result.changedRows);
      });
    });
    //get list of all product
    app.get('/invoice', function(req, res) {
      service.list(dbCon, function(err, result) {
        if (err) {
          res.send('Something went wrong', 500);
        }
        res.send(result);
      });
    });

    //get invoice by id
    app.get('/invoice/:id', function(req, res) {
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

export default Invoice;
