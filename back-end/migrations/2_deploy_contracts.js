const PasswordGame = artifacts.require("PasswordGame");

module.exports = function (deployer) {
  deployer.deploy(PasswordGame);
};
