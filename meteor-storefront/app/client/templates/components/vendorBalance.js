/**
Template Controllers

@module Templates
*/

/**
The balance template

@class [template] components_vendbalance
@constructor
*/

// when the template is rendered
Template['components_vendbalance'].onRendered(function() {
    // get coinbase address
    var coinbase = "0xf7caaeb6aa9a57774d41c765631c84c28b7aa588";

    // balance update interval
    this.updateBalance = Meteor.setInterval(function() {
        // get the coinbase address balance
        web3.eth.getBalance(coinbase, function(err, result){

            // set global temp session balance with result
            Session.set("balance", String(result));
        });
    }, 4 * 1000);
});

// when the template is destroyed
Template['components_vendbalance'].onDestroyed(function() {
    // clear the balance update interval
    Meteor.clearInterval(this.updateBalance);
});

Template['components_vendbalance'].helpers({
    /**
    Get The Original Balance

    @method (watchBalance)
    */

    'watchBalance': function(){
		return web3.fromWei(Session.get('balance'), LocalStore.get('etherUnit')).toString(10);
    },
});
