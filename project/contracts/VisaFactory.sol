pragma solidity ^0.4.19;

import "./Visa.sol";


contract VisaFactory {
  address owner;
  mapping(string => address) visaMap;

  //modifiers
  modifier onlyByOwner {
    if (msg.sender != owner) revert();
    _;
  }

  // constructors
  function VisaFactory() public {
    owner = msg.sender;
  }

  function create(string _visaType) public onlyByOwner returns (Visa) {
    Visa visa = new Visa();
    visa.transferOwnership(msg.sender);
    visaMap[_visaType] = address(visa);
    return visa;
  }

  function find(string _visaType) public view returns (address){
    return visaMap[_visaType];
  }
}
