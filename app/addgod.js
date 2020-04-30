// app/addgod.js

var God       		= require('../app/models/god');

module.exports = function(app) {
    

    

    app.get('/addgod', function(req, res) {

		
		res.render('addgod.ejs', { message: req.flash('addgodMessage') });
	});
    

    

    app.post('/addgod', (req, res, done) => {
        var name = req.body.name;
        var generation = req.body.generation;
        var domain = req.body.domain;
        var description = req.body.description;
        var symbols = req.body.symbols;
        var ability = req.body.ability;
        var power = req.body.power;

        var overwrite = req.body.overwrite;
        
        God.findOne({ 'info.name' :  name }, function(err, god) {
 
            if (err)
                return done(err);


            if (god) {
                var exists = true;
                if (overwrite != "on") {
                    return done(null, false, req.flash('addgodMessage', name + ' exists already. Check overwrite to change.'), res.redirect('back') );
                    
                } else {
                    God.deleteMany({ 'info.name' : name }, function (err) {
                        if(err) 
                            return done(err);
                        
                        console.log("Successful deletion");
                    });
                };
                
            };
            var query = {'name': name};
 
            var newGod            = new God();


            newGod.info.name    = name;
            newGod.info.generation = generation;
            newGod.info.domain = domain;
            newGod.info.description = description;
            newGod.info.symbols = symbols
            newGod.stats.ability = ability
            newGod.stats.power = power

            newGod.save(function(err) {
                if (err)
                    throw err;
                if (exists && overwrite == "on") {
                    return done(null, newGod, req.flash('addgodMessage', name + ' updated.'), res.redirect('back'));
                } else {
                    return done(null, newGod, req.flash('addgodMessage', 'Successful Add.'), res.redirect('back'));
                };
                    
            });
            

        });
        
        
    });
    
};
