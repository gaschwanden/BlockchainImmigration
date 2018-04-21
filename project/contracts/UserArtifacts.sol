pragma solidity ^0.4.21;

import "./Owned.sol";

contract UserArtifacts is Owned {
  mapping(address => address[]) user_artifacts;

  function registerArtifact(address artifact) public {
    user_artifacts[msg.sender].push(artifact) - 1;
  }

  function findUserArtifacts(address user) view public returns (address[]){
    return user_artifacts[user];
  }
}

