/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
    	name:{
    		type:'string',
    		required:true
    	},
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        companyName: {
            type: 'string',
            required: true
        },
        phoneNumber:{
        	type:'string',
        	required:true
        },
        country:{
        	type :'string',
        	required:true
        },
        continent:{
        	type:'string'
        },
        ip:{
        	type:'string'
        },

        // Add a reference to bids
        bids:{
        	collection:'bid',
        	via:'user'
        }
    }
};
