//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

contract PasswordGame {
    
    address[] owners;
    
    uint8 interest = 10; // maximum must be 100, eg interest = 10 means 10%
    uint8 chance = 38; //chance is inversed percentage eg chance = 2 means 50%
    uint8[] betAmounts; 
    uint8[] winAmounts; 

    struct Bet {
        bool init;
        uint8 betIndex;
        uint blockNumber;
        uint code1;
        uint code2;
        uint code3;
    }
    
    mapping (address => Bet) bets;
    //mapping (address => bool) hasBet;
    
    constructor() {
        owners = [0x9a267D357488fB3b8fdEE8C32694b6075c3a2044 /* <- example, our 3 addresses here */];
        betAmounts = [2, 5, 10];    // randomly chosen, must fix
        winAmounts = [10, 25, 50];  // randomly chosen, must fix
    }
    
    /* checks if a given address is an owner */
    function isOwner(address addr) public view returns (bool) {
        for (uint i = 0; i < owners.length; i++) {
            if (addr == owners[i]) return true;
        }
        return false;
    }
    
    /* allows an owner to replace his address with another owner */
    function replaceOwner(address newOwner) public {
        //require (isOwner(msg.sender), "You must be already an owner to add new owners!"); omitted to save gas from double loops
        for (uint8 i = 0; i < owners.length; i < i++) {
            if (owners[i] == msg.sender) owners[i] = newOwner;
        }
    }
    
    /* create a bet for a player */
    function createBet(uint8 betIndex,
                       uint8 c11, uint8 c12, uint8 c13,
                       uint8 c21, uint8 c22, uint8 c23,
                       uint8 c31, uint8 c32, uint8 c33)
    public {
        require(msg.sender.balance >= betAmounts[betIndex] && bets[msg.sender].init, "Please make sure you have sufficient funds and no active bets!");
        require (uintInRange(c11) && uintInRange(c12) && uintInRange(c13), "First (1st) code not in range!");
        require (uintInRange(c21) && uintInRange(c22) && uintInRange(c23), "Second (2nd) code not in range!");
        require (uintInRange(c31) && uintInRange(c32) && uintInRange(c33), "Third (3rd) code not in range!");
        assert (betIndex < 3); // hardcoded to save gas
        
        uint code1 = uintTo3digit(c11, c12, c13);
        uint code2 = uintTo3digit(c21, c22, c23);
        uint code3 = uintTo3digit(c31, c32, c33);
        bets[msg.sender] = Bet(true, betIndex, block.number, code1, code2, code3);
        
        /* ... transfer money ... */
    }

    /* getters */
    function getBetInit(address addr) public view returns (bool) {return bets[addr].init;}
    function getBetIndex(address addr) public view returns (uint8) {return bets[addr].betIndex;}
    function getBetBlockNumber(address addr) public view returns (uint) {return bets[addr].blockNumber;}
    function getBetCode1(address addr) public view returns (uint) {return bets[addr].code1;}
    function getBetCode2(address addr) public view returns (uint) {return bets[addr].code2;}
    function getBetCode3(address addr) public view returns (uint) {return bets[addr].code3;}
    /* getters */
    
    /* checks if a bet has won */
    function verifyBet() public returns (bool) {
        require (bets[msg.sender].init, "You must have placed a bet to verify it");

        bool win;
        if (bets[msg.sender].blockNumber == block.number - 1) {
            Bet storage b = bets[msg.sender];
            if (verifyCode(b.code1) || verifyCode(b.code2) || verifyCode(b.code3)) {
                win = true;
                /* ... you have won ... */
            } else {
                win = false;
                /* ... you have lost ... */
            }
        } 
        else win = false; /* verified it too late */
        delete bets[msg.sender];
        
        return win;
    }
    
    /* checks if a code has won */
    function verifyCode(uint code) private view returns (bool) {
        uint x = uint(keccak256(abi.encodePacked(bytes32(code), blockhash(block.number - 1))));
        return x % chance == 0;
    }
    
    /* checks if a digit is between 1 and 9 */
    function uintInRange(uint8 i) private pure returns (bool) {
        return i >= 1 && i <= 9;
    }
    
    /* converts 3 different digits to a single 3-digit number */
    function uintTo3digit (uint8 e, uint8 d, uint8 m) private pure returns (uint) {
        return uint(m + d * 10 + e * 100);
    }

    /* splits an amount of funds from the contract's address among contract owners */
    function splitFunds(uint amount) public {
        require (isOwner(msg.sender));
        for (uint i = 0; i < owners.length; i++) {
            (bool success, bytes memory b) = owners[i].call{value: amount/owners.length}('');
            require(success); // if (!success) revert(); works too
        }
    }

}

/* 
to-do:
add events for js
*/