import InvoiceService from '../service/invoiceservice';

class Invoice {

  static insertRoutes(app, dbCon) {

    const service = new InvoiceService();
    //create or add invoice
    app.post('/api/invoice/create', function(req, res) {
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
      service.insert(dbCon, invoiceInfo)
      .then(result => res.send(`Invoice ${result.insertId} added successfully`))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //delete invoice by id
    app.post('/api/invoice/delete/:id', function(req, res) {
      var data = req.params.id;
      service.deleteRow(dbCon, data)
      .then(() => res.send('Item deleted successfuly'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //update invoice by id
    app.post('/api/invoice/update/:id', function(req, res) {
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
      service.update(dbCon, invoiceInfo)
      .then(() => res.send('Item updated successfuly'))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
    //get list of all product
    app.get('/api/invoice', function(req, res) {
      service.list(dbCon)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });

    //get invoice by id
    app.get('/api/invoice/:id', function(req, res) {
      var data = req.params.id;
      service.getbyid(dbCon, data)
      .then(result => res.send(result))
      .catch(err => res.send(`Something went wrong ${err}`, 500));
    });
  }

}

export default Invoice;
