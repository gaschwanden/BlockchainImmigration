var Verifier = artifacts.require("./Verifier.sol");
var VerifierFactory = artifacts.require("./VerifierFactory.sol");

module.exports = function (deployer, network, accounts) {
	deployer.deploy(Verifier, "Immigration Department", accounts[0], ["OTHERS"]);
	deployer.deploy(VerifierFactory);
};
