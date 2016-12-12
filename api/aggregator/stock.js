import StockService from '../service/stockservice';
import InventoryService from '../service/inventory';

class stockAggregator {
  static list (dbCon, callback) {
    const stock = new StockService();
    const inventory = new InventoryService();
    stock.list(dbCon, function(err1, result1) {
      let count = 0;
      const stockObject = Object.assign([], result1);
      result1.forEach((stock_item, i) => {
        inventory.getbyid(dbCon, stock_item.item_id, (err2, result2) => {
          stockObject[i].item_name = result2[0].name;
          count++;
          if(count === result1.length)
            callback(null, stockObject);
        });
      });
    });
  }
}

export default stockAggregator;
