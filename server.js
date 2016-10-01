var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var morgan = require("morgan");
var bodyParser = require("body-parser");

var Log = require("log");
    log = new Log("debug");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


var port = process.env.port || 3000;



app.use(express.static( __dirname + "/public"));

app.get('/',function(req,res){
  res.redirect('public/index.html');
});

io.on('connection',function(socket){
        socket.on('stream',function(image){
            socket.broadcast.emit('stream',image);
        });
});

http.listen(port,function(){
  log.info('Running ON %s',port);
});
