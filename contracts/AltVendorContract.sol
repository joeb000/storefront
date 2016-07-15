contract AltVendorContract {

    event PaymentReceived(address from, uint amount);
    event PaymentRejected(address from, uint amount);
    event ContractSigned(address from);
    event PaymentSent(address vendor, uint vendorAmount, address sf, uint sfamount);
    event DefaultRenewalPosted(uint cycle, uint fee, string newIPFSHash);
    event NewRenewalPosted(uint cycle, uint fee, string newIPFSHash);
    event RenewalSigned(string ipfsHash);

    uint public cycle;
    uint public fee;
    uint public vendorPayoutPercentage;
    uint public cycleEndDate;
    string public termsIPFSHash;
    bool public isSigned;
    address public vendorKey;
    address public adminKey;

    RenewProposal public prop;

    struct RenewProposal{
        bool isValid;
        uint newCycle;
        uint newFee;
        uint newPayout;
        string newIPFSHash;
        uint dateEffective;
    }

    function AltVendorContract(uint _cycle, uint _fee, uint _vendorPayout, string _ipfsHash, address _vendorKey){
        cycle = _cycle;
        fee = _fee;
        vendorPayoutPercentage = _vendorPayout;
        termsIPFSHash = _ipfsHash;
        vendorKey = _vendorKey;
        adminKey = msg.sender;
    }

    function (){
        checkExpired();
        if (isSigned){
            PaymentReceived(msg.sender,msg.value);
            triggerPayOut(msg.value);
        }
        else {
            PaymentRejected(msg.sender,msg.value);
            //throw;
            // instead of throw; to return money to sender, let the vendor contract hold the money until terms are signed
        }
    }

    modifier onlyVendor() {
        if (msg.sender==vendorKey)
        _
    }
    modifier onlyAdmin() {
        if (msg.sender==adminKey)
        _
    }

    function vendorSign() onlyVendor() {
        if (msg.value >= fee){
            isSigned = true;
            cycleEndDate = block.timestamp + cycle;
            ContractSigned(msg.sender);
        }
    }

    function vendorSignRenewal() onlyVendor() {
        if (msg.value >= prop.newFee && prop.isValid){
            isSigned = true;
            vendorPayoutPercentage = prop.newPayout;
            fee=prop.newFee;
            cycle=prop.newCycle;
            termsIPFSHash = prop.newIPFSHash;
            cycleEndDate += cycle;
            prop.isValid = false;
            RenewalSigned(termsIPFSHash);
        }
    }

    function checkExpired() {
        if (block.timestamp > cycleEndDate){
            isSigned = false;
        }
    }

    function createDefaultProposal() onlyAdmin() {
        prop.isValid = true;
        prop.newCycle = cycle;
        prop.newFee = fee;
        prop.newPayout = vendorPayoutPercentage;
        prop.newIPFSHash = termsIPFSHash;
        prop.dateEffective = cycleEndDate;
        DefaultRenewalPosted(prop.newCycle, prop.newFee, prop.newIPFSHash);
    }

    function createCustomProposal(uint _newCycle, uint _newFee, uint _newPayout, string _newIPFSHash, uint _customDateEffective) onlyAdmin() {
        prop.isValid = true;
        prop.newCycle = _newCycle;
        prop.newFee = _newFee;
        prop.newPayout = _newPayout;
        prop.newIPFSHash = _newIPFSHash;
        prop.dateEffective = _customDateEffective;
        NewRenewalPosted(prop.newCycle, prop.newFee, prop.newIPFSHash);
    }

    function triggerPayOut(uint _total) private returns (bool){
        uint vendorAmount = _total*vendorPayoutPercentage/100;
        vendorKey.send(vendorAmount);
        adminKey.send(_total-vendorAmount);
        PaymentSent(vendorKey, vendorAmount, adminKey, _total-vendorAmount);
        return true;
    }

    function endContract() {
        //TODO
        //terms for end of contract to execute
    }

}
