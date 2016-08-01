/**
 * HomeController
 *
 * @description :: Server-side logic for managing Tigers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var satelize = require('satelize');

module.exports = {

    index: function(req, res) {
        if (req.session.user) {
            return res.redirect('/Auction');
        }
        var error = req.flash('error');
        return res.view({
            error: error
        });
    },

    auction: function(req, res) {
        if (!req.session.user) {
            req.flash('error', 'Please fill the details and click start !');
            return res.redirect('/');
        }
        var error = req.flash('error');
        return res.view({
            error: error,
            user: req.session.user
        });
    },

    registerUser: function(req, res) {

        var model = req.body;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
            req.socket.remoteAddress || req.connection.socket.remoteAddress;

        satelize.satelize({ ip: ip }, function(err, payload) {
            if (payload) {
                if (payload.ip) {
                    model.ip = payload.ip;
                }
                if (payload.continent) {
                    model.continent = payload.continent.en;
                }
                if (payload.country) {
                    model.country = payload.country.en;
                }
            }
            User.create(model).exec(function createCB(err, user) {
                User.publishCreate(user);
                var date = new Date();
                date.setMinutes(date.getMinutes() + 5);
                user.auctionExpiresOn = date;
                req.session.user = user;
                return res.ok(user);
            });
        });
    },

    saveBid: function(req, res) {
        var model = req.body;
        Bid.find({
            user : model.user
        }).exec(function(err,bids){
            if(err){
                return res.serverError(err);
            }
            else{
                if(bids.length<5){
                    Bid.create(model).exec(function createCB(err, bid) {
                        Bid.publishCreate(bid);
                        return res.ok(bid);
                    });
                }
                else{
                    return res.serverError({
                        message : "Can't create more than 5 bids."
                    });
                }
            }
        })
    }
};
