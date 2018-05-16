var ApplicantRegistry = artifacts.require("./ApplicantRegistry.sol");
var AdminRegistry = artifacts.require("./AdminRegistry.sol");
var UserApplications = artifacts.require("./UserApplications.sol");
var UserArtifacts = artifacts.require("./UserArtifacts.sol");

var options = {from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"};

module.exports = function (deployer) {
  deployer.deploy(AdminRegistry, options);
  deployer.deploy(ApplicantRegistry, options);
  deployer.deploy(UserApplications, options);
  deployer.deploy(UserArtifacts, options);
};
