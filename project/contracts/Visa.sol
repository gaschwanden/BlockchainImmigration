pragma solidity ^0.4.19;


contract Visa {
  address owner;
  string public visaType;
  //TODO 100 point check
  //TODO set of document types

  // modifiers
  modifier onlyByOwner {
    if (msg.sender != owner) revert();
    _;
  }

  // constructors
  function Visa() public {
    owner = msg.sender;
  }

  function setVisaType(string _visaType) public onlyByOwner {
    visaType = _visaType;
  }

  function transferOwnership(address _newOwner) public onlyByOwner {
    owner = _newOwner;
  }
}
