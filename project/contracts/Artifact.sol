pragma solidity ^0.4.21;

import "./Owned.sol";

contract Artifact is Owned {
  bytes32 public name;
  bytes32 location;
  bool public is_valid;
  address public verifier;
  bytes32 public artifact_type; //FIXME this should be an enum

  //modifier
  modifier onlyByVerifier() {
    if (verifier != 0 && verifier != msg.sender) revert();
    _;
  }

  // constructors
  function Artifact() public {
    owner = msg.sender;
  }

  function setType(bytes32 _type) public onlyByOwner {
    artifact_type = _type;
  }

  function setUrl(bytes32 _url) public onlyByOwner {
    location = _url;
  }

  function setValid(bool _flag) public onlyByVerifier {
    is_valid = _flag;
  }

  function setName(bytes32 artifact_name) public onlyByOwner {
    name = artifact_name;
  }

  function getUrl() public view onlyByOwner onlyByVerifier returns (bytes32) {
    return location;
  }
}

