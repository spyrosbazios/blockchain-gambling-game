  async function passwordGame_App() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const passwordGame_contract = await getContract(web3);
  }
  passwordGame_App();

//this is how you call the smart contract function that handles the creation of bet 
/*
await passwordGame_contract.methods
    .createBet(0,[1,2,3,4,5,6,7,8,9]) 
   .send({ from: accounts[0], gas: 4712388, gasPrice: 100000000000, value: 100000000000000000 });

*/

//this is how you call the smart contract function that handles the verification of the bet 
/*
await passwordGame_contract.methods
  .verifyBet()
  .send({ from: accounts[0], gas: 4712388, gasPrice: 100000000000});
*/