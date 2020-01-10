var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');
var Admin = require('../models/admin');

router.get('/login_admin', function(req, res){
	if(res.locals.admin){
		res.redirect('/');
	}

	res.render('login_admin',{
		title: 'LogIn Admin'
	});
});

router.post('/login_admin', function(req, res, next){
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/admin/login_admin',
		failureFlash: true
	})(req, res, next);
});

router.get('/register_admin', function(req, res){
	res.render('register_admin',{
		title: 'Register Admin'
	});
});

router.post('/register_admin', function(req,res){

	var name = req.body.name;
	var email = req.body.email;
	var adminname = req.body.adminname;
	var password = req.body.password;
	var password2 = req.body.password2;

	req.checkBody('name', 'Nama tidak boleh kosong!').notEmpty();
    req.checkBody('email', 'Email tidak boleh kosong!').isEmail();
    req.checkBody('adminname', 'adminname tidak boleh kosong!').notEmpty();
    req.checkBody('password', 'Password tidak boleh kosong!').notEmpty();
    req.checkBody('password2', 'Konfrimasi Password tidak sama dengan Password').equals(password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register_admin', {
            errors: errors,
            title: 'Register Admin'
        });
	}else{
		Admin.findOne({adminname: adminname}, function(err, admin){
			if (err) {
				console.log(err);
			}

			if(admin){
				req.flash('danger', 'adminname sudah ada, silahkan memakai yang lainnya');
				res.redirect('/admin/register_admin');
			}else{
				var admin = new Admin({
					name: name,
					email: email,
					adminname: adminname,
					password: password,
					admin: 0
				});

				bcrypt.genSalt(10, function(err, salt){
					bcrypt.hash(admin.password, salt, function(err, hash){
						if (err) {
							console.log(err);
						}

						admin.password = hash;

						admin.save(function(err){
							if (err) {
								console.log(err);
							}else{
								req.flash('success', 'Selamat, Kamu telah registerasi di BabaShop');
								res.redirect('/admin/login_admin');
							}
						});
					});
				});
			}
		});
	}
});

router.get('/logout_admin', function(req, res){
	req.logout();

	req.flash('success', 'Kamu telah keluar!');
	res.redirect('/admin/login_admin');
});

module.exports = router;