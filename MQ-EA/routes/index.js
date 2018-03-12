var express = require('express'),
    bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var users = new Schema({
    name: String,
    password: String,
    subjects:[{type: Schema.ObjectId,ref:'subjects'}],
    studies:[{type: String}]
});
var subjects=new Schema({
    name: String,
    users: [{type: Schema.ObjectId ,ref:'users'}],
    when: String
});

mongoose.connect("mongodb://localhost:27017/users", function(err, users) {
    if(!err) {
        console.log("We are connected")
    }
});
var Usuario = mongoose.model('users', users);
var Subject = mongoose.model('subjects',subjects);
var u;
var s;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",  "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', "Content-Type, Authorization, Content-Length, X-Requested-With,X-Custom-Header,Origin");
    res.header('Access-Control-Allow-Credentials',"true")
    next();
});
app.post('/push', function (req, res) {

        u=new Usuario({name:req.body.name,password:req.body.password});
        u.save().then(function(){});

    res.send('Got a POST request')
});
app.post('/newSb', function(req, res){
   s = new Subject({name: req.body.name,when:req.body.when});
   s.save().then(function () {
   });
});
app.post('/login', function (req, res) {

        Usuario.find({name:req.body.login,password:req.body.password}).then(function(response){
            if(response[0]!=undefined) {
                res.sendStatus(200);
            }
            else res.sendStatus(500);
        });

});
app.put('/update', function (req, res) {
    var userList=[];

    Usuario.findOneAndUpdate({name:req.body.name},{password:req.body.new}).then(function () {
        Usuario.find({},null,{sort:{name:1}},function (err, usuarios) {
            for (var i = 0; i < usuarios.length; i++) {
                userList.push({name: usuarios[i].name, password: usuarios[i].password});
            }
            res.send(userList);

        });
    })
});
app.put('/updsub', function (req, res) {

    Usuario.find({name:req.body.name},function (err,usuario) {
        var userList = [];
        u = usuario;

        if (u[0]!= undefined) {
        Subject.update({name: req.body.subject}, {$push: {users: u[0]._id}}, function (err, upd) {

        });
        Subject.find({name:req.body.subject},function (err,subj) {

            Usuario.update({name:req.body.name},{$push:{subjects:subj[0]._id}},function (err,up) {

            });
        });
        }
        res.send(userList);
    });

        //userList=usuarios.users;
        //Subject.findOneAndUpdate({name:"EA"},{users:userList}).then(function () {
    //})

});

app.post('/getonesub', function(req, res) {
    var students=[];
    Subject.find({name:req.body.name}, function(err, subjects) {

        if(subjects[0]!=undefined){
        Usuario.populate(subjects, {path: "users"},function(err, subjects) {

            var i = 0;
            for (; i < subjects[0].users.length; i++) {
                students.push({name: subjects[0].users[i].name, password: subjects[0].users[i].password, studies: subjects[0].users[i].studies,  done: false})
            }
            students.sort(function (a, b) {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;//default return value (no sorting)
            });
            res.send(students);
        });
        }else {
            res.send(students);
        }

    });
});
app.post('/getonetit', function(req, res) {
    var us=[];
    Usuario.find({}, function(err, users) {
        var i = 0;
        for (; i < users.length; i++) {

            for (var j = 0; j < users[i].studies.length; j++) {
                if (users[i].studies[j] == req.body.name) {
                    us.push({name: users[i].name});
                }
            }
        }
        console.log(us);
        res.send(us);
        });


});
app.post('/studet',function (req,res) {

    var student=[];
    Usuario.find({name:req.body.name}, function(err, stu) {
        if(stu[0]!=undefined){
            Subject.populate(stu, {path: "subjects"},function(err, stu) {
                var i = 0;
                var subj = [];
                for (; i < stu[0].subjects.length; i++) {
                    subj.push({namesub: stu[0].subjects[i].name})
                }
                student.push({name:stu[0].name,pass:stu[0].password,sub:subj});
                res.send(student[0]);
            });
        }else {
            res.send(student);
        }

    });

});
app.post('/getdetailsub', function(req, res) {
    Subject.find({name:req.body.name}, function(err, subjects) {
        var subjects2=[];
        if(subjects[0]!=undefined){

                for (var i = 0; i < subjects.length; i++) {
                    subjects2.push({name:subjects[i].name,slength:subjects[i].users.length,period:subjects[i].when});
                }
                subjects2.sort(function(a, b){
                    return b.slength-a.slength
                });
                res.send(subjects2);
        }
        else {
            res.send(subjects2);
        }
    });
});

app.delete('/delete', function (req, res) {

        Usuario.findOneAndRemove({name:req.body.name,password:req.body.password}, function (err, user) {
            //if (err) throw err;
            // delete him


             /*var listDelete=req.body;
             var i = 0;
             var len = listDelete.length;
             for(;i<len;i++) {
                 console.log(listDelete[i])
                 Usuario.findOneAndRemove({name: listDelete[i]}, function () {
                 });
             }*/
             var userList = [];
             Usuario.find(function (err,usuarios) {
                 for(var i = 0; i< usuarios.length;i++){
                     userList.push({name: usuarios[i].name, password: usuarios[i].password});
                 }
                 res.send(userList);

             });
    });
});
app.get('/all', function (req,res) {
    var users = [];
    Usuario.find({},null,{sort:{name:1}},function(err,usuarios){
        for (var i = 0; i < usuarios.length; i++) {
            users.push({name: usuarios[i].name, password: usuarios[i].password, studies: usuarios[i].studies,  done:false});
        }
        res.send(users);
    });
});
app.get('/allsubjects', function (req,res) {
    var subjects = [];
    Subject.find({},null,{sort:{name:1}},function(err,subj){
        for (var i = 0; i < subj.length; i++) {
            subjects.push({name:subj[i].name,slength:subj[i].users.length});
        }
        subjects.sort(function(a, b){
            return b.slength-a.slength
        });
        res.send(subjects);
    });
});
app.get('/filterdb/:letter', function (req, res) {
    var StudentList=[];
    var letter=req.params.letter;
    Usuario.find({"name":{"$regex": letter} },function (err, st) {
        for (var i = 0; i < st.length; i++) {
            StudentList.push({name: st[i].name});
        }
        res.send(StudentList);
    });
});

app.listen(3500, function () {
    console.log('App listening on port 3500!!')
});

