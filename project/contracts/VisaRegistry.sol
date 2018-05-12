pragma solidity ^0.4.21;

import "./Owned.sol";

contract VisaRegistry is Owned {
  address[] all_visas;
  uint public visaCount;
  mapping(bytes32 => address) visaMap;

  function VisaRegistry() public {
    owner = msg.sender;
  }

  function addVisa(bytes32 _code, address _newVisa) public onlyByOwner {
    visaMap[_code] = _newVisa;
    all_visas.push(_newVisa) - 1;
    visaCount++;
  }

  function findBy(bytes32 _code) public constant returns (address) {
    return visaMap[_code];
  }

  function findOne(uint idx) public constant returns (address) {
    return all_visas[idx];
  }

  function findAll() public constant returns (address[]) {
    return all_visas;
  }
}
