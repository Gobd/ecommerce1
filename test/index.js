var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../index.js');
var testProd = {title: 'he22sllo', desc: 'some stuff', price: 19.99};
var should = chai.should();
var expect = chai.expect;

describe('index.js', function() {
    var idList = [];
    it('should create a new product', function (done) {
        testProd.title = Math.floor(Math.random() * 1000);
        chai.request(server)
            .post('/products').send(testProd).end(function (err, res) {
            idList.push(res.body._id);
            res.should.have.status(200);
            prod1 = res.body;
            done();
        })
    });
    it('should create a new product with our properties', function (done) {
        testProd.title = Math.floor(Math.random() * 1000).toString();
        chai.request(server)
            .post('/products').send(testProd).end(function (err, res) {
            idList.push(res.body._id);
            res.body.title.should.equal(testProd.title);
            res.body.desc.should.equal(testProd.desc);
            res.body.price.should.equal(testProd.price);
            done();
        })
    });
    it('should respect unique in Product schema', function (done) {
        testProd.title = 'title';
        chai.request(server)
            .post('/products').send(testProd).end(function (err, res) {
            idList.push(res.body._id);
            chai.request(server)
                .post('/products').send(testProd).end(function (err, res) {
                res.should.have.status(500);
                done();
            })
        })
    });
    it('should respect require in Product schema', function (done) {
        var delObj = testProd;
        delete delObj.desc;
        chai.request(server)
            .post('/products').send(delObj).end(function (err, res) {
            res.should.have.status(500);
            done();
        })
    });
    it('should return products', function (done) {
        chai.request(server)
            .get('/products').end(function (err, res) {
            res.should.have.status(200);
            done();
        })
    });
    it('should delete products by id, status 200', function (done) {
        for (var i = 0; i < idList.length; i++) {
            var count = 0;
            chai.request(server)
                .delete('/products/' + idList[i]).end(function (err, res) {
                count ++;
                res.should.have.status(200);
                if (i === count) {
                    done();
                }
            })
        }
    });
    it('should delete products by id, get null', function (done) {
        for (var i = 0; i < idList.length; i++) {
            var count = 0;
            chai.request(server)
                .get('/products/' + idList[i]).end(function (err, res) {
                count ++;
                res.should.have.status(200);
                expect(res.body).to.be.null;
                if (i === count) {
                    done();
                }
            })
        }
    })
});
