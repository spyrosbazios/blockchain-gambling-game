import Web3 from 'web3';
var wallet;
 
async function enableEth() {
//	if (web3) { deprecated but still works ???
	if (window.ethereum) { // can be skipped but why ???
		try {
			await ethereum.send('eth_requestAccounts');
			//const accounts = await ethereum.request({ method: 'eth_accounts' });

			wallet = ethereum.selectedAddress;
			return true;
		}
		catch(e) {return false;}
	}
}

document.getElementById('btn_connect_wallet').onclick = connectWallet; 
async function connectWallet() {
	console.log('Connecting Wallet ...');
	if (await enableEth()) {
		// balance getting needs fix but we're close
		const balance = await ethereum.sendAsync({
							method: 'eth_getBalance',
							params: [wallet, "latest"]
						});
		console.log('Wallet Address: ' + wallet);
		console.log('Wallet Balance: ' + balance);
	}
	else console.log('Connection failed');
}


var contract_address = '0xF28Dfa8306AF0804E20355ED262B42a6aB28aDCB';
 const passwordGameContract = web3.eth.Contract(window.abi, contract_address);

 document.getElementById('btn_bet').onclick = bet;
 async function bet() {
 	passwordGameContract.methods.createBet(1,[1,2,3,4,5,6,7,8,9]);
 	console.log('contract method called')
 }




