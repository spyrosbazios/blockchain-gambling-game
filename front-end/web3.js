//var Web3 = require('web3');
import Web3 from 'web3';
var web3 = new Web3(window.ethereum);
//await window.ethereum.enable();

///*
const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}


//*/



var contract_abi = require('/Users/macbook/Sync/Information Systems Dev/blockchain-gambling-game/front-end/abi.json');
var contract_address = '0xF28Dfa8306AF0804E20355ED262B42a6aB28aDCB';
const passwordGameContract = web3.eth.Contract(contract_abi, contract_address);

function bet(){
  passwordGameContract.methods.createBet(1,[1,2,3,4,5,6,7,8,9]);
  console.log('contract method called')
}
