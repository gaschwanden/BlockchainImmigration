pragma solidity ^0.4.21;

import "./Owned.sol";

contract Visa is Owned {
  bytes32 public visa_name;
  bytes32 public visa_type;
  //TODO 100 point check
  //TODO set of document types

  // constructors
  function Visa() public {
    owner = msg.sender;
  }

  function setType(bytes32 _type) public onlyByOwner {
    visa_type = _type;
  }

  function setName(bytes32 _name) public onlyByOwner {
    visa_name = _name;
  }
}
