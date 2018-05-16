pragma solidity ^0.4.21;

import "./Owned.sol";
import "./Visa.sol";

contract VisaFactory is Owned {
  Visa[] public all_visas;
  uint public visaCount;
  mapping(bytes32 => Visa) visaMap;

  event VisaCreated(address indexed visaAddress, bytes32 indexed code, bytes32 name, uint total);

  function VisaRegistry() public {
    owner = msg.sender;
  }

  function createVisa(bytes32 _code, bytes32 _name) public {
    Visa visa = new Visa(_code, _name);
    all_visas.push(visa) - 1;
    visaMap[_code] = visa;
    visaCount++;
    emit VisaCreated(address(visa), _code, _name, visaCount);
  }

  function findBy(bytes32 _code) public constant returns (Visa) {
    return visaMap[_code];
  }

  function findAll() public constant returns (Visa[]) {
    return all_visas;
  }
}
