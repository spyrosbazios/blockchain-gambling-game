//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 <0.9.0;

contract PasswordGame {
    
    bool active;

    address[] owners; // owners of the contract
    uint8 interest = 10; // maximum must be 100, eg interest = 10 means 10%

    uint[] betAmounts;
    uint[] winAmounts;
    uint8[] chances;

    struct Bet {
        uint blockNumber;
        uint8 betIndex;
        uint8[12] codes;
    }
    
    mapping (address => Bet) bets;

    event Verified (
        address indexed addr,
        bool result,
        uint8[12] codes
    );

    event Code (uint code);
    
    constructor() payable {
        require(msg.value >= 500 ether, "You need a least 500 ether to deploy the contract");
        active = true;
        owners.push(msg.sender);
        betAmounts = [0, 1 ether, 2 ether, 3 ether];     // randomly chosen, must fix
        winAmounts = [0, 10 ether, 20 ether, 30 ether];  // randomly chosen, must fix
        chances = [2, 4, 8];        // randomly chosen, must fix, should be prime numbers
    }                              // chance is inversed percentage eg chance = 2 means 50%
    
    receive() external payable {}
    
    modifier activereq {require(active, "Smart contract must be active!"); _;}
    modifier owneronly {
        bool isowner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (msg.sender == owners[i]) { 
                isowner = true;
                break;
            }
        }
        require(isowner, "This method can only be called by an owner!");
        _;
    }
    
    /* contract getters */
    function getContractBalance() public view returns (uint256) {return address(this).balance;}
    function getChainBlockNumber() public view returns (uint256) {return block.number;}
    /* contract getters */
    
    /*
    @functionality:
    Deactivates the contract permanently
    
    @requirements:
    The contract must be active
    The msg.sender must be an owner
    */
    function deactivate() activereq owneronly public {
        splitFunds(address(this).balance);
        active = false;
    }
    
    /*
    @functionality:
    Checks if a given address is an owner 
    
    @requirements:
    The contract must be active
    
    @params:
    address addr: The address to check if it's an owner
    
    function isOwner(address addr) activereq public view returns (bool) {
        for (uint i = 0; i < owners.length; i++) {
            if (addr == owners[i]) return true;
        }
        return false;
    }
    */
    
    /*
    @functionality:
    Allows an owner to replace his address with another owner
    
    @requirements:
    The contract must be active
    
    @params:
    address newOwner: The address to replace the owner's address with
    */
    function replaceOwner(address newOwner) activereq public {
        for (uint8 i = 0; i < owners.length; i < i++) {
            if (owners[i] == msg.sender) owners[i] = newOwner;
        }
    }

    /*
    @functionality:
    Splits an amount of funds from the contract's address among contract owners
    
    @requirements:
    The contract must be active
    The msg.sender must be an owner
    
    @params:
    uint amount: The amount of the contract's balance to split among owners
    */
    function splitFunds(uint amount) activereq owneronly public {
        for (uint i = 0; i < owners.length; i++) {
            (bool success,) = owners[i].call{value: amount/owners.length}('');
            assert(success); // if (!success) revert(); works too
        }
    }
    
    /* bet getters */
    function getBetIndex(address addr) public view returns (uint8) {return bets[addr].betIndex;}
    function getBetBlockNumber(address addr) public view returns (uint) {return bets[addr].blockNumber;}
    function getBetCodes(address addr) public view returns (uint8[12] memory) {
        uint8[12] memory c = bets[addr].codes;
        return c;
    }
    /* bet getters */

    /*
    @functionality:
    Creates a bet for a player
    
    @requirements:
    The contract must be active
    The msg.value must be greater than or equal to the cost of the chosen box
    The player must have no active bets
    All code digits must be between 1 and 9
    The chosen box index must be less than 3
    
    @params:
    uint8 betIndex: The index of the chosen box
    uint8[12 codes: The codes chosen from the player
    */
    function createBet(uint8 betIndex, uint8[12] calldata codes) activereq public payable {
        require(bets[msg.sender].betIndex == 0, "You have already placed a bet!");
        require(betIndex >= 1 && betIndex <= 3, "Please choose a valid box number");
        require(msg.value >= betAmounts[betIndex], "Please make sure you have sufficient funds");
        // require(address(this).balance >= winAmounts[betIndex], "There's not enough money in the contract in case you win!");
        for (uint8 i = 0; i < 12; i++) require(codes[i] >= 1 && codes[i] <= 9, "Please use valid code digits");

        bets[msg.sender] = Bet(block.number, betIndex, codes);
        uint change = msg.value - betAmounts[betIndex];
        (bool success,) = msg.sender.call{value: change}(''); assert(success);
    }

    /*
    @functionality:
    Cancel a player's bet
    
    @requirements:
    The contract must be active
    The player must have an active bet
    */
    function cancelBet() activereq public {
        Bet storage b = bets[msg.sender];
        require(b.betIndex != 0, "You must have placed a bet to cancel it!");

        uint betAmount = betAmounts[b.betIndex];
        uint betBlockNumber = b.blockNumber;
        delete bets[msg.sender];

        if (block.number == betBlockNumber) {
            (bool success,) = msg.sender.call{value: betAmount}(''); 
            assert(success);
        }
    }

    /*
    @functionality:
    Checks if a player's bet has won 
    
    @requirements:
    The contract must be active
    The player must have an active bet
    The current block number must be greater than the block number at the time of the bet's creation  
    */
    function verifyBet() activereq public {
        Bet storage b = bets[msg.sender];
        require(b.betIndex != 0, "You must have placed a bet to verify it!");
        require(block.number > b.blockNumber, "Wait until any later block is created to verify!"); // or blockhash will fail because the block won't be mined yet

        uint blockNumber = b.blockNumber;
        uint8[12] memory codes = b.codes;
        uint8 betIndex = b.betIndex;
        delete bets[msg.sender]; // maybe codes are not deleted correctly

        bool verified = verifyCodes(blockNumber, codes, chances[betIndex - 1]);
        if (verified) {
            uint ownerWins = winAmounts[betIndex] * interest / 100;
            uint playerWins = winAmounts[betIndex] - ownerWins;

            for (uint i = 0; i < owners.length; i++) {
                (bool successo,) = owners[i].call{value: ownerWins/owners.length}(''); 
                require(successo, "Failed to give money to owners");
            }
            (bool successp,) = msg.sender.call{value: playerWins}('');
            require(successp, "Failed to give money to player");
        }
        emit Verified(msg.sender, verified, codes);
    }
    
    /*
    @functionality:
    Checks if a bet's codes have won
    
    @requirements:
    The contract must be active
    
    @params:
    uint blockNumber: The block number at the time of the bet's creation
    uint8[12] codes: The codes included in the bet 
    uint8 chance: The chance to win of the bet's box
    */
    function verifyCodes(uint blockNumber, uint8[12] memory codes, uint8 chance) activereq private returns (bool) {
        for (uint i = 0; i < 12; i += 4) {
            uint code = uint(codes[i]) * 1000 + uint(codes[i+1]) * 100 + uint(codes[i+2]) * 10 + uint(codes[i+3]);
            emit Code(code);
            if (code == 1111) return true;
            else if (code == 6666) return false;
            uint hashedCode = uint(keccak256(abi.encodePacked(bytes32(code), blockhash(blockNumber))));
            if (hashedCode % chance == 0) return true;
        }
        return false;
    }

}

/* 
to-do:
add 2/3 of owners' consensus to deactivate the contract
add events for js
*/
