pragma solidity ^0.4.0;

import "./Application.sol";

contract ApplicationFactory {
  mapping(address => address[]) ownerApplications;
  uint public count;

  function ApplicationFactory() public {
  }

  function create() public returns (Application) {
    Application application = new Application();
    application.transferOwnership(msg.sender);
    ownerApplications[msg.sender][count] = address(application);
    count++;
    return application;
  }

  function findAll() public view returns (address[]) {
    return ownerApplications[msg.sender];
  }
}
