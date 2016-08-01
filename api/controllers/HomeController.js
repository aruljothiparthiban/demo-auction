/**
 * HomeController
 *
 * @description :: Server-side logic for managing Tigers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var satelize = require('satelize');
var moment = require('moment');
var getIP = require('ipware')().get_ip

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
        var ipInfo = getIP(req);

        var sendResponse = function(user) {
            User.publishCreate(user);
            var date = new Date();
            date.setMinutes(new Date().getMinutes() + 5);
            user.auctionExpiresOn = date.getTime() + '|' + new Date().getTime();
            req.session.user = user;
            return res.ok(user);
        }

        if (ipInfo.clientIpRoutable) {
            satelize.satelize({ ip: ipInfo.clientIp }, function(err, payload) {
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
                    if (err) {
                        return res.serverError(err);
                    } else {
                        sendResponse(user);
                    }
                });
            });
        } else {
            User.create(model).exec(function createCB(err, user) {
                if (err) {
                    return res.serverError(err);
                } else {
                    sendResponse(user);
                }
            });
        }
    },

    getUserBids: function(req, res) {
        Bid.find({
            user: req.session.user.id
        }).exec(function(err, bids) {
            if (err) {
                return res.serverError(err);
            } else {
                return res.ok(bids);
            }
        });
    },

    saveBid: function(req, res) {
        var user = req.session.user;

        var times = user.auctionExpiresOn.split('|');
        if (times.length == 2) {
            var eventTime = Number(times[0]);
            var currentTime = new Date().getTime();
            var timeDiff = moment(eventTime).toDate().getTime() - currentTime;
            if (timeDiff <= 0) {
                return res.serverError(new Error('Bidding closed !'));
            } else {

                var model = req.body;
                if (!model.user && req.session.user) {
                    model.user = req.session.user.id
                }
                Bid.find({
                    user: model.user
                }).exec(function(err, bids) {
                    if (err) {
                        return res.serverError(err);
                    } else {
                        if (bids.length < 5) {
                            Bid.create(model).exec(function createCB(err, bid) {
                                Bid.publishCreate(bid);
                                return res.ok(bid);
                            });
                        } else {
                            return res.serverError({
                                message: "Can't create more than 5 bids."
                            });
                        }
                    }
                });
            }
        }
    }
};
