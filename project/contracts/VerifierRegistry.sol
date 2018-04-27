pragma solidity ^0.4.0;

import "./Owned.sol";

contract VerifierRegistry is Owned {
  mapping(uint => address) public verifiers;
  mapping(address => bool) public verifier_status;
  uint public verifierCount;

  function VerifierRegistry() public {
    owner = msg.sender;
  }

  function addVerifier(address _newVerifier) public onlyByOwner {
    verifiers[verifierCount] = _newVerifier;
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