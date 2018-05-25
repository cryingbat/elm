var express = require("express");
var config = require("./config/index");

var port = process.env.PORT || config.build.port;

var app = express();
var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
var router = express.Router();

router.get('/',function (req,res,next) {
	req.url = "/index.html";
	next();
})


router.get('/api/goods', (req, res) => {
    res.json({
     errno: 0,
      data: goods
    })
   }),
router.get('/api/seller',(req,res) => {
    res.json({
      errno: 0,
      data: seller
    })
  }),
router.get('/api/ratings',(req,res) => {
    res.json({
      errno: 0,
      data: ratings
    })
  })
app.use("/api",router);
app.use(express.static('./dist'));

module.exports = app .listen(port,function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log("Your application is running here: http://localhost"+port);
})