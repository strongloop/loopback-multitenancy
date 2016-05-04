module.exports = function(app, cb) {
  var Two_Bob_Todo = app.models.Two_Bob_Todo;
  app.dataSources.db2.automigrate('Two_Bob_Todo', function(err) {
    if (err) return cb(err);
    Two_Bob_Todo.create([
      {content: 'd'},
      {content: 'e'},
      {content: 'f'},
    ], cb);
  });
};
