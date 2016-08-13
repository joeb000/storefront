/**
Template Controllers

@module Templates
*/

/**
The accounts template

@class [template] components_accounts
@constructor
*/

// when the template is rendered
Template["components_vendorAcc"].onRendered(function(){
});

// template events
Template['components_vendorAcc'].events({
});

// template handlebar helper methods
Template['components_vendorAcc'].helpers({
	/**
    Convert Wei to Ether Values

    @method (fromWei)
    */

	'fromWei': function(weiValue, type){
		return web3.fromWei(weiValue, type).toString(10);
	},


	/**
    Get Eth Accounts

    @method (accounts)
    */

	'accounts': function(){
		return EthAccounts.find({});
	},
});
