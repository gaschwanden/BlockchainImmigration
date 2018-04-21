var UserApplications = artifacts.require("./UserApplications.sol");

module.exports = function (deployer) {
  deployer.deploy(UserApplications);
};
