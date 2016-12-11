import Inventory from './inventory';
import Dealer from './dealer';
import Customer from './customer';
import Purchase from './purchase';

class Routes {
  static insertRoutes(app, dbCon) {
    Inventory.insertRoutes(app, dbCon);
    Dealer.insertRoutes(app, dbCon);
    Customer.insertRoutes(app, dbCon);
    Purchase.insertRoutes(app, dbCon);
  }
}

export default Routes;
