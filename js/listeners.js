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
      console.log(" ")
      console.log("***************************************************************************************");
      console.log("Registered New Product for Vendor: " + result.args.vendorID);
      console.log("ID: " + result.args.productID);
      console.log("Price: "+ web3.fromWei(result.args.price)) + " ether";
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

///    event PaymentReceived(address from, uint amount);
///    event ContractSigned(address from);
///    event PaymentSent(address vendor, uint vendorAmount, address sf, uint sfamount);

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
      console.log(" ");
      console.log("***************************************************************");
      console.log("Payment Sent to Vendor: " + result.args.vendor + " amount: "+ web3.fromWei(result.args.vendorAmount) + " ether");
      console.log("Payment Sent to SF    : " + result.args.sf + " amount: "+ web3.fromWei(result.args.sfamount) + " ether");
      console.log("***************************************************************");
    }
    else {
      console.log("oops something went wrong...")
    }
});


var contractSigned = myvendor.ContractSigned();
contractSigned.watch(function(error, result){
    if (!error){
      console.log(" ");
      console.log("***************************************************************");
      console.log("Contract Signed: " + result.args.from +"!!");
      console.log("***************************************************************");
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
