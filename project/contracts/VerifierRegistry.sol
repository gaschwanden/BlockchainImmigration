pragma solidity ^0.4.21;

import "./Owned.sol";

contract VerifierRegistry is Owned {
  address[] public verifiers;
  mapping(address => bool) public verifier_status;
  uint public verifierCount;

  function VerifierRegistry() public {
    owner = msg.sender;
  }

  function addVerifier(address _newVerifier) public onlyByOwner {
    verifiers.push(_newVerifier) - 1;
    verifier_status[_newVerifier] = true;
    verifierCount++;
  }

  function changeStatus(address _verifier, bool _active) public onlyByOwner {
    verifier_status[_verifier] = _active;
  }

  function getVerifierStatus(address _verifier) public constant returns (bool) {
    return verifier_status[_verifier];
  }

  function findOne(uint idx) public constant returns (address) {
    return verifiers[idx];
  }
}
