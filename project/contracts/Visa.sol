pragma solidity ^0.4.19;


contract Visa {
    address public immigrationDept;
    string public type;
    address[] public verifiers;
    //TODO 100 point check
    //TODO set of document types

    // modifiers
    modifier onlyByOwner {
        Constants.Type.
        if (msg.sender != immigrationDept) throw;
        _;
    }

    // constructors
    function Visa(string _type, address[] _verifiers) public {
        type = _type;
        verifiers = _verifiers;
    }
}
