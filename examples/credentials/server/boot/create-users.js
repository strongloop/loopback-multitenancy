module.exports = function(app, cb) {
  app.models.user.create([
    {username: 'Joe', password: 'doe'},
    {username: 'Bob', password: 'doe'}
  ], function(err, users) {
    if (err) throw err;

    console.log('created users:', users);
    cb();
  });
};
