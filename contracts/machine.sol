import "Master.sol";
contract machine {

    address master;
    mapping (uint=>uint) public productPrices;

    function machine(){
        master=msg.sender;
    }

    //assume they are buying product ID 1
    function () {
        if (msg.value<productPrices[1])
        throw;
        //only send the product price worth to the master
        Master(master).deposit.value(productPrices[1])(1);
        uint remaining = msg.value - productPrices[1];

        msg.sender.send(remaining);
    }

    function payForProduct(uint _productID) returns (bool) {
        if (msg.value<productPrices[_productID])
        throw;
        //only send the product price worth to the master
        Master(master).deposit.value(productPrices[_productID])(_productID);
        uint remaining = msg.value - productPrices[_productID];

        msg.sender.send(remaining);

        return true;
    }

    function listNewProduct(uint _productID, uint _price){
        productPrices[_productID]=_price;
    }
}
