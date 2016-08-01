/**
 * AdminController
 *
 * @description :: Server-side logic for managing Tigers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index : function(req, res) {
		var error = req.flash('error');
    	return res.view({
    		error : error
    	});
  	}
};

