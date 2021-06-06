   
   /*
    <script src = 'web3.min.js'></script>
    <script type = "text/javascript" src="src/utils.js"></script>
    <script type="text/javascript" src ="src/gameplay.js"></script>
   */
   
   /*
    @functionality:
    Prompts the user to connect his wallet through the Metamask's, browser 
    extension, pop-up window and initializes the web3 object
    
    @requirements:
    The Metamask extension installed in the user's browser
    */
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
     /*
    @functionality:
    Creates an smart-contract instance that is callable from javascript
    
    @requirements:
    The solidity code of the contract must be deployed to a blockchain
    
    @params:
    web3 ????????? or not
    */
  const getContract = async (web3) => {
  
    const data = await $.getJSON("../../back-end/build/contracts/PasswordGame.json");
    const netId = await web3.eth.net.getId();                 
    const deployedNetwork = 5777;                               //Network code of the blockchain used to deloy the contract
    const contractAdderess = "0x5eBE53A1756ec98071807c33e58e62A6D0B99547";
    const passwordGame_contract = new web3.eth.Contract(
        data.abi, 
        contractAdderess 
    );
    return passwordGame_contract;
  };
