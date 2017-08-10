var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
                ${date}
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

app.get('/:articleName', function (req, res) {
    
  var articleName=req.params.articleName;    
  res.send(createTemplate(articles[articleName]));
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

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
