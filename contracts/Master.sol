import "machine.sol";

contract Master {
    event MachinePayed(address machineID, uint amount);
    event ContractCreated(address newMachineID);
    event PaymentRouted(address routedAddress, uint amount);
    event NewProductAdded(address vendorID,uint productID, uint price);
    event AddedProductToMachine(address newMachineID, uint productID, uint productPrice);
    event PriceUpdated(uint _productID, uint _newPrice);

    address public admin;
    uint ownerCounter=0;
    mapping (address=>bool) isMachine;
    mapping (uint=>Product) productList;

    struct Product{
        address vendor;
        uint price;
        uint stockedCount;
        address[] machinesStockedIn;
    }

    modifier onlyAdmin() {
        if (msg.sender==admin)
        _
    }

    modifier onlyMachines(){
        if (isMachine[msg.sender])
        _
    }

    function Master(){
        admin=msg.sender;
    }

    function deposit(uint _productID) onlyMachines() {
        MachinePayed(msg.sender, msg.value);
        routPayment(msg.sender, _productID, msg.value);
    }



    function routPayment(address _from, uint _productID, uint _value) {
      if (productList[_productID].vendor.call.value(_value).gas(50000)())
        PaymentRouted(productList[_productID].vendor,_value);
    }

    /**
    * Admin functions below
    */
    function createNewMachineContract() onlyAdmin() returns (address) {
        //creates new contract for a new machine
        address newMachineAddress = new machine();
        isMachine[newMachineAddress]=true;
        ContractCreated(newMachineAddress);
        return newMachineAddress;
    }

    function addNewProduct(uint _price, address _vendor) onlyAdmin() returns (uint) {
        ownerCounter++;
        productList[ownerCounter].vendor=_vendor;
        productList[ownerCounter].price=_price;
        NewProductAdded(_vendor,ownerCounter,_price);
        return ownerCounter;
    }

    function addProductToMachine(address _machineID, uint _productID) onlyAdmin() {
        uint productPrice = productList[_productID].price;
        productList[_productID].machinesStockedIn.push(_machineID);
        machine(_machineID).listNewProduct(_productID,productPrice);
        AddedProductToMachine(_machineID, _productID, productPrice);
    }

    function updateProductPrice(uint _productID, uint _newPrice) onlyAdmin() {
        productList[_productID].price=_newPrice;
        if (updateMachine(_productID,_newPrice)){
            PriceUpdated(_productID,_newPrice);
        }
    }

    function updateMachine(uint _productID, uint _newPrice) private returns (bool) {
        for(uint8 y = 0; y < productList[_productID].machinesStockedIn.length; y++){
            address add = productList[_productID].machinesStockedIn[y];
            machine(add).listNewProduct(_productID,_newPrice);
        }
        return true;
    }
}
