pragma solidity ^0.4.0;

import "./Owned.sol";

contract ApplicantRegistry is Owned {
  mapping(uint => address) public applicants;
  mapping(address => bool) public applicant_status;
  uint public applicantCount;

  function ApplicantRegistry() public {
    owner = msg.sender;
  }

  function addApplicant(address _newApplicant) public {
    applicants[applicantCount] = _newApplicant;
    applicant_status[_newApplicant] = true;
    applicantCount++;
  }

  function changeStatus(address _applicant, bool _active) public onlyByOwner {
    applicant_status[_applicant] = _active;
  }

  function getApplicantStatus(address _applicant) public constant returns (bool) {
    return applicant_status[_applicant];
  }

  function findOne(uint idx) public constant returns (address){
    return applicants[idx];
  }
}
