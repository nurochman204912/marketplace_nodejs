var express = require('express');
var router = express.Router();
var Orders = require('../models/order');
var Orderdetails = require('../models/orderdetail');

router.get('/', function(req, res){
	Orders.find(function(err, orders){
		res.render('admin/orders',{
			orders : orders
		});
	});
});


router.get('/delete-orders/:id', function(req,res){
	Orders.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			return console.log(err);
		}

		Orders.find(function(err, orders){
			if (err) {
				return console.log(err);		
			}else{
				req.app.locals.orders = orders;
			}
		});

		req.flash('success', 'Jangan Lupa segera Kirimkan Barangnya ya..!!!');
		res.redirect('/admin/orders/');
	});
});

module.exports = router;