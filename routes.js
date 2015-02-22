var express = require('express'),
    passport = require('passport'),
    ensureAuthenticated = require('./config/passport'),
    models = require('./models'),
    fixtures = require('./fixtures'),
    _ = require('underscore');

var router = express.Router(),
    User = models.user,
    Item = models.item,
    Pin = models.pin;


router.get('/', function(req, res){
    Item.find({}).populate('user').lean().exec(function(err, popular){
        if (err)
            return console.log(err);
        if (!req.isAuthenticated())
            return res.render('trending', {location: 'trending',user: req.user, stuff: popular});

        User.findOne({displayName: req.user.name}).select('_id').lean().exec(function(err, user){
            Pin.find({user: user._id}).select('item -_id').lean().exec(function(err, pinned_items){
                var pinned_items_ids = _.pluck(pinned_items, 'item');

                _.each(popular, function(item){
                    if (pinned_items_ids.indexOf(item._id) >= 0){
                        item.pinned = true;
                    }
                });

                return res.render('trending', {location: 'trending', user: req.user, stuff: popular});
            })
        });
    });
});

router.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', {user: req.user});
});

router.get('/login', function(req, res){
    if (req.isAuthenticated())
        return res.redirect('/');
    res.render('login', {user: req.user});
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', 
    passport.authenticate('github', {failureRedirect: '/login'}),
    function(req, res) {
        User.findOne({displayName: req.user.username}, function(err, foundUser){
            if (!foundUser){
                User.create({displayName: req.user.displayName, avatar_url: req.user._json.avatar_url},
                function(err, newUser){
                    if (err){
                        return console.log(err);
                    }
                });
            }
            return res.redirect('/');
        });
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/fixtures', function(req, res){
    fixtures();

    res.send('fixtures ok');
});

module.exports = router;