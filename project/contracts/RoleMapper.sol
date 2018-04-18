pragma solidity ^0.4.19;


contract RoleMapper {
  enum Role {Applicant, Verifier, Admin, NA}
  address owner;
  mapping(address => Role) userRoles;

  // modifiers
  modifier onlyByOwner {
    if (msg.sender != owner) revert();
    _;
  }

  // constructors
  function RoleMapper() public {
    owner = msg.sender;
  }

  function add(address _user, Role role) public onlyByOwner {
    userRoles[_user] = role;
  }

  function get(address _user) public constant returns (Role) {
    return userRoles[_user];
  }

  function remove(address _user) public onlyByOwner {
    userRoles[_user] = Role.NA;
  }

  function isValid(address _user, Role role) public constant returns (bool) {
    return userRoles[_user] == role;
  }
}
