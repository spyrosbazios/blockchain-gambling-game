//import Web3 from 'web3';
var wallet;
var balance;
 
async function enableEth() {
//	if (web3) { deprecated but still works ???
	if (window.ethereum) { // can be skipped but why ???
		try {
			await ethereum.send('eth_requestAccounts');		
			return true;
		}
		catch(e) {return false;}
	}
}

async function connectWallet() {
	console.log('Connecting Wallet ...');
	if (await enableEth()) {
		wallet = ethereum.selectedAddress;
		balance = await ethereum.request({
							method: 'eth_getBalance',
							params: [wallet, "latest"]
						});
		console.log('Wallet Address: ' + wallet);
		console.log('Wallet Balance: ' + balance);
	}
	else console.log('Connection failed');
}

document.getElementById('btn_connect_wallet').onclick = connectWallet; 

const getContract = async (web3) => {
  //const data = await $.getJSON("./contracts/Greeting.json");

  const netId = await web3.eth.net.getId();
  const deployedNetwork = data.networks[netId];
  const greeting = new web3.eth.Contract(
    abi,
    deployedNetwork && deployedNetwork.address
  );
  console.log('greeting');
  return greeting;
};

//var contract_address = '0xF28Dfa8306AF0804E20355ED262B42a6aB28aDCB';
//const passwordGameContract = web3.eth.Contract(abi, contract_address);

 document.getElementById('btn_bet').onclick = bet;
 async function bet() {
  var contract = getContract;
 	contract.methods.createBet(1,[1,2,3,4,5,6,7,8,9]);
 	console.log('contract method called')
 }


 var abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "replaceOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "splitFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getBetInit",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getBetIndex",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getBetBlockNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getBetCodes",
      "outputs": [
        {
          "internalType": "uint8[9]",
          "name": "",
          "type": "uint8[9]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "betIndex",
          "type": "uint8"
        },
        {
          "internalType": "uint8[9]",
          "name": "codes",
          "type": "uint8[9]"
        }
      ],
      "name": "createBet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawBet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "verifyBet",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

