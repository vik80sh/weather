const express = require('express'),
  bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const UsersRouter = express.Router();

const User = require('../schema/UserSchema');


UsersRouter.post('/register', function (req, res, next) {
  let promise = User.findOne({ emailname: req.body.email }).exec();
  promise.then(function (result) {
    if (result) {
      return res.status(201).json({ message: 'Sorry !! The email id already present in database' })
    } else {
      var user = new User({
        username: req.body.email,
        password: User.hashPassword(req.body.password)
      });
      let promise1 = user.save();
      promise1.then(function (doc) {
        return res.status(201).json({ message: 'Registation Succusful !!' });
      })
      promise1.catch(function (err) {
        return res.status(501).json({ message: 'Error registering user.' })
      })
    }
  });

  promise.catch(function (err) {
    return res.status(500).json({ message: 'Some internal error' });
  })


})

createToken = (username) => {
  let token = jwt.sign({ username: username}, 'secret', { expiresIn: "3600s" });
  return token;
}
UsersRouter.post('/login', function (req, res, next) {
  let promise = User.findOne({ username: req.body.username }).exec();
  promise.then(function (result) {
    if (req.body.type === 'y') {
      if (result) {
        if (result.isValid(req.body.password)) {
          let token = this.createToken(result.username);
          return res.status(201).json(token);
        } else {
          return res.status(501).json({ message: ' Invalid Credentials' });
        }
      }
      else {
        return res.status(501).json({ message: 'username is not registered.' })
      }
    } else {
      if (result)
        return res.status(201).json({ message: 'Sorry !! The username is already present in database' })
      else {
        var user = new User({
          username: req.body.username,
          password: User.hashPassword(req.body.password)
        });
        let promise1 = user.save();
        promise1.then(function (doc) {
          let token = this.createToken(req.body.username);
          return res.status(201).json(token);
        })
        promise1.catch(function (err) {
          return res.status(501).json({ message: 'Error registering user.' })
        })
      }
    }
  });

  promise.catch(function (err) {
    return res.status(500).json({ message: 'Some internal error' });
  })
})

var decodedToken = '';
UsersRouter.get('/username', verifyToken, function (req, res, next) {
  return res.status(200).json(decodedToken.username);
})

function verifyToken(req, res, next) {
  let token = req.query.token;

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

module.exports = UsersRouter;
