
  const getWeb3 = () => {
    return new Promise((resolve, reject) => {
      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            // ask user permission to access his accounts
            await window.ethereum.request({ method: "eth_requestAccounts" });
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        } else {
          reject("must install MetaMask");
        }
      });
    });
  };
  
  const getContract = async (web3) => {
  
    const netId = await web3.eth.net.getId();
    const deployedNetwork = 5777;
    const passwordGame_contract = new web3.eth.Contract(
      abi, '0x5eBE53A1756ec98071807c33e58e62A6D0B99547'
    );
    console.log(passwordGame_contract)
    return passwordGame_contract;
  };


  var abi =   [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "s",
          "type": "string"
        }
      ],
      "name": "debugEvent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "debugVar",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
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
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
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
      "name": "getBetIndex",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
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
      "name": "getBetBlockNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
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
      "name": "getBetCodes",
      "outputs": [
        {
          "internalType": "uint8[9]",
          "name": "",
          "type": "uint8[9]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
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
      "stateMutability": "payable",
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
  //const passwordGame_contract
  async function passwordGame_App() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const passwordGame_contract = await getContract(web3);
    //await passwordGame_contract.methods
      //  .createBet(0,[1,2,3,4,5,6,7,8,9]) 
    //    .send({ from: accounts[0], gas: 4712388, gasPrice: 100000000000, value: 100000000000000000 });

    /*
    console.log(
      await passwordGame_contract.methods.getBetInit(accounts[0]).send({ from: accounts[0], gas: 4712388, gasPrice: 100000000000 })
    );
    */
    
    //passwordGame_contract.methods.getBetInit(accounts[0]).call()
    //.then (console.log);

    passwordGame_contract.methods.verifyBet().send({ from: accounts[0], gas: 91000, gasPrice: 10000000000000 })
    .then (console.log);
    
    //await passwordGame_contract.methods
     //  .verifyBet()
     //  .send({ from: accounts[0], gas: 4712388, gasPrice: 100000000000});

  }document.getElementById('btn_bet').onclick = passwordGame_App(); 

 /*
  var debug = passwordGame_contract.debugEvent();
  debug.watch(function(error, result){
    if (!error){console.log(result)}
  })
 */
