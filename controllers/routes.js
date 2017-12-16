const Sellers = require('../database/models/seller');
const Products = require('../database/models/product');
const Stores = require('../database/models/store');
const express = require('express');
const router = express.Router();

////////////////
// GET ROUTES //
////////////////

// FIND ALL SELLERS -working
router.get('/sellers', function(req, res) {
	console.log('Sellers accessed');
	Sellers.find({}, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

// // FIND A SPECIFIC SELLER BY SELLER ID -working
// router.get("/sellers/:sellerid", function(req, res) {

//     var sellerid = req.params.sellerid;

//     console.log(`${sellerid} accessed`);

//     Sellers.findById(sellerid, function(err, doc) {
//         if (err) {
//             console.log(err)
//         } else {
//             res.json(doc)
//         }
//     })
// });

// FIND ALL STORES - working
router.get('/stores/', function(req, res) {

	Stores.find({}, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

// FIND ALL STORES WITH PRODUCTS POPULATED- working
router.get('/stores/products', function(req, res) {

	Stores.find({})
		.populate('products')
		.exec(function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				res.json(doc);
			}
		});
});



// FIND ALL STORES BY A SELLER - working
router.get('/sellers/:sellerid/stores/', function(req, res) {

	Sellers.findById(req.params.sellerid)

		.populate('Stores')

		.exec(function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				res.json(doc);
			}
		});
});


// FIND ONE STORE FROM A SELLER BY IDs - working
router.get('/sellers/:sellerid/stores/:storeid', function(req, res) {

	Sellers.findById(req.params.sellerid)

		.populate('stores', null, { '_id': req.params.storeid })

		.exec(function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				res.json(doc.stores);
			}
		});
});

// FIND ONE STORE WITH PRODUCTS POPULATED- working
router.get('/stores/:storeid', function(req, res) {

	Stores.findById(req.params.storeid)
		.populate('products')
		.exec(function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				res.json(doc);
			}
		});
});


// GET A SPECIFIC PRODUCT
router.get('/products/:productid', function(req, res) {

	Products.findById(req.params.productid, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

// GET A LIST OF PRODUCTS THAT MATCH A TAG
router.get('/products/search/:keyword', function(req, res) {

	var str = req.params.keyword;
	var keyword = str.toLowerCase();

	Products.find({ keywords: keyword }, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});


// FIND PRODUCTS FROM A SPECIFICS STORE - not yet working
// DOES IT NEED TO WORK?
// router.get("/sellers/:sellername/:storename/products", function(req, res) {

//     var sellername = req.params.sellername;
//     var storename = req.params.storename;

//     console.log(`${sellername}'s store, ${storename} products, accessed`);

// });



/////////////////
// POST ROUTES //
/////////////////

// ADD NEW SELLER -working
router.post('/sellers', function(req, res) {
	var newSeller = new Sellers(req.body);

	newSeller.save(function(error, doc) {
		if (error) {
			console.log(error);
		} else {
			console.log('Seller posted to db');
			res.send(doc);
		}
	});
});

// ADD NEW STORE TO A CERTAIN SELLER- working
router.post('/stores/:sellerid/', function(req, res) {
	var newStore = new Stores(req.body);

	newStore.save(function(error, doc) {
		if (error) {
			console.log(error);
		} else {
			Sellers.findByIdAndUpdate(req.params.sellerid, { $push: { 'stores': doc._id } }, { new: true }, function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					res.send(doc);
				}
			});
		}
	});
});

//ADD NEW PRODUCTS TO STORE - working
router.post('/stores/:storeid/products', function(req, res) {

	var newProduct = new Products(req.body);

	newProduct.save(function(error, doc) {
		if (error) {
			console.log(error);
		} else {
			Stores.findByIdAndUpdate(req.params.storeid, { $push: { 'products': doc._id } }, { new: true }, function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					res.send(doc);
					console.log(`Product added to store ${req.params.storeid}`);
				}
			});
		}
	});
});


////////////////
// PUT ROUTES //
////////////////

// UPDATE SELLER INFO - working
router.put('/sellers/:sellerid', function(req, res) {

	var update = req.body;

	Sellers.findByIdAndUpdate(req.params.sellerid, { $set: update }, { new: true }, function(err, seller) {
		if (err) {
			console.log(err);
		} else {
			res.send(seller);
		}
	});
});

// UPDATE SPECIFIC STORE INFO - working
router.put('/stores/:storeid', function(req, res) {

	var update = req.body;

	Stores.findByIdAndUpdate(req.params.storeid, { $set: update }, { new: true }, function(err, store) {
		if (err) {
			console.log(err);
		} else {
			res.send(store);
		}
	});
});

// UPDATE SPECIFIC PRODUCT INFO
router.put('/products/:productid', function(req, res) {

	var update = req.body;

	Products.findByIdAndUpdate(req.params.productid, { $set: update }, { new: true }, function(err, product) {
		if (err) {
			console.log(err);
		} else {
			res.send(product);
		}
	});
});


///////////////////
// DELETE ROUTES //
///////////////////

// DELETE PRODUCT
router.delete('/products/:productid', function(req) {

	var productId = req.params.productid;

	Products.remove({ _id: productId }, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log(`Product id ${productId} deleted!`);
		}
	});
});

// DELETE STORE
router.delete('/stores/:storeid', function(req) {

	var storeId = req.params.storeid;

	Stores.remove({ _id: storeId }, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log(`Store id ${storeId} deleted!`);
		}
	});
});

// DELETE SELLER

module.exports = router;
