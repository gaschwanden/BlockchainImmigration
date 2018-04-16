pragma solidity ^0.4.19;


contract Artifact {
  address public owner;
  string public url;
  bool public verified;
  address public verifier;
  string artifactType; //FIXME this should be an enum

  //TODO store the image hash


  // modifiers
  modifier onlyByOwner {
    if (msg.sender != owner) throw;
    _;
  }

  // constructors
  function Artifact() public {
    owner = msg.sender;
  }

  function setUrl(string _url) public onlyByOwner {
    url = _url;
  }

  function getUrl() public constant returns (string) {
    return url;
  }

  function verify(address _verifier, bool _verified) {
    verifier = _verifier;
    verified = _verified;
  }
}
