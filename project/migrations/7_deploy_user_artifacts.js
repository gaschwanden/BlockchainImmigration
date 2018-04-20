var UserArtifacts = artifacts.require("./UserArtifacts.sol");

module.exports = function (deployer) {
  deployer.deploy(UserArtifacts);
};
