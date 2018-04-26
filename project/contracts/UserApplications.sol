pragma solidity ^0.4.21;

import "./Owned.sol";

contract UserApplications is Owned {
  address[] all_applications;
  mapping(address => address[]) user_applications;

  function registerApplication(address _application) public {
    user_applications[msg.sender].push(_application) - 1;
    all_applications.push(_application) - 1;
  }

  function findAllApplications() public constant returns (address[]) {
    return all_applications;
  }

  function findUserApplications(address _user) constant public returns (address[]){
    return user_applications[_user];
  }
}

