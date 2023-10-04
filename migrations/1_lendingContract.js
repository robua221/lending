var LendingContract = artifacts.require("./LendingContract.sol");
module.exports = function (deployer) {
  deployer.deploy(LendingContract);
};
