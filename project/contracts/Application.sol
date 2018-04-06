pragma solidity ^0.4.19;

import "./Artifact.sol";
import "./Visa.sol";

contract Application {
    address public owner;
    Artifact[] artifacts;
    bool isApproved;
    Visa visa;

    // modifiers
    modifier onlyByOwner {
        if (msg.sender != owner) throw;
        _;
    }
    modifier artifactsVerified {
        for (uint i = 0; i < artifacts.length; i++) {
            if (!artifacts[i].isVerified) throw;
            _;
        }
    }

    // constructors
    function Application(Artifact[] _artifacts) public {
        owner = msg.sender;
        artifacts = _artifacts;
    }

    function getAllArtifacts() public constant returns (Artifact[]) {
        return artifacts;
    }

    function isApproved() public constant returns (bool) {
        return isApproved;
    }

    function artifactsVerified(bool _isApproved) public onlyByOwner artifactsVerified {
        isApproved = _isApproved;
    }

}
