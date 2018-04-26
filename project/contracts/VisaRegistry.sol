pragma solidity ^0.4.21;

import "./Owned.sol";

contract VisaRegistry is Owned {
  address[] public all_visas;
  uint public visaCount;
  mapping(bytes32 => address) visaMap;

  function VisaRegistry() public {
    owner = msg.sender;
  }

  function addVisa(bytes32 _code, address _newVisa) public onlyByOwner {
    visaMap[_code] = _newVisa;
    all_visas[visaCount] = _newVisa;
    visaCount++;
  }

  function findBy(bytes32 _code) public constant returns (address) {
    return visaMap[_code];
  }

  function findAll() public constant returns (address[]) {
    return all_visas;
  }
}
