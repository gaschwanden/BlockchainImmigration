pragma solidity ^0.4.19;


contract Artifact {
    address public applicant;
    string public url;
    bool isVerified;
    address public verifier;
    string type; //FIXME this should be an enum

    //TODO store the image hash


    // modifiers
    modifier onlyByOwner {
        if (msg.sender != applicant) throw;
        _;
    }

    // constructors
    function Artifact(string _url) public {
        applicant = msg.sender;
        url = _url;
    }

    function setUrl(string _url) public onlyByOwner {
        url = _url;
    }

    function getUrl() public constant returns (string) {
        return url;
    }

    function verify(address _verifier, bool _isVerified) {
        verifier = _verifier;
        isVerified = _isVerified;
    }
}
