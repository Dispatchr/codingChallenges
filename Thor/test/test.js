var chai = require('chai'),
	request = require('request'),
	should = chai.should();


describe('Orders App', function() {

	var cookie, item_id;

	it('should log in', function(done) {
		var options = {
			method: 'post',
			url: 'http://localhost:3000/api/user/login',
			form: { username: 'admin', password: 'admin' }
		};

		request(options, function(err, response, body) {
			cookie = response.headers['set-cookie'];
			var oBody = JSON.parse(body);
			oBody.bSuccess.should.be.true;
			oBody.sUsername.should.equal('admin');
			done();
		});
	});

	it('should get all items', function(done) {
		var options = {
			method: 'get',
			url: 'http://localhost:3000/api/shop',
			headers: { cookie: cookie }
		}

		request(options, function(err, response, body) {
			var oBody = JSON.parse(body);
			oBody.bSuccess.should.be.true;
			oBody.aItems.should.be.a('array');
			oBody.aItems.should.have.length.above(0);
			oBody.aItems[0].name.should.be.a('string');

			done();
		});
	});

	it('should be able to add an item', function(done) {
		var options = {
			method: 'post',
			url: 'http://localhost:3000/api/admin/item',
			form: { name: 'iPhone 6 plus' , price: '2234.56', tags: 'home, work, technology, education' },
			headers: { cookie: cookie }
		}

		request(options, function(err, response, body) {
			var oBody = JSON.parse(body);
			item_id = oBody.item._id;
			oBody.bSuccess.should.be.true;
			oBody.item.should.have.property('_id');
			done();
		});
	});

	it('should update an item', function(done) {
		var options = {
			method: 'put',
			url: 'http://localhost:3000/api/admin/item',
			form: { _id: item_id, name: 'iPhone 6 plus' , price: '999.56', tags: 'lifestyle, technology, education' },
			headers: { cookie: cookie }
		}

		request(options, function(err, response, body) {
			var oBody = JSON.parse(body);
			oBody.bSuccess.should.be.true;
			oBody.updatedItem.price.should.equal(999.56); 
			done();
		});
	});

});























