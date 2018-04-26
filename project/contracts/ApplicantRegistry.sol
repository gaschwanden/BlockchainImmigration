pragma solidity ^0.4.0;

import "./Owned.sol";

contract ApplicantRegistry is Owned {
  address[] public applicants;
  mapping(address => bool) public applicant_status;

  function ApplicantRegistry() public {
    owner = msg.sender;
  }

  function addApplicant(address _newApplicant) public onlyByOwner {
    applicants.push(_newApplicant) - 1;
    applicant_status[_newApplicant] = true;
  }

  function changeStatus(address _applicant, bool _active) public onlyByOwner {
    applicant_status[_applicant] = _active;
  }

  function getApplicantStatus(address _applicant) public constant returns (bool) {
    return applicant_status[_applicant];
  }
}
