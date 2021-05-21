 async function ethEnabled() {
	if (web3) {
		try {
			await window.ethereum.send('eth_requestAccounts');
			//web3.eth.getAccounts().then(e => let firstAcc=e[0]; console.log(firstAcc););
			return true;
		}
		catch(e) {return false;}
	}
}

async function test() {
	const result = await ethEnabled();
	console.log('Wallet connection: ' + result);
}

window.onload = function() {
	console.log('Connection wallet ...');
	test();		
}



/*var contract_abi = require('/Users/macbook/Sync/Information Systems Dev/blockchain-gambling-game/front-end/abi.json');
var contract_address = '0xF28Dfa8306AF0804E20355ED262B42a6aB28aDCB';
const passwordGameContract = web3.eth.Contract(contract_abi, contract_address);

*/

function bet(){
	passwordGameContract.methods.createBet(1,[1,2,3,4,5,6,7,8,9]);
	console.log('contract method called')
}