var express = require('express')
var bodyparser = require('body-parser')
var mysql = require('mysql')
var app = express()

app.use(bodyparser.urlencoded({}))
var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456789',
	database:'kechengbiao',
	port:3306
})
app.post('/',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `select * from card `
		connection.query(sql,function(err,data){
			if(err){
				console.log(err)
				return
			}
			res.send(data)
		})
	})
});
app.post('/updata',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    var json=req.body
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `update card set one=? where uid={json.region} and state={json.first}`
		connection.query(sql,json.first,function(err,data){
			if(err){
				console.log(err)
				return
		    }
			res.send(data)
			connection.end()
		})
	})
})
app.listen(3000,function(){
	console.log('ok')
})