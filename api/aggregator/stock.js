import StockService from '../service/stockservice';
import ProductService from '../service/productservice';

class stockAggregator {
  static list(dbCon) {
    const stock = new StockService();
    const product = new ProductService();
    return new Promise((resolve, reject) => {
      const promises = [];
      stock.list(dbCon)
        .then(result => {
          result.forEach(stock_item =>
            promises.push(product.getbyid(dbCon, stock_item.item_id)));
          Promise.all(promises).then((data) => {
            const finalData = result.map((stock_item, i) => ({...stock_item, item_name: data[i][0].name}));
            resolve(finalData);
          }).catch(err => reject(err));
        })
        .catch(err => reject(err));

    });
  }
}

export default stockAggregator;
