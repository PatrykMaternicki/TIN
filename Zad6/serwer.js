/*jshint globalstrict: true, devel: true, node: true */
'use strict';

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var baza = require('./db/books');
var fs = require('fs');
var login = 'admin';
var password = 'nimda';
var antycache = {};
var authorized = false;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    var genres = baza().distinct("genre");
    res.render('index.ejs', {genres: genres});
});

app.get('/:gen', function (req, res) {
    var genres = baza().distinct("genre");
    baza.order("title");
    var books = baza({genre: req.params.gen}).select("___id", "author", "title", "genre");
    var genre = req.params.gen;
    res.render('index.ejs', {genres: genres, books: books, genre: genre, authorized: authorized});
});

app.post('/:gen', function (req, res) {
    var newAuthor=req.body.author;
    var newTitle=req.body.title;
    var genre = req.params.gen;
    var record = {
      "author" : newAuthor,
      "genre" : genre,
      "title" : newTitle,
    };
    var cleanCache = record.title == antycache.title && record.author == antycache.author ? true : false;
    if (!cleanCache) {
      baza.insert(record);
    }

    antycache = record;
    if (!authorized) {
      authorized = req.body.login == login && req.body.password == password ? true : false;
    }
    var genres = baza().distinct("genre");
    var books = baza({genre: genre}).select("___id", "author", "title", "genre");
    res.render('index.ejs', {genres: genres, books: books, authorized: authorized, genre: genre});
});


app.listen(3000, function () {
    console.log('Serwer działa na porcie 3000');
});


process.on('SIGINT',function(){
  var beginning = "/* jshint node: true */ \n var TAFFY = require('taffy'); \n var books = TAFFY(";
  var tafText = baza().stringify();
  var ending = "); \n module.exports = books;";
  var fileText = [beginning,tafText,ending].join("");
  fs.writeFileSync("db/books.js",fileText);
  console.log('\nshutting down');
  process.exit();
});
