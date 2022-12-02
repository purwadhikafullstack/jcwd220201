var DataTypes = require("sequelize").DataTypes;
var _Address = require("./address");
var _CartItem = require("./cart_item");
var _Cart = require("./cart");
var _Category = require("./category");
var _Courier = require("./courier");
var _JournalItem = require("./journal_item");
var _JournalType = require("./journal_type");
var _Journal = require("./journal");
var _OrderItem = require("./order_item");
var _Order = require("./order");
var _Otp = require("./otp");
var _ProductPicture = require("./product_picture");
var _ProductStock = require("./product_stock");
var _Product = require("./product");
var _Role = require("./role");
var _Status = require("./status");
var _StockRequestItem = require("./stock_request_item");
var _StockRequest = require("./stock_request");
var _User = require("./user");
var _Warehouse = require("./warehouse");
var _Warehousesuser = require("./warehousesuser");

function initModels(sequelize) {
  var Address = _Address(sequelize, DataTypes);
  var CartItem = _CartItem(sequelize, DataTypes);
  var Cart = _Cart(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var Courier = _Courier(sequelize, DataTypes);
  var JournalItem = _JournalItem(sequelize, DataTypes);
  var JournalType = _JournalType(sequelize, DataTypes);
  var Journal = _Journal(sequelize, DataTypes);
  var OrderItem = _OrderItem(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var Otp = _Otp(sequelize, DataTypes);
  var ProductPicture = _ProductPicture(sequelize, DataTypes);
  var ProductStock = _ProductStock(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var Status = _Status(sequelize, DataTypes);
  var StockRequestItem = _StockRequestItem(sequelize, DataTypes);
  var StockRequest = _StockRequest(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Warehouse = _Warehouse(sequelize, DataTypes);
  var Warehousesuser = _Warehousesuser(sequelize, DataTypes);

  Order.belongsTo(Address, { as: "address", foreignKey: "address_id"});
  Address.hasMany(Order, { as: "orders", foreignKey: "address_id"});
  CartItem.belongsTo(Cart, { as: "cart", foreignKey: "cart_id"});
  Cart.hasMany(CartItem, { as: "cart_items", foreignKey: "cart_id"});
  Product.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(Product, { as: "products", foreignKey: "category_id"});
  Order.belongsTo(Courier, { as: "courier", foreignKey: "courier_id"});
  Courier.hasMany(Order, { as: "orders", foreignKey: "courier_id"});
  JournalItem.belongsTo(JournalType, { as: "journal_type", foreignKey: "journal_type_id"});
  JournalType.hasMany(JournalItem, { as: "journal_items", foreignKey: "journal_type_id"});
  JournalItem.belongsTo(Journal, { as: "journal", foreignKey: "journal_id"});
  Journal.hasMany(JournalItem, { as: "journal_items", foreignKey: "journal_id"});
  JournalItem.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(JournalItem, { as: "journal_items", foreignKey: "order_id"});
  OrderItem.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(OrderItem, { as: "order_items", foreignKey: "order_id"});
  CartItem.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(CartItem, { as: "cart_items", foreignKey: "product_id"});
  JournalItem.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(JournalItem, { as: "journal_items", foreignKey: "product_id"});
  OrderItem.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(OrderItem, { as: "order_items", foreignKey: "product_id"});
  ProductPicture.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductPicture, { as: "product_pictures", foreignKey: "product_id"});
  ProductStock.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductStock, { as: "product_stocks", foreignKey: "product_id"});
  StockRequestItem.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(StockRequestItem, { as: "stock_request_items", foreignKey: "product_id"});
  User.belongsTo(Role, { as: "role", foreignKey: "role_id"});
  Role.hasMany(User, { as: "users", foreignKey: "role_id"});
  Order.belongsTo(Status, { as: "status", foreignKey: "status_id"});
  Status.hasMany(Order, { as: "orders", foreignKey: "status_id"});
  StockRequestItem.belongsTo(StockRequest, { as: "stock_request", foreignKey: "stock_request_id"});
  StockRequest.hasMany(StockRequestItem, { as: "stock_request_items", foreignKey: "stock_request_id"});
  Address.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Address, { as: "addresses", foreignKey: "user_id"});
  Cart.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Cart, { as: "carts", foreignKey: "user_id"});
  Order.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Order, { as: "orders", foreignKey: "user_id"});
  Otp.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Otp, { as: "otps", foreignKey: "user_id"});
  StockRequest.belongsTo(User, { as: "created_by_user", foreignKey: "created_by_user_id"});
  User.hasMany(StockRequest, { as: "stock_requests", foreignKey: "created_by_user_id"});
  Warehousesuser.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Warehousesuser, { as: "warehousesusers", foreignKey: "user_id"});
  JournalItem.belongsTo(Warehouse, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouse.hasMany(JournalItem, { as: "journal_items", foreignKey: "warehouse_id"});
  ProductStock.belongsTo(Warehouse, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouse.hasMany(ProductStock, { as: "product_stocks", foreignKey: "warehouse_id"});
  StockRequest.belongsTo(Warehouse, { as: "from_warehouse", foreignKey: "from_warehouse_id"});
  Warehouse.hasMany(StockRequest, { as: "stock_requests", foreignKey: "from_warehouse_id"});
  StockRequest.belongsTo(Warehouse, { as: "to_warehouse", foreignKey: "to_warehouse_id"});
  Warehouse.hasMany(StockRequest, { as: "to_warehouse_stock_requests", foreignKey: "to_warehouse_id"});
  Warehousesuser.belongsTo(Warehouse, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouse.hasMany(Warehousesuser, { as: "warehousesusers", foreignKey: "warehouse_id"});

  return {
    Address,
    CartItem,
    Cart,
    Category,
    Courier,
    JournalItem,
    JournalType,
    Journal,
    OrderItem,
    Order,
    Otp,
    ProductPicture,
    ProductStock,
    Product,
    Role,
    Status,
    StockRequestItem,
    StockRequest,
    User,
    Warehouse,
    Warehousesuser,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
