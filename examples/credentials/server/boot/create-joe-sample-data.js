module.exports = function(app, cb) {
  app.models.One_Joe_Todo.create([
    {content: 'a'},
    {content: 'b'},
    {content: 'c'},
  ], function(err, models) {
    if (err) throw err;

    console.log('created joe models:', models);
    cb();
  });
};
