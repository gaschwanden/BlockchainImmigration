pragma solidity ^0.4.21;

import "./Owned.sol";

contract Application is Owned {
    address[] public linked_artifacts;
    bool public is_approved;
    address public visa_details;
    address applicant;

    // constructors
    function Application(address _visa, address[] _artifacts) public {
        owner = msg.sender;
        visa_details = _visa;
        linked_artifacts = _artifacts;
        applicant = msg.sender;
    }

    function addArtifact(address _artifact) public onlyByOwner {
        linked_artifacts.push(_artifact) - 1;
    }

    function getArtifacts() public view returns (address[]) {
        return linked_artifacts;
    }

    function decision(bool _decision) public {
        is_approved = _decision;
    }

    function withdraw() public onlyByOwner {
        selfdestruct(owner);
    }
}

