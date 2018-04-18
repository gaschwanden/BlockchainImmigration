var Artifact = artifacts.require("./Artifact.sol");

contract('Artifact', function (accounts) {
  it("should put 10000 Artifact in the first account", function () {
    return Artifact.deployed().then(function (instance) {
      return instance.transferOwnership.call(accounts[1]);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
});
