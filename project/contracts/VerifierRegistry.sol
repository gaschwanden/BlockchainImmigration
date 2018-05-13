pragma solidity ^0.4.21;

import "./Owned.sol";

contract VerifierRegistry is Owned {
  mapping(address => address) verifierMap;
  address[] verifiers;

  function VerifierRegistry() public {
    owner = msg.sender;
  }

  function findAll() public view returns (address[]) {
    return verifiers;
  }

  function addVerifier(address _newWallet, address _newVerifier) public onlyByOwner {
    verifierMap[_newWallet] = _newVerifier;
    verifiers.push(_newVerifier) - 1;
  }

  function findOne(address _wallet) public constant returns (address) {
    return verifierMap[_wallet];
  }
}
