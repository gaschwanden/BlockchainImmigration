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
        owner = msg.sender;
        name = pName;
        location = pLocation;
        verifier = pVerifier;
        artifact_type = pType;
    }

    function setValid(bool _flag) public {
        is_valid = _flag;
    }

    function getUrl() public view onlyByOwner onlyByVerifier returns (bytes32) {
        return location;
    }
}

