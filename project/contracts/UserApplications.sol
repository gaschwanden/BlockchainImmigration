pragma solidity ^0.4.21;

import "./Owned.sol";

contract UserApplications is Owned {
  mapping(address => address[]) user_applications;

  function registerApplication(address application) public {
    user_applications[msg.sender].push(application) - 1;
  }

  function findUserApplications(address user) view public returns (address[]){
    return user_applications[user];
  }
}

