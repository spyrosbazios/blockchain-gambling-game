//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

contract PasswordGame {
    
    address[] owners;
    
    uint8 chance = 38; //chance is inversed percentage eg chance = 2 means 50%
    
    struct Bet {
        uint amount;
        uint blockNumber;
        uint code1;
        uint code2;
        uint code3;
    }
    
    mapping (address => Bet) bets;
    mapping (address => bool) hasBet;
    
    constructor() {
        owners.push(msg.sender);
    }
    
    /* checks if a given address is an owner */
    function isOwner(address addr) public view returns (bool) {
        for (uint i = 0; i < owners.length; i++) {
            if (addr == owners[i]) return true;
        }
        return false;
    }
    
    /* allows an owner to add another owner */
    function addOwner(address newOwner) public {
        require (isOwner(msg.sender), "You must be already an owner to add new owners!");
        owners.push(newOwner);
    }
    
    /* create a bet for a player */
    function createBet(uint amount, 
                       uint8 c11, uint8 c12, uint8 c13,
                       uint8 c21, uint8 c22, uint8 c23,
                       uint8 c31, uint8 c32, uint8 c33)
    public {
        
        require(msg.sender.balance >= amount && !hasBet[msg.sender], "Please make sure you have sufficient funds and no active bets!");
        require (uintInRange(c11) && uintInRange(c12) && uintInRange(c13), "First (1st) code not in range!");
        require (uintInRange(c21) && uintInRange(c22) && uintInRange(c23), "Second (2nd) code not in range!");
        require (uintInRange(c31) && uintInRange(c32) && uintInRange(c33), "Third (3rd) code not in range!");
        
        uint code1 = uintTo3digit(c11, c12, c13);
        uint code2 = uintTo3digit(c21, c22, c23);
        uint code3 = uintTo3digit(c31, c32, c33);
        bets[msg.sender] = Bet(amount, block.number, code1, code2, code3);
        hasBet[msg.sender] = true;
        
        /* ... transfer money ... */
    }

    function getBetAmount(address addr) public view returns (uint) {return bets[addr].amount;}
    function getBetBlockNumber(address addr) public view returns (uint) {return bets[addr].blockNumber;}
    function getBetCode1(address addr) public view returns (uint) {return bets[addr].code1;}
    function getBetCode2(address addr) public view returns (uint) {return bets[addr].code2;}
    function getBetCode3(address addr) public view returns (uint) {return bets[addr].code3;}
    function getHasBet(address addr) public view returns (bool) {return hasBet[addr];}
    
    /* checks if a bet has won */
    function verifyBet() public returns (bool) {
        require (hasBet[msg.sender], "You must have an active bet to verify it");

        bool won;
        if (bets[msg.sender].blockNumber == block.number - 1) {
            Bet storage b = bets[msg.sender];
            if (verifyCode(b.code1) || verifyCode(b.code2) || verifyCode(b.code3)) {
                won = true;
                /* ... you have won ... */
            } else {
                won = false;
                /* ... you have lost ... */
            }
        } 
        else won = false; /* verified it too late */
        hasBet[msg.sender] = false;
        
        return won;
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

}

/* 
to-do:
add winning amount per bet
add mapping index of every bet so I can remove the bet from the mapping after its verification
*/

/*
string s1 = Utils.uintToString(code1);
string s2 = Utils.uintToString(code2);
string s3 = Utils.uintToString(code3);
Bet b = Bet(amount, block.number, abi.encodePacked(s1, s2, s3));
*/