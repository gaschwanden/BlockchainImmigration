pragma solidity ^0.4.19;


contract Visa {
    address public immigrationDept;
  string public visaType;
    address[] public verifiers;
    //TODO 100 point check
    //TODO set of document types

    // modifiers
    modifier onlyByOwner {
        if (msg.sender != immigrationDept) throw;
        _;
    }

    // constructors
  function Visa(string _visaType, address[] _verifiers) public {
    visaType = _visaType;
        verifiers = _verifiers;
    }
}
