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
    if (msg.sender != owner) revert();
    _;
  }
  modifier artifactsVerified {
    for (uint i = 0; i < artifacts.length; i++) {
      if (artifacts[i].verified() == false) revert();
      _;
    }
  }

  // constructors
  function Application() public {
    owner = msg.sender;
  }

  function transferOwnership(address _newOwner) public onlyByOwner {
    owner = _newOwner;
  }

  function setVisa(Visa _visa) public onlyByOwner {
    visa = _visa;
  }

  function setArtifacts(Artifact[] _artifacts) public onlyByOwner {
    artifacts = _artifacts;
  }

  function getAllArtifacts() public onlyByOwner constant returns (Artifact[]) {
    return artifacts;
  }

  function isApproved() public onlyByOwner constant returns (bool) {
    return approved;
  }

  function isArtifactsVerified(bool _approved) public onlyByOwner artifactsVerified {
    approved = _approved;
  }

}
