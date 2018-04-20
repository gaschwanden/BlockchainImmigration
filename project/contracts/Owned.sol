pragma solidity ^0.4.21;

contract Owned {
  address public owner;

  // modifiers
  modifier onlyByOwner {
    if (msg.sender != owner) revert();
    _;
  }

  // constructors
  function transferOwnership(address new_owner) public onlyByOwner {
    owner = new_owner;
  }
}
