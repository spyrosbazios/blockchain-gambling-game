 var wallet;
 
async function enableEth() {
//	if (web3) { deprecated but still works ???
	if (window.ethereum) { // can be skipped but why ???
		try {
			await ethereum.send('eth_requestAccounts');
			wallet = ethereum.selectedAddress;
			return true;
		}
		catch(e) {return false;}
	}
}

async function connectWallet() {
	console.log('Connecting wallet ...');
	if (await enableEth()) {
		// balance getting needs fix but we're close
		const balance = await ethereum.sendAsync({
							method: 'eth_getBalance',
							params: [wallet, "latest"]
						});
		console.log('Wallet Address: ' + wallet);
		console.log('Balance: ' + balance);
	}
	else console.log('Connection failed');
};

document.getElementById('btn_connect_wallet').onclick = connectWallet;

/*
var contract_abi = require('/Users/macbook/Sync/Information Systems Dev/blockchain-gambling-game/front-end/abi.json');
var contract_address = '0xF28Dfa8306AF0804E20355ED262B42a6aB28aDCB';
const passwordGameContract = web3.eth.Contract(contract_abi, contract_address);
*/

function bet() {
	passwordGameContract.methods.createBet(1,[1,2,3,4,5,6,7,8,9]);
	console.log('contract method called')
}