import DealerService from '../service/dealerservice';
import ProductService from '../service/productservice';
import PurchaseService from '../service/purchaseservice';

class PurchaseAggregator {
  static list(dbCon) {
    const dealer = new DealerService();
    const product = new ProductService();
    const purchase = new PurchaseService();
    return new Promise((resolve, reject) => {
      const promises = [];
      purchase.list(dbCon)
        .then(result => {
          result.forEach(stock_item => {
            promises.push(product.getbyid(dbCon, stock_item.item_id));
            promises.push(dealer.getbyid(dbCon, stock_item.dealer_id));
          });
          Promise.all(promises).then((data) => {
            const finalData = result.map((stock_item, i) => ({
              ...stock_item,
              item_name: data[i * 2][0].name,
              dealer_name: data[i * 2 + 1][0].name
            }));
            resolve(finalData);
          }).catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}

export default PurchaseAggregator;
