pragma solidity ^0.4.21;

import "./Owned.sol";

contract Artifact is Owned {
    bytes32 public name;
    bytes32 location;
    bool public is_valid;
    address public verifier;
    bytes32 public artifact_type;
    //modifier
    modifier onlyByVerifier() {
        if (verifier != msg.sender) revert();
        _;
    }

    // constructors
    function Artifact(bytes32 pName, bytes32 pLocation, address pVerifier, bytes32 pType) public {
        owner = tx.origin;
        name = pName;
        location = pLocation;
        verifier = pVerifier;
        artifact_type = pType;
    }

    function depositVerifierFee(uint _fee) public payable {
        require(_fee == msg.value);
    }

    function setValid(bool _flag) public payable {
        is_valid = _flag;
        msg.sender.transfer(tx.gasprice * gasleft());
        owner.transfer(address(this).balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getUrl() public view onlyByOwner onlyByVerifier returns (bytes32) {
        return location;
    }
}

