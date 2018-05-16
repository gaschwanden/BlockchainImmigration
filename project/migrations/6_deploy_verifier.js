var Verifier = artifacts.require("./Verifier.sol");
var VerifierFactory = artifacts.require("./VerifierFactory.sol");

var options = {from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57".toLowerCase()};

module.exports = function (deployer) {
  deployer.deploy(Verifier, "Immigration Department", options.from, ["OTHERS"], options);
  deployer.deploy(VerifierFactory, options);
};
