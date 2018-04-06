pragma solidity ^0.4.19;


contract Visa {
    address public immigrationDept;
    string public type;
    address[] public verifiers;

    // modifiers
    modifier onlyByOwner {
        if (msg.sender != immigrationDept) throw;
        _;
    }

    // constructors
    function Visa(string _type, address[] _verifiers) public {
        type = _type;
        verifiers = _verifiers;
    }
}
