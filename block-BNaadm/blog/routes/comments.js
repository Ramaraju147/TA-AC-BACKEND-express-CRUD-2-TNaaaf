var express = require('express');
var router = express.Router();
const commentsModel = require('../models/comment');
const articleModel = require('../models/article')

router.get('/:id/delete', function(req, res, next) {
    commentsModel.findByIdAndDelete(req.params.id, (err,comment) => {
    if(err) next(err);
    articleModel.findByIdAndUpdate(comment.articleId,{$pull: {comments: comment._id}}, (err,article) => {
      res.redirect('/articles/'+comment.articleId)
    })
  })
});

router.get('/:id/like', function(req, res, next) {
  commentsModel.findById(req.params.id, (err,comment) => {
  if(err) next(err);
  commentsModel.findByIdAndUpdate(req.params.id,{likes: comment.likes+1}, (err,comment) => {
    res.redirect('/articles/'+comment.articleId)
  })
})
});

router.get('/:id/edit', function(req, res, next) {
  commentsModel.findById(req.params.id, (err,comment) => {
  if(err) next(err);
  res.render('editComment',{comment});
})
});

router.post('/:id/edit', function(req, res, next) {
  commentsModel.findByIdAndUpdate(req.params.id,req.body,(err,comment) => {
  if(err) next(err);
  res.redirect('/articles/'+ comment.articleId);
})
});

module.exports = router;
