var express = require('express');
var app = express();
var fs        = require('fs');
var path = require('path');
var models = require('./models');
var orm = require('./orm-lite');
var Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var Users = new orm('test_users', 'postgres://postgres:jannat15@localhost/orm');
// sequelize model:create --name test_user --attributes "firstname:string, lastname:string"
app.set('view engine', 'pug');
// to support URL-encoded bodies
  app.use(express.urlencoded());
  app.use(express.static('./assets'));
  app.use(express.static(path.join(__dirname, 'assets')));



app.get('/', function(req, res){
        Users.getAll(function(data){
            res.render('index',{
                data: data,
                title: 'Welcome users :'
               });
        });
});

app.get('/form', function(req, res){
     res.render('form',{
     title: 'Add a user:'
  });
});

app.post('/add', function(req, res){
  Users.insertIntoTable({
              firstName : req.body.firstName,
              lastName : req.body.lastName
         }, function(){
    res.redirect('/');
      });
 })

app.get('/user/*', function(req, res){
       var requestSegments = req.path.split('/');
  console.log(requestSegments[requestSegments.length - 1]);
      Users.findById(requestSegments[requestSegments.length - 1], function(data){
                           console.log(data);
        res.render('user',{
               data: data[0]
            });
          });
});


app.get('*', function(req, res) {
              res.status(404).send('<h1>uh oh! page not found!</h1>');
});

var server = app.listen(3330, function(){
                 console.log('Open http://localhost:3330 in the browser');
});
