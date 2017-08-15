var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'faizanbari1017',
    database: 'faizanbari1017',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    passsword: process.env.DB_PASSWORD
};















var app = express();
app.use(morgan('combined'));

var articles={
    article1:{ 
            title:'Article1 FaizanBari',
            heading:'Article1',
            date:'Aug8 2017',
            content:`<p>
            This is my article 1 content.
            </p>`
        
                },
    article2:{
            title:'Article2 FaizanBari',
            heading:'Article2',
            date:'sep8 2017',
            content:`<p>
            This is my article 2 content.
            </p>`
    },
    article3:{ 
            title:'Article3 FaizanBari',
            heading:'Article3',
            date:'oct8 2017',
            content:`<p>
            This is my article 3 content.
            </p>`}
};





function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;

    var htmlTemplate=`<html>
        <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width = device-width, initial-scale = 1">
        <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
        <div class="container">    
            <div>
                <a href='/'>Home</a>
            </div>
            <hr/>
            
            <h3>
                ${heading} 
            </h3>
            
            <div>
                ${date.toDateString() }
            </div>
            
            <div>
                ${content}
                    
            </div>
        </div>
        </body>
        
    </html>
    `;
    return htmlTemplate;
}

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(path.join(counter.toString()));
});






app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});











var pool = new Pool(config); 
app.get('/test-db', function (req, res) {
  //make a select request
  //return a response with the results
  pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            
            res.send(JSON.stringify(result.rows)); 
        }
  
  
  });
});







var names=[];
app.get('/submit_name/', function (req, res) {//URL:/submit_name?name=xxxx
    
    //Get the name from the request
    
    var name=req.query.name;
    
    names.push(name);
    //JSON:Javascript object notation
    res.send(JSON.stringify(names));
});









app.get('/articles/:articleName', function (req, res) {
    
  var articleName=req.params.articleName;    
  
  pool.query("SELECT * FROM sql1 WHERE title = $1",[req.params.articleName], function (err, result){
        if (err)
        {
           res.status(500).send(err.toString()); 
        }
        else{
            if (result.rows.length ===0){
                res.status(404).send('Article not found');
            }else{
                var articleData = result.rows[0];
                 res.send(createTemplate(articleData));
            }
        }
  });
  
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names=[];
app.get('/submit_name/', function (req, res) {//URL:/submit_name?name=xxxx
    
    //Get the name from the request
    
    var name=req.query.name;
    
    names.push(name);
    //JSON:Javascript object notation
    res.send(JSON.stringify(names));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
