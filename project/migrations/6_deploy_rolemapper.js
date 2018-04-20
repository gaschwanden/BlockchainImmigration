var RoleMapper = artifacts.require("./RoleMapper.sol");

module.exports = function (deployer) {
  deployer.deploy(RoleMapper);
};
