const express = require('express');
const app = express()
const port = 3000;
var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');

app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static('public'));

app.get('*', function(request, response, next){/* '*'은 모든것*/
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();/*다음 미들웨어로 넘어가는것*/
  });
});

app.get('/', function(req, res){
    var title = 'Add your information:D';
    var description = 'Write your Name, Phone Number, School ID and E-mail.';
    var list = template.list(req.list)
    var html = template.HTML(title, list, 
        `<h2>${title}</h2>${description}
        <img src="/images/사람.jfif" style="width:300px; display:block; margin-top:10px;">`,
        `<p><a href="/create">create</a></p>`
    );
    res.send(html);
});

app.get('/page/:pageId', function(req, res, next){
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        if(err){
            next(err);
        }else{
            var title = req.params.pageId;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
            });
            var list = template.list(req.list);
            var html = template.HTML(sanitizedTitle, list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                `
                <p><a href = "/update/${sanitizedTitle}">update<a></p>
                <form action="/delete_process" method="post">
                    <input type = "hidden" name = "id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                </form>`
                
            );
            res.send(html);
        }
    });
});

app.get('/create', function(req, res){
    var title = 'create';
    var list = template.list(req.list);
    var html = template.HTML(title, list, `
    <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="Information"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    res.send(html); 
});

app.post('/create_process', function(req,res){
    var post = req.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        res.redirect(`/?id=${title}`);
    })
});

app.get('/update/:pageId', function(request,response){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = template.list(request.list);
      var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );
      response.send(html);
    });
});

app.post('/update_process', function(request,response){
    var body = '';
      var post = request.body;
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.redirect(`/?id=${title}`);
        })
      });
  });

  app.post('/delete_process', function(request,response){
        var post = request.body;
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(error){
          response.redirect('/');/*어디로 갈지 지정해줌*/
        })
  });
  
  app.use(function(req, res, next){
    res.status(404).send('Sorry can not find that!');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(port, () => {
    console.log(`Welcome on port ${port}`)
})