pragma solidity ^0.4.21;

import "./Owned.sol";

contract UserArtifacts is Owned {
  mapping(address => address[]) user_artifacts;

  function registerArtifact(address _artifact) public {
    user_artifacts[msg.sender].push(_artifact) - 1;
  }

  function findUserArtifacts(address _user) constant public returns (address[]){
    return user_artifacts[_user];
  }
}

