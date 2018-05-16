var Visa = artifacts.require("./Visa.sol");
var VisaFactory = artifacts.require("./VisaFactory.sol");

var options = {from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57".toLowerCase()};

module.exports = function (deployer) {
  deployer.deploy(Visa, "TEST", "TEST", options);
  deployer.deploy(VisaFactory, options);
};
