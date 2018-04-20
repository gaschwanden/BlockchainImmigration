pragma solidity ^0.4.21;

import "./Owned.sol";

contract RoleMapper is Owned {
  bytes32 constant APPLICANT = 'Applicant';
  bytes32 constant VERIFIER = 'Verifier';
  bytes32 constant ADMIN = 'Admin';
  bytes32 constant NA = 'NA';

  mapping(address => bytes32) user_roles;

  //modifier
  modifier onlyValidRole(bytes32 _role) {
    if (_role != APPLICANT && _role != VERIFIER && _role != ADMIN) revert();
    _;
  }

  // constructors
  function RoleMapper() public {
    owner = msg.sender;
  }

  function add(address _user, bytes32 _role) public onlyByOwner onlyValidRole(_role) {
    user_roles[_user] = _role;
  }

  function get(address _user) public view returns (bytes32) {
    return user_roles[_user];
  }

  function remove(address _user) public onlyByOwner {
    user_roles[_user] = NA;
  }

  function isValid(address _user, bytes32 _role) public onlyValidRole(_role) view returns (bool) {
    return user_roles[_user] == _role;
  }
}
