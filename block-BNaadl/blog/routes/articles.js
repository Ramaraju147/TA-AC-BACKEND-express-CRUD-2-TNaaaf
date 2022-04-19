var express = require('express');
var router = express.Router();
const articleModel = require('../models/article')
const commentsModel = require('../models/comment')

router.get('/', function(req, res, next) {
  articleModel.find({}, (err,articles) => {
    if(err) next(err);
    res.render('articles',{articles})
  })
});

router.get('/new', function(req, res, next) {
    res.render('newArticle')
});

router.post('/', function(req, res, next) {
  articleModel.create(req.body, (err,articles) => {
    if(err) next(err);
    res.redirect('/articles')
  })
});

router.get('/:id', function(req, res, next) {
  articleModel.findById(req.params.id).populate('comments').exec((err,article) => {
    if(err) next(err);
    console.log(article);
    res.render('article',{article})
  })
});

router.post('/:id', function(req, res, next) {
  articleModel.findByIdAndUpdate(req.params.id,req.body,(err,article) => {
    if(err) next(err);
    res.redirect('/articles/'+req.params.id)
  })
});

router.get('/:id/delete', function(req, res, next) {
  articleModel.findByIdAndDelete(req.params.id, (err,article) => {
    if(err) next(err);
    res.redirect('/articles');
  })
});

router.get('/:id/like', function(req, res, next) {
  articleModel.findById(req.params.id, (err,article) => {
    if(err) next(err);
    articleModel.findByIdAndUpdate(req.params.id,{likes: article.likes+1}, (err,article) => {
      if(err) next(err);
      res.redirect('/articles/'+req.params.id)
    })
  })
});

router.get('/:id/edit', function(req, res, next) {
  articleModel.findById(req.params.id, (err,article) => {
    if(err) next(err);
    res.render('editArticle',{article});
  })
});

router.post('/:id/comments', function(req, res, next) {
  req.body.articleId = req.params.id;
  commentsModel.create(req.body, (err,article) => {
    if(err) next(err);
    articleModel.findByIdAndUpdate(req.params.id,{"$push": {"comments":article._id}}, (err,article) => {
      res.redirect('/articles/'+req.params.id);
    })
  })
});

module.exports = router;
