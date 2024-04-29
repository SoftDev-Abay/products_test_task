/**
The task is to implement the Shop protocol (you can do that in this file directly).
- No database or any other storage is required, just store data in memory
- No any smart search, use String method contains (case sensitive/insensitive - does not matter)
–   Performance optimizations are optional
 */
var ShopImpl = /** @class */ (function () {
    function ShopImpl() {
        this.products = [];
    }
    ShopImpl.prototype.addNewProduct = function (product) {
        // TODO: your implementation goes here
        // check if product with same id already exists
        if (this.products.some(function (p) { return p.id === product.id; })) {
            return false;
        }
        // add the product
        this.products.push(product);
        return true;
    };
    ShopImpl.prototype.deleteProduct = function (id) {
        // TODO: your implementation goes here
        // find product by id
        var product = this.products.findIndex(function (p) { return p.id === id; });
        if (product === -1)
            return false;
        // delete product
        this.products.splice(product, 1);
        return true;
    };
    ShopImpl.prototype.listProductsByName = function (searchString) {
        var _a;
        var productCount = new Map();
        var results = [];
        // First, count all product names that include the searchString.
        // to make sure that if a product name is repeated, we append the producer name to it for all dublicate values of the product name,
        // not just one of dublicates
        for (var _i = 0, _b = this.products; _i < _b.length; _i++) {
            var product = _b[_i];
            if (product.name.includes(searchString)) {
                productCount.set(product.name, (productCount.get(product.name) || 0) + 1);
            }
        }
        // basicakaly create needed array of product names
        // formatted if non unique product name
        for (var _c = 0, _d = this.products; _c < _d.length; _c++) {
            var product = _d[_c];
            if (product.name.includes(searchString)) {
                var name_1 = ((_a = productCount.get(product.name)) !== null && _a !== void 0 ? _a : 0) > 1
                    ? "".concat(product.producer, " - ").concat(product.name)
                    : product.name;
                results.push(name_1);
                if (results.length == 10)
                    break; // stop on the 10 result
            }
        }
        return results;
    };
    ShopImpl.prototype.listProductsByProducer = function (searchString) {
        // TODO: your implementation goes here
        var products = [];
        // find products that conatin searchString in producer
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product.producer.includes(searchString)) {
                products.push(product);
            }
        }
        // sort products by producer
        products.sort(function (a, b) { return a.producer.localeCompare(b.producer); });
        // create a list of product names
        var productsNames = products.map(function (p) { return p.name; });
        return productsNames.slice(0, 10);
    };
    return ShopImpl;
}());
function test(shop) {
    assert(!shop.deleteProduct("1"));
    assert(shop.addNewProduct({ id: "1", name: "1", producer: "Lex" }));
    assert(!shop.addNewProduct({
        id: "1",
        name: "any name because we check id only",
        producer: "any producer",
    }));
    assert(shop.deleteProduct("1"));
    assert(shop.addNewProduct({
        id: "3",
        name: "Some Product3",
        producer: "Some Producer2",
    }));
    assert(shop.addNewProduct({
        id: "4",
        name: "Some Product1",
        producer: "Some Producer3",
    }));
    assert(shop.addNewProduct({
        id: "2",
        name: "Some Product2",
        producer: "Some Producer2",
    }));
    assert(shop.addNewProduct({
        id: "1",
        name: "Some Product1",
        producer: "Some Producer1",
    }));
    assert(shop.addNewProduct({
        id: "5",
        name: "Other Product5",
        producer: "Other Producer4",
    }));
    assert(shop.addNewProduct({
        id: "6",
        name: "Other Product6",
        producer: "Other Producer4",
    }));
    assert(shop.addNewProduct({
        id: "7",
        name: "Other Product7",
        producer: "Other Producer4",
    }));
    assert(shop.addNewProduct({
        id: "8",
        name: "Other Product8",
        producer: "Other Producer4",
    }));
    assert(shop.addNewProduct({
        id: "9",
        name: "Other Product9",
        producer: "Other Producer4",
    }));
    assert(shop.addNewProduct({
        id: "10",
        name: "Other Product10",
        producer: "Other Producer4",
    }));
    assert(shop.addNewProduct({
        id: "11",
        name: "Other Product11",
        producer: "Other Producer4",
    }));
    var byNames = shop.listProductsByName("Product");
    assert(byNames.length == 10);
    byNames = shop.listProductsByName("Some Product");
    // console.log(byNames);
    assert(byNames.length == 4);
    assert(byNames.indexOf("Some Producer3 - Some Product1") >= 0);
    assert(byNames.indexOf("Some Product2") >= 0);
    assert(byNames.indexOf("Some Product3") >= 0);
    assert(byNames.indexOf("Some Product1") < 0);
    assert(byNames.indexOf("Some Producer1 - Some Product1") >= 0);
    var byProducer = shop.listProductsByProducer("Producer");
    assert(byProducer.length == 10);
    byProducer = shop.listProductsByProducer("Some Producer");
    // console.log(byProducer);
    assert(byProducer.length == 4);
    assert(byProducer[0] == "Some Product1");
    assert(byProducer[1] == "Some Product2" || byProducer[1] == "Some Product3");
    assert(byProducer[2] == "Some Product2" || byProducer[2] == "Some Product3");
    assert(byProducer[3] == "Some Product1");
}
function assert(condition) {
    if (!condition) {
        throw new Error("Assertion failed");
    }
}
test(new ShopImpl());
