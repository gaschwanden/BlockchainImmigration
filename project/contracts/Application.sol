pragma solidity ^0.4.19;

import "./Artifact.sol";
import "./Visa.sol";

contract Application {
    address public owner;
    Artifact[] artifacts;
  bool approved;
    Visa visa;

    // modifiers
    modifier onlyByOwner {
        if (msg.sender != owner) throw;
        _;
    }
    modifier artifactsVerified {
        for (uint i = 0; i < artifacts.length; i++) {
          if (artifacts[i].verified() == false) throw;
            _;
        }
    }

    // constructors
  function Application() public {
        owner = msg.sender;
  }

  function setVisa(Visa _visa) {
    visa = _visa;
  }

  function setArtifacts(Artifact[] _artifacts) public {
    artifacts = _artifacts;
    }

    function getAllArtifacts() public constant returns (Artifact[]) {
        return artifacts;
    }

    function isApproved() public constant returns (bool) {
      return approved;
    }

  function isArtifactsVerified(bool _approved) public onlyByOwner artifactsVerified {
    approved = _approved;
    }

}
