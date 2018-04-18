var ArtifactFactory = artifacts.require("./ArtifactFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(ArtifactFactory);
};
