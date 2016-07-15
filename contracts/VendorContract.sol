contract VendorContract {

    event PaymentReceived(address from, uint amount);
    event PaymentRejected(address from, uint amount);
    event ContractSigned(address from);
    event PaymentSent(address vendor, uint vendorAmount, address sf, uint sfamount);
    event Expired(bool signed);

    uint public cycle;
    uint public fee;
    uint public vendorPayoutPercentage;
    
    uint public cycleEndDate;

    string public termsIPFSHash;
    bool public isSigned;
    mapping (address=>bool[2]) signers;

    address public vendorKey;
    address public sfDelegateKey;

    modifier ifSigned(){
        if (isSigned)
        _
    }

    modifier onlySigners(){
        if (signers[msg.sender][0])
        _
    }

    function (){
        checkCycleExprired();
        if (isSigned){
            PaymentReceived(msg.sender,msg.value);
            triggerPayOut(msg.value);
        }
        else {
            PaymentRejected(msg.sender,msg.value);
        }
    }

    function VendorContract(uint _cycle, uint _fee, uint _vendorPayout, string _ipfsHash, address _vendorKey){
        cycle = _cycle;
        fee = _fee;
        vendorPayoutPercentage = _vendorPayout;
        termsIPFSHash = _ipfsHash;
        vendorKey = _vendorKey;
        sfDelegateKey = msg.sender;
        signers[vendorKey][0] = true;
        signers[sfDelegateKey][0] = true;
    }


    function signContract() onlySigners() {
        signers[msg.sender][1]=true;
        checkSigned();
        ContractSigned(msg.sender);
    }

    function checkSigned() {
        if (signers[vendorKey][1] && signers[sfDelegateKey][1]){
            isSigned = true;
            cycleEndDate = block.timestamp + cycle;
        }
    }

    function triggerPayOut(uint _total) private ifSigned() returns (bool){
        uint vendorAmount = _total*vendorPayoutPercentage/100;
        vendorKey.send(vendorAmount);
        sfDelegateKey.send(_total-vendorAmount);
        PaymentSent(vendorKey, vendorAmount, sfDelegateKey, _total-vendorAmount);
        return true;
    }

    function checkCycleExprired() private {
        if (cycleEndDate < now){
            isSigned=false;
            signers[vendorKey][1]=false;
            signers[sfDelegateKey][1]=false;
            Expired(isSigned);
        }
    }
}
