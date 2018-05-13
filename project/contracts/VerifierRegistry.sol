pragma solidity ^0.4.21;

import "./Owned.sol";

contract VerifierRegistry is Owned {
  address[] verifiers;
  uint public verifierCount;

  function VerifierRegistry() public {
    owner = msg.sender;
  }

  function addVerifier(address _newVerifier) public onlyByOwner {
    verifiers.push(_newVerifier) - 1;
    verifierCount++;
  }

  function findAll() public constant returns (address[]) {
    return verifiers;
  }
}
