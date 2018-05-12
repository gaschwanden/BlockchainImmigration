pragma solidity ^0.4.21;

import "./Owned.sol";

contract Application is Owned {
  address[] public linked_artifacts;
  bool public is_approved;
  address public visa_details;
  uint artifact_count;

  // constructors
  function Application() public {
    owner = msg.sender;
  }

  function setVisa(address _visa) public onlyByOwner {
    visa_details = _visa;
  }

  function addArtifact(address _artifact) public onlyByOwner {
    artifact_count++;
    linked_artifacts.push(_artifact) - 1;
  }

  function decision(bool _decision) public onlyByOwner {
    is_approved = _decision;
  }
}

