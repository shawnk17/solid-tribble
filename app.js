const express = require('express');

const app = express();
let books = [];

const pageTemplate = '<html><head><title>{{title}}</title></head><body><header><nav><ul><li><a href="/">Home</a></li><li><a href="/newbook">Add A New Book</a></li></ul></nav></header><main>{{content}}</main><footer>&copy;2017-2018 Shawnsvill, LLC</footer></body></html>';
const bookEntryForm = '<form action="/addnewbook" method="GET">' +
    '<label for="title">Title</label>' +
    '<input type="text" id="title" name="title">' +
    '<label for="author">Author</label>' +
    '<input type="text" id="author" name="author">' +
    '<button type="submit">Save</button>'
    '</form>';

app.use(express.static('public'));

app.get("/", (req,res) => {
    let content = '<h1>Book Manager</h1><ul>';
    books.forEach((book, idx) => {
        content += "<li>" + book.title + " by " + book.author + "</li>";
    });

    content += "</ul>";

    let page = createView(pageTemplate, "Home", content);
    res.send(page);
});

app.get("/newbook", (req,res) =>{
    let page = createView(pageTemplate, "New Book", bookEntryForm);
    res.send(page);
});

app.get("/addnewbook", (req,res) => {

    let book = {
        "title": req.query.title,
        "author": req.query.author
    };

    books.push(book);
    let content = '<h1>Got It</h1><p><a href="/">Home</a></p>';
    let page = createView(pageTemplate, "New Book", content);
    res.send(page);
});

app.listen(3000, () => {
    console.log("Listening on 3000");
});

let createView = function(pageTemplate, title, content){
    let curPage = pageTemplate.replace("{{title}}", title);
    curPage = curPage.replace("{{content}}",content);

    return curPage;
};