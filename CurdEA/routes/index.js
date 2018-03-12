var express = require('express'),
    bodyParser = require('body-parser'),
    bigInt = require('big-integer'),
    bignum = require('bignum');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var app = express();
var mongoose = require('mongoose');
var users = mongoose.Schema({
    name: String,
    password: String
});
mongoose.connect("mongodb://localhost:27017/users", function(err, users) {
    if(!err) {
        console.log("We are connected")
    }
});
var Usuario = mongoose.model('users', users);
var u;
app.use(express.static('public'));
app.use(bodyParser.json());



var p = bignum.prime(512,true);
var q = bignum.prime(512,true);
var n = p.mul(q);
var fin = (p.sub(1)).mul(q.sub(1));
var e = bignum.prime(512,true);
var d = e.invertm(fin);


var mensaje = "Hola";

var mbuf = Buffer.from(mensaje,'utf-8');

var mbn = bignum.fromBuffer(mbuf);

var enc = mbn.powm(e,n);

var denc = enc.powm(d,n);

console.log(denc.toBuffer().toString('utf-8'));









app.post('/push', function (req, res) {
        u=new Usuario({name:req.body.name,password:req.body.password});
        u.save().then(function(){})
    res.send('Got a POST request')
});

app.put('/update', function (req, res) {
    var userList=[];

    Usuario.findOneAndUpdate({name:req.body.name},{password:req.body.new}).then(function () {
        Usuario.find(function (err, usuarios) {
            for (var i = 0; i < usuarios.length; i++) {
                userList.push({name: usuarios[i].name, password: usuarios[i].password});
            }
            res.send(userList);

        });
    })
});

app.delete('/delete', function (req, res) {

    Usuario.findOneAndRemove({name:req.body.name,password:req.body.password}, function (err, user) {

             var userList = [];
             Usuario.find(function (err,usuarios) {
                 for(var i = 0; i< usuarios.length;i++){
                     userList.push({name: usuarios[i].name, password: usuarios[i].password});
                 }
                 res.send(userList);

             });
   });
});
app.delete('/deleteList', function (req,res) {

    var listDelete=req.body;
    var i = 0;
    var len = listDelete.length;
    for(;i<len;i++) {
        Usuario.findOneAndRemove({name: listDelete[i]}, function () {
        });
    }
    var userList = [];
    Usuario.find(function (err,usuarios) {
        for(var i = 0; i< usuarios.length;i++){
            userList.push({name: usuarios[i].name, password: usuarios[i].password});
        }
        res.send(userList);

    });


});

app.get('/all', function (req,res) {
    var users = []
    Usuario.find(function(err,usuarios){
        for (var i = 0; i < usuarios.length; i++) {
            users.push({name: usuarios[i].name, password: usuarios[i].password, done:false});
        }

        res.send(users);
    });
});

app.get('/filterdb/:letter', function (req, res) {
    var userList=[];
    var letter=req.params.letter;
    Usuario.find({"name":{"$regex": letter} },function (err, us) {
        for (var i = 0; i < us.length; i++) {
            userList.push({name: us[i].name, password: us[i].password, done:false});
        }
        res.send(userList);
    });
});

app.listen(3500, function () {
    console.log('App listening on port 3500!!')
});
module.exports = router;
// Retrieve
