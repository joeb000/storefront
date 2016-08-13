/**
Template Controllers

@module Templates
*/

/**
The vendor contract template.

@class [template] components_vendorContract
@constructor
*/

// Construct Multiply Contract Object and contract instance
var contractInstance;
var contractAddr;
var aFee;
var latestTime;
var theContractEndDate;

var vendorcontractContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"vendorPayoutPercentage","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"cycleEndDate","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"cycle","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"checkSigned","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"vendorKey","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"signContract","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"sfDelegateKey","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"termsIPFSHash","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"isSigned","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_cycle","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_vendorPayout","type":"uint256"},{"name":"_ipfsHash","type":"string"},{"name":"_vendorKey","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"}],"name":"ContractSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"vendor","type":"address"},{"indexed":false,"name":"vendorAmount","type":"uint256"},{"indexed":false,"name":"sf","type":"address"},{"indexed":false,"name":"sfamount","type":"uint256"}],"name":"PaymentSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"signed","type":"bool"}],"name":"Expired","type":"event"}]);



function getIsValid(abool){
  if (abool)
  return "valid";
  else {
    return "not valid";
  }
};

function secondsToMinutes(sec){
  return sec/60;
}

function addToSignedTable(signer, datestamp) {
    var table = document.getElementById("signedTable");

    var row = table.insertRow(table.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = signer;
    cell2.innerHTML = Helpers.formatTime(datestamp,"YYYY-MM-DD hh:mm");
}
function addToPaymentTable(productID, machineID, paymentAmount, datestamp) {
    var table = document.getElementById("paymentTable");

    var row = table.insertRow(table.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = productID;
    cell2.innerHTML = machineID;
    cell3.innerHTML = web3.fromWei(paymentAmount);
    cell4.innerHTML = Helpers.formatTime(datestamp,"YYYY-MM-DD hh:mm");;
}

function runContractListeners(myvendor) {
  var paymentReceived = myvendor.PaymentReceived();
  paymentReceived.watch(function(error, result){
      if (!error){
        console.log(" ");
        console.log("***************************************************************");
        console.log("Payment Received from: " + result.args.from + " amount: "+ web3.fromWei(result.args.amount) + " ether");
        console.log("***************************************************************");
      }
      else {
        console.log("oops something went wrong...")
      }
  });

  var paymentRejected = myvendor.PaymentRejected();
  paymentRejected.watch(function(error, result){
      if (!error){
        console.log(" ");
        console.log("***************************************************************");
        console.log("!!!   Payment Rejected from: " + result.args.from + " amount: "+ web3.fromWei(result.args.amount) + " ether");
        console.log("***************************************************************");
      }
      else {
        console.log("oops something went wrong...")
      }
  });

  var paymentSent = myvendor.PaymentSent();
  paymentSent.watch(function(error, result){
      if (!error){
        addToPaymentTable(1,"0xf7caaeb6aa9a57774d41c765631c84c28bdummy",result.args.vendorAmount, web3.eth.getBlock(result.blockNumber).timestamp);
        console.log(" ");
        console.log("***************************************************************");
        console.log("Payment Sent to Vendor: " + result.args.vendor + " amount: "+ web3.fromWei(result.args.vendorAmount) + " ether");
        console.log("Payment Sent to SF    : " + result.args.sf + " amount: "+ web3.fromWei(result.args.sfamount) + " ether");
        console.log("***************************************************************");
      }
      else {
        console.log("oops something went w rong...")
      }
  });


  var contractSigned = myvendor.ContractSigned();
  contractSigned.watch(function(error, result){
      if (!error){
        console.log(" ");
        console.log("***************************************************************");
        console.log("Contract Signed: " + result.args.from +"!!");
        console.log("***************************************************************" + result);
        addToSignedTable(result.args.from, web3.eth.getBlock(result.blockNumber).timestamp);
      }
      else {
        console.log("oops something went wrong...")
      }
  });


  var expiredEvent = myvendor.Expired();
  expiredEvent.watch(function(error, result){
      if (!error){
        console.log(" ");
        console.log("***************************************************************");
        console.log("Contract Signed: " + result.args.signed +"!!");
        console.log("***************************************************************");
      }
      else {
        console.log("oops something went wrong...")
      }
  });

}


// When the template is rendered
Template['components_vendorContract'].onRendered(function(){
    TemplateVar.set('state', {isNotAddressed: true});
});

Template['components_vendorContract'].helpers({

	/**
	Get multiply contract source code.

	@method (source)
	*/

	'source': function(){
		return source;
	},
});

Template['components_vendorContract'].events({

	/**
	On "Create New Contract" click

	@event (click .btn-default)
	*/

  "click [data-action='findContract']": function(event, template){
        TemplateVar.set('state', {contractExists: true});

        contractAddr = template.find("#vendorContractAddress").value;
        console.log("Found contract at: " + contractAddr);

        contractInstance = vendorcontractContract.at(contractAddr);

        // call MultiplyContract method `multiply` which should multiply the `value` by 7

        contractInstance.cycleEndDate.call(function(err, result){
          theContractEndDate=result;
            latestTime = web3.eth.getBlock('latest').timestamp;
            if (result > latestTime){
              aCycleEndDate=Helpers.formatTime(result,"YYYY-MM-DD hh:mm:ss");
            } else {
              aCycleEndDate="N/A";
            }
            TemplateVar.set(template, 'aCycleEndDate', aCycleEndDate);
            console.log("CYCLE END DATE" + aCycleEndDate);

            if(err)
              console.log("Error when calling for fee");
        });

		    contractInstance.fee.call(function(err, result){
            aFee=web3.fromWei(result);
            TemplateVar.set(template, 'aFee', aFee);

            if(err)
              console.log("Error when calling for fee");
        });

        contractInstance.cycle.call(function(err, result){
            aCycleNum=result.toNumber(10);
            aCycle=secondsToMinutes(aCycleNum)+" minutes";
            TemplateVar.set(template, 'aCycle', aCycle);

            if(err)
              console.log("Error when calling for fee");
        });

        contractInstance.vendorKey.call(function(err, result){
            aReceiver=result;
            TemplateVar.set(template, 'aReceiver', aReceiver);

            if(err)
              console.log("Error when calling for fee");
        });

        contractInstance.termsIPFSHash.call(function(err, result){
          ipfshash=result;
            TemplateVar.set(template, 'aIPFSHash', ipfshash);

            if(err)
              console.log("Error when calling for fee");
        });
        contractInstance.vendorPayoutPercentage.call(function(err, result){
          aPercent=result.toNumber(10);
          TemplateVar.set(template, 'aPercent', aPercent);

          if(err)
            console.log("Error when calling for fee");
        });

        contractInstance.isSigned.call(function(err, result){
          if (theContractEndDate > latestTime){
            isValid=getIsValid(result);
          } else {
            isValid="Not valid";
          }
          TemplateVar.set(template, 'aContractState', isValid);

          if(err)
            console.log("Error when calling for fee");
        });

        runContractListeners(contractInstance);

        TemplateVar.set(template, 'contractAddr', contractAddr);

        console.log("Found contract at: " + contractAddr);
  },



  "click [data-action='signContract']": function(event, template){
        TemplateVar.set('state', {contractExists: true});

        console.log("Found contract at: " + contractAddr);

        contractInstance = vendorcontractContract.at(contractAddr);

        contractInstance.signContract.sendTransaction({from:web3.eth.accounts[2],value:web3.toWei(aFee),gas:4000000},function(err, result){
            if(err)
              console.log("Error when calling for fee");
        });
  },

  "click [data-action='refreshStatus']": function(event, template){

        contractInstance = vendorcontractContract.at(contractAddr);
        contractInstance.cycleEndDate.call(function(err, result){
          theContractEndDate=result;
            latestTime = web3.eth.getBlock('latest').timestamp;
            if (result > latestTime){
              aCycleEndDate=Helpers.formatTime(result,"YYYY-MM-DD hh:mm:ss");
            } else {
              aCycleEndDate="N/A";
            }
            document.getElementById('conEnd').innerHTML = aCycleEndDate;
            console.log("CYCLE END DATE" + aCycleEndDate);

            if(err)
              console.log("Error when calling for fee");
        });

        contractInstance.isSigned.call(function(err, result){
          if (theContractEndDate > latestTime){
            isValid=getIsValid(result);
          } else {
            isValid="Not valid";
          }
          document.getElementById('conState').innerHTML = isValid;

          if(err)
            console.log("Error when calling for fee");
        });

  },


  "click [data-action='addRow']": function(event, template){

        console.log("FBolob: " + web3.eth.accounts[2]);
        myFunction();

  },

});
