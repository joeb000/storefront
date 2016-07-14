contract VendorContract {

    event PaymentReceived(address from, uint amount);
    event PaymentRejected(address from, uint amount);
    event ContractSigned(address from);
    event PaymentSent(address vendor, uint vendorAmount, address sf, uint sfamount);


    uint public cycle = 2 days;
    uint public fee = 1 ether;
    uint public vendorPayoutPercentage = 90;

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
        if (isSigned){
            PaymentReceived(msg.sender,msg.value);
            triggerPayOut(msg.value);
        }
        else {
            PaymentRejected(msg.sender,msg.value);
            throw;
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
        }
    }

    function triggerPayOut(uint _total) ifSigned() returns (bool){
        uint vendorAmount = _total*vendorPayoutPercentage/100;
        vendorKey.send(vendorAmount);
        sfDelegateKey.send(_total-vendorAmount);
        PaymentSent(vendorKey, vendorAmount, sfDelegateKey, _total-vendorAmount);
        return true;
    }

    function markSigned(){
        isSigned=true;
    }


}
