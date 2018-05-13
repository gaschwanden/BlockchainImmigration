var Artifacts = artifacts.require("./Artifact.sol");

module.exports = function (deployer) {
  //byte32 pName, bytes32 pLocation, address pVerifier, bytes32 pType
  deployer.deploy(Artifacts, "INIT", "INIT", "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "INIT");
};
