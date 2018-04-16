pragma solidity ^0.4.19;


contract UserRoles {
    enum Role {APPLICANT, VERIFIER, IMMIGRATION_DEPT}

    address creator;
    mapping(address => Role) roles;

    //modifiers
    modifier hasRole {
        if (msg.sender != applicant) throw;
        _;
    }

    function RoleBasedAcl() {
        creator = msg.sender;
    }

    function assignRole(address entity, string role) hasRole('superadmin') {
        roles[entity][role] = true;
    }

    function unassignRole(address entity, string role) hasRole('superadmin') {
        roles[entity][role] = false;
    }

    function isAssignedRole(address entity, string role) returns (bool) {
        return roles[entity][role];
    }

    modifier hasRole (string role) {
        if (!roles[msg.sender][role] && msg.sender != creator) {
            throw;
        }
        _;
    }
}
