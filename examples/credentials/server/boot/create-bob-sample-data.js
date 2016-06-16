module.exports = function(app, cb) {
  app.models.Two_Bob_Todo.create([
    {content: 'd'},
    {content: 'e'},
    {content: 'f'},
  ], function(err, models) {
    if (err) throw err;

    console.log('created bob models:', models);
    cb();
  });
};
