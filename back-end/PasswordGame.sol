//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

contract PasswordGame {
    
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
    
    function bet(uint amount, 
                 uint8 c11, uint8 c12, uint8 c13,
                 uint8 c21, uint8 c22, uint8 c23,
                 uint8 c31, uint8 c32, uint8 c33)
    public {
       
        require(msg.sender.balance >= amount && !hasBet[msg.sender]);
        require (uintInRange(c11) && uintInRange(c12) && uintInRange(c13), "first code not in range!");
        require (uintInRange(c21) && uintInRange(c22) && uintInRange(c23), "second code not in range!");
        require (uintInRange(c31) && uintInRange(c32) && uintInRange(c33), "third code not in range!");
        
        uint code1 = uintToDigit3(c11, c12, c13);
        uint code2 = uintToDigit3(c21, c22, c23);
        uint code3 = uintToDigit3(c31, c32, c33);
        bets[msg.sender] = Bet(amount, block.number, code1, code2, code3);
        hasBet[msg.sender] = true;
        
        /* ... transfer money ... */
    }
    
    function verify() public {
        require (hasBet[msg.sender]);
        require (bets[msg.sender].blockNumber == block.number - 1);
        
        Bet memory b = bets[msg.sender];
        if (verify(b.code1) || verify(b.code2) || verify(b.code3)) {
            /* ... you have won ... */
        } else {
            /* ... you have lost ... */
        }
        
        hasBet[msg.sender] = false;
    }
    
    function verify(uint i) private view returns (bool) {
        uint x = uint(keccak256(abi.encodePacked(i, blockhash(block.number - 1))));
        return x % chance == 0;
    }
    
    function uintInRange(uint8 i) private pure returns (bool) {
        return i >= 1 && i <= 9;
    }
    
    function uintToDigit3 (uint8 e, uint8 d, uint8 m) private pure returns (uint) {
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