//  loadScript("/Users/joeb/Workspaces/eth/storefront/js/shortcuts.js");

var balances = function() {
  console.log("eth.accounts[0]: " + web3.fromWei(eth.getBalance(eth.accounts[0])));
  console.log("eth.accounts[1]: " + web3.fromWei(eth.getBalance(eth.accounts[1])));
  console.log("eth.accounts[2]: " + web3.fromWei(eth.getBalance(eth.accounts[2])));
  console.log("eth.accounts[3]: " + web3.fromWei(eth.getBalance(eth.accounts[3])));
  console.log("eth.accounts[4]: " + web3.fromWei(eth.getBalance(eth.accounts[4])));
  console.log("eth.accounts[5]: " + web3.fromWei(eth.getBalance(eth.accounts[5])));
  console.log("eth.accounts[6]: " + web3.fromWei(eth.getBalance(eth.accounts[6])));

}

var unlock = function() {
  personal.unlockAccount(eth.accounts[0],"joe123",900000);
  personal.unlockAccount(eth.accounts[1],"joe123",900000);
  personal.unlockAccount(eth.accounts[2],"Liberty",900000);
  personal.unlockAccount(eth.accounts[3],"Progressive",900000)
  personal.unlockAccount(eth.accounts[4],"crash",900000);
  personal.unlockAccount(eth.accounts[5],"joe123",900000);
  personal.unlockAccount(eth.accounts[6],"joe123",900000);

}

function distributeEth(address){
  eth.sendTransaction({from:eth.coinbase, to:address, value:web3.toWei(100)})
}

function pingTransactions(){
  for (i = 0; i < 10; i++) {
    setTimeout(distributeEth(eth.accounts[1]), 30000) //30 seconds
    setTimeout(distributeEth(eth.accounts[2]), 30000)
  }
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
