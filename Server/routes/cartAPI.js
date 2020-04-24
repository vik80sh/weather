const express = require('express'),
  bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CartRouter = express.Router();

const Cart = require('../schema/cartSchema');

var decodedToken = '';
CartRouter.post('/addtocart', verifyToken, function (req, res, next) {
  const username = decodedToken.username;
  let promise = Cart.findOne({ username: username, city: req.body.cityname }).exec();
  promise.then(function (result) {
    if (result) {
      return res.status(501).json({ message: 'Already in your cart.' })
    }
    else {
      let cart = new Cart({
        username: username,
        city: req.body.cityname,
        country: req.body.country,
        lat: req.body.lat,
        lon: req.body.lon
      })
      let promise = cart.save();
      promise.then(function (doc) {
        return res.status(200).json(doc);
      })
      promise.catch(function (err) {
        return res.status(501).json({ message: 'Error registering user.' })
      })
    }
  });
})

CartRouter.get('/cartItem', verifyToken, function (req, res, next) {

  const username = decodedToken.username;
  let promise = Cart.find({ username: username }).exec();

  promise.then(function (doc) {
    return res.status(200).json(doc);
  })

  promise.catch(function (err) {
    return res.status(500).json(err);
  })

})
CartRouter.post('/remove', verifyToken, function (req, res, next) {
  const username = decodedToken.username;
  let promise = Cart.deleteOne({ username: username, city: req.body.city, country: req.body.country }).exec();

  promise.then(function (doc) {
    return res.status(200).json(doc);
  })
  promise.catch(function (err) {
    return res.status(500).json(err)
  })

})


function verifyToken(req, res, next) {
  let token = req.body.token;
  if (token == undefined)
    token = req.query.token

  jwt.verify(token, 'secret', function (err, tokendata) {
    if (err) {
      return res.status(400).json({ message: ' Unauthorized request' });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}
module.exports = CartRouter;