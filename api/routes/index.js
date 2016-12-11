import Inventory from './inventory';
import Dealer from './dealer';

class Routes {
  static insertRoutes(app, dbCon) {
    Inventory.insertRoutes(app, dbCon);
    Dealer.insertRoutes(app, dbCon);
  }
}

export default Routes;
