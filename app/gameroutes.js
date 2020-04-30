// app/gameroutes.js



module.exports = function(app) {




    app.get('/join', function(req, res) {
        res.render('join.ejs', { message: req.flash('addgodMessage') });
	});

    app.get('/create', function(req, res) {
        res.render('dashboard.ejs', { message: req.flash('addgodMessage') });
	});

    app.get('/codenames', function(req, res) {
        res.render('codenames.ejs');
  });

    app.get('/spymaster', function(req, res) {
        res.render('spymaster.ejs');
  });

  app.get('/spymaster2', function(req, res) {
      res.render('spymaster2.ejs');
  });


};
