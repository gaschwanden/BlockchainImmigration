pragma solidity ^0.4.19;


contract Artifact {
  address public owner;
  string public url;
  bool public verified;
  address public verifier;
  string artifactType; //FIXME this should be an enum

  //TODO store the image hash

  //events
  event NotifyVerifier(address _artifact, address _verifier);

  // modifiers
  modifier onlyByOwner {
    if (msg.sender != owner) revert();
    _;
  }

  modifier onlyByVerifier {
    if (verifier > 0 && verifier != msg.sender) revert();
    _;
  }

  // constructors
  function Artifact() public {
    owner = msg.sender;
  }

  function transferOwnership(address _newOwner) public onlyByOwner {
    owner = _newOwner;
  }

  function setUrl(string _url) public onlyByOwner {
    url = _url;
  }

  function getUrl() public constant onlyByOwner onlyByVerifier returns (string) {
    return url;
  }

  function setVerifier(address _verifier) public onlyByOwner {
    verifier = _verifier;
    NotifyVerifier(address(this), verifier);
  }

  function verify(address _verifier, bool _verified) public onlyByVerifier {
    verifier = _verifier;
    verified = _verified;
  }
}
