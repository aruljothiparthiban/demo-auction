/**
 * Bid.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
    	bidAmount:{
    		type:'string',
    		required:true
    	},

        //Add a reference to User
        user:{
            model:'user'
        }
    }
};
