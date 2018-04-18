pragma solidity ^0.4.0;

import "./Artifact.sol";

contract ArtifactFactory {
  mapping(address => address[]) ownerArtifacts;
  uint count;

  //constructors
  function ArtifactFactory() public {
  }

  //functions
  function create() public returns (Artifact) {
    Artifact artifact = new Artifact();
    artifact.transferOwnership(msg.sender);
    ownerArtifacts[msg.sender][count] = address(artifact);
    count++;
    return artifact;
  }

  function findAll() public view returns (address[]) {
    return ownerArtifacts[msg.sender];
  }
}
