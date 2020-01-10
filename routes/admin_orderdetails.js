var express = require('express');
var router = express.Router();
var Orderdetails = require('../models/orderdetail');

router.get('/', function(req, res){
	Orderdetails.find(function(err, orderdetails){
		res.render('admin/orderdetails',{
			orderdetails : orderdetails
		});
	});
});
router.get('/delete-ordersdetails/:id', function(req,res){
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
		res.redirect('/admin/ordersdetails/');
	});
});

module.exports = router;