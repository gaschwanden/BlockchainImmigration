var Artifacts = artifacts.require("./Artifact.sol");

module.exports = function (deployer, network, accounts) {
  //byte32 pName, bytes32 pLocation, address pVerifier, bytes32 pType
	deployer.deploy(Artifacts, "", "", accounts[0], "");
};
