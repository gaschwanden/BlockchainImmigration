var Visa = artifacts.require("./Visa.sol");
var VisaFactory = artifacts.require("./VisaFactory.sol");

module.exports = function (deployer) {
	deployer.deploy(Visa, "TEST", "TEST");
	deployer.deploy(VisaFactory);
};
