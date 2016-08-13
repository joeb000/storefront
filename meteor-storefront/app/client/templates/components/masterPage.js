/**
Template Controllers

@module Templates
*/

/**
The vendor contract template.

@class [template] components_masterPage
@constructor
*/

// Construct Multiply Contract Object and contract instance
var contractInstance;
var admin = "0x12218fcf1ff0349c979cceffb2f29567e9d916f6";
var mastercontractContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_productID","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"routPayment","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"createNewMachineContract","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_productID","type":"uint256"},{"name":"_newPrice","type":"uint256"}],"name":"updateProductPrice","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_productID","type":"uint256"}],"name":"deposit","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_machineID","type":"address"},{"name":"_productID","type":"uint256"}],"name":"addProductToMachine","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"},{"name":"_vendor","type":"address"}],"name":"addNewProduct","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"machineID","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"MachinePayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newMachineID","type":"address"}],"name":"ContractCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"routedAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentRouted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"vendorID","type":"address"},{"indexed":false,"name":"productID","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name":"NewProductAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newMachineID","type":"address"},{"indexed":false,"name":"productID","type":"uint256"},{"indexed":false,"name":"productPrice","type":"uint256"}],"name":"AddedProductToMachine","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_productID","type":"uint256"},{"indexed":false,"name":"_newPrice","type":"uint256"}],"name":"PriceUpdated","type":"event"}]);
var aMachineNickname;
var aProductName;


function secondsToMinutes(sec){
  return sec/60;
}

function addToMachineTable(nickname, aMachineID) {
    var table = document.getElementById("machineTable");

    var row = table.insertRow(table.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = aMachineID;
    cell2.innerHTML = nickname;
}


function addToProductTable(aProductName, aProductID, aProductPrice, aVendorID) {
    var table = document.getElementById("productTable");

    var row = table.insertRow(table.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = aProductName;
    cell2.innerHTML = aProductID;
    cell3.innerHTML = aProductPrice;
    cell4.innerHTML = aVendorID;
}

function runContractListeners(mymaster) {

  var myevent = mymaster.MachinePayed();
  myevent.watch(function(error, result){
      if (!error){
        console.log(" ")
        console.log("***************************************************************************************");
        console.log("machineID:" + result.args.machineID + " recieved payment. amount:" + web3.fromWei(result.args.amount));
        console.log("***************************************************************************************");
      }
      else {
        console.log("oops something went wrong...")
      }
  });


  var myevent2 = mymaster.ContractCreated();
  myevent2.watch(function(error, result){
      if (!error){
        addToMachineTable(aMachineNickname, result.args.newMachineID);
        console.log(" ")
        console.log("***************************************************************************************");
        console.log("New Machine Contract created at:" + result.args.newMachineID);
        console.log("***************************************************************************************");
      }
      else {
        console.log("oops something went wrong...")
      }
  });

  var routedEvent = mymaster.PaymentRouted();
  routedEvent.watch(function(error, result){
      if (!error){
        console.log(" ")
        console.log("***************************************************************************************");
        console.log("Payment of " + web3.fromWei(result.args.amount) + " ether routed to:" + result.args.routedAddress);
        console.log("***************************************************************************************");
      }
      else {
        console.log("oops something went wrong...")
      }
  });

  var newProductEvent = mymaster.NewProductAdded();
  newProductEvent.watch(function(error, result){
      if (!error){
        addToProductTable(aProductName, result.args.productID, web3.fromWei(result.args.price), result.args.vendorID)
        console.log(" ")
        console.log("***************************************************************************************");
        console.log("Registered New Product for Vendor: " + result.args.vendorID);
        console.log("ID: " + result.args.productID);
        console.log("Price: "+ web3.fromWei(result.args.price) + " ether");
        console.log("***************************************************************************************");

      }
      else {
        console.log("oops something went wrong...")
      }
  });

  var addProductToMachineEvent = mymaster.AddedProductToMachine();
  addProductToMachineEvent.watch(function(error, result){
      if (!error){


        console.log(" ")
        console.log("***************************************************************************************");
        console.log("Registered Product in New Machine: " + result.args.newMachineID);
        console.log("Product ID: " + result.args.productID);
        console.log("Price: "+ web3.fromWei(result.args.productPrice)) + " ether";
        console.log("***************************************************************************************");

      }
      else {
        console.log("oops something went wrong...")
      }
  });

  var priceUpdateEvent = mymaster.PriceUpdated();
  priceUpdateEvent.watch(function(error, result){
      if (!error){
        console.log(" ")
        console.log("***************************************************************************************");
        console.log("Product Updated...ID: " + result.args._productID);
        console.log("New Price: "+ web3.fromWei(result.args._newPrice)) + " ether";
        console.log("***************************************************************************************");

      }
      else {
        console.log("oops something went wrong...")
      }
  });


}


// When the template is rendered
Template['components_masterPage'].onRendered(function(){
    TemplateVar.set('state', {isNotAddressed: true});
});

Template['components_masterPage'].helpers({

	/**
	Get multiply contract source code.

	@method (source)
	*/

	'source': function(){
		return source;
	},
});

Template['components_masterPage'].events({

	/**
	On "Create New Contract" click

	@event (click .btn-default)
	*/

  "click [data-action='findContract']": function(event, template){
        TemplateVar.set('state', {contractExists: true});

        contractAddr = template.find("#masterContractAddress").value;
        console.log("Found contract at: " + contractAddr);
        document.getElementById("controlPanelH1").innerHTML="Master Contract - Control Panel: " + contractAddr;

        contractInstance = mastercontractContract.at(contractAddr);

        // call MultiplyContract method `multiply` which should multiply the `value` by 7


        runContractListeners(contractInstance);

        TemplateVar.set(template, 'contractAddr', contractAddr);

        console.log("Found contract at: " + contractAddr);
  },



  "click [data-action='createMachine']": function(event, template){
    aMachineNickname = template.find("#machineNickname").value;
    contractInstance.createNewMachineContract({from:admin,gas:4000000},function(err, result){
      console.log("Result is: "+result)
        if(err)
          console.log("Error when calling for fee"+ err);
    });
  },

  "click [data-action='addProduct']": function(event, template){
    aPrice = template.find("#addProductPrice").value;
    aVendorID = template.find("#addVendorID").value;
    aProductName = template.find("#addProductName").value;


    contractInstance.addNewProduct(web3.toWei(aPrice),aVendorID,{from:admin,gas:4000000},function(err, result){
      console.log("Result is: "+result)
        if(err)
          console.log("Error when calling for fee"+ err);
    });

  },

  "click [data-action='stockMachine']": function(event, template){
    machineToStock = template.find("#stockMachineID").value;
    productIDToStock = template.find("#stockProductID").value;

    contractInstance.addProductToMachine(machineToStock,productIDToStock,{from:admin,gas:4000000},function(err, result){
      console.log("Result is: "+result)
        if(err)
          console.log("Error when calling for fee"+ err);
    });
  },

  "click [data-action='updateProduct']": function(event, template){

  },



  "click [data-action='createVendorContract']": function(event, template){
    var _cycle =  template.find("#vendorCycle").value*60*60*24;
    var _fee = web3.toWei(template.find("#vendorFee").value);
    var _vendorPayout = template.find("#vendorPercent").value;
    var _ipfsHash = template.find("#vendorIPFSHash").value;
    var _vendorKey = template.find("#vendorAddress").value;
    var vendorcontractContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"vendorPayoutPercentage","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"cycleEndDate","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"cycle","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"checkSigned","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"vendorKey","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"signContract","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"sfDelegateKey","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"termsIPFSHash","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"isSigned","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_cycle","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_vendorPayout","type":"uint256"},{"name":"_ipfsHash","type":"string"},{"name":"_vendorKey","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"}],"name":"ContractSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"vendor","type":"address"},{"indexed":false,"name":"vendorAmount","type":"uint256"},{"indexed":false,"name":"sf","type":"address"},{"indexed":false,"name":"sfamount","type":"uint256"}],"name":"PaymentSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"signed","type":"bool"}],"name":"Expired","type":"event"}]);
    var vendorcontract = vendorcontractContract.new(
       _cycle,
       _fee,
       _vendorPayout,
       _ipfsHash,
       _vendorKey,
       {
         from: web3.eth.accounts[0],
         data: '6060604052604051610c1c380380610c1c833981016040528080519060200190919080519060200190919080519060200190919080518201919060200180519060200190919050505b8460006000508190555083600160005081905550826002600050819055508160046000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100b557805160ff19168380011785556100e6565b828001600101855582156100e6579182015b828111156100e55782518260005055916020019190600101906100c7565b5b50905061011191906100f3565b8082111561010d57600081815060009055506001016100f3565b5090565b505080600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555033600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550600160066000506000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060006002811015610002579090602091828204019190065b6101000a81548160ff02191690830217905550600160066000506000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060006002811015610002579090602091828204019190065b6101000a81548160ff021916908302179055505b50505050506109a3806102796000396000f3606060405236156100a0576000357c0100000000000000000000000000000000000000000000000000000000900480634678f211146101805780635ff69b8e146101a35780636190c9d5146101c6578063815c47ee146101e9578063addb4766146101f8578063b8b4f1a014610231578063c9efff3214610240578063ddca3f4314610279578063e4b054e71461029c578063e66a6b2214610317576100a0565b61017e5b6100ac61033c565b600560009054906101000a900460ff1615610125577f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be7703334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a161011f346104aa565b5061017b565b7fd3ab9a53b92fb09aadc77e483a7163e7c344a12261e0afc379b19d1ec43faeaf3334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b565b005b61018d600480505061064d565b6040518082815260200191505060405180910390f35b6101b06004805050610656565b6040518082815260200191505060405180910390f35b6101d3600480505061065f565b6040518082815260200191505060405180910390f35b6101f66004805050610668565b005b610205600480505061078d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61023e60048050506107b3565b005b61024d60048050506108c0565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61028660048050506108e6565b6040518082815260200191505060405180910390f35b6102a960048050506108ef565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103095780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103246004805050610990565b60405180821515815260200191505060405180910390f35b4260036000505410156104a7576000600560006101000a81548160ff02191690830217905550600060066000506000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060016002811015610002579090602091828204019190065b6101000a81548160ff02191690830217905550600060066000506000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060016002811015610002579090602091828204019190065b6101000a81548160ff021916908302179055507f2f87792d99eca4a229d181d3377d608caa72bae03c97695d06b700e1c4d908ce600560009054906101000a900460ff1660405180821515815260200191505060405180910390a15b5b565b60006000600560009054906101000a900460ff16156106465760646002600050548402049050600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f1935050505050600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000828503604051809050600060405180830381858888f19350505050507faf948d02337eee07853d29cac97675524422a3b0d20173a889afe277d56d7046600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16848703604051808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390a160019150610647565b5b50919050565b60026000505481565b60036000505481565b60006000505481565b60066000506000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060016002811015610002579090602091828204019190065b9054906101000a900460ff16801561075a575060066000506000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060016002811015610002579090602091828204019190065b9054906101000a900460ff165b1561078a576001600560006101000a81548160ff0219169083021790555060006000505442016003600050819055505b5b565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600660005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060006002811015610002579090602091828204019190065b9054906101000a900460ff16156108bd576001600660005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060016002811015610002579090602091828204019190065b6101000a81548160ff0219169083021790555061086f610668565b7f87749e5a8d50e7a3313d5056b9cc2bd91d8d91b4985106ee8ce6b865e2edfd0833604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b5b565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016000505481565b60046000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109885780601f1061095d57610100808354040283529160200191610988565b820191906000526020600020905b81548152906001019060200180831161096b57829003601f168201915b505050505081565b600560009054906101000a900460ff168156',
         gas: 4700000
       }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          document.getElementById("newVendorLabel").innerHTML="Vendor Contract Created at: " + contract.address;

             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
     })


  },

});
