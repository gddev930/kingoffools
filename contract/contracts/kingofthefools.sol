// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.9;

contract KingOfTheFools{
    address king_addr = address(0);
    uint256 king_balance = 0 ether;
    
    function deposit() external payable{        
        require(msg.value > 0, 'deposit balance must be more than 0');
        require(msg.sender != king_addr, 'you are already the king of the fools, not allowed to deposit again!');
        if(king_balance == 0){
            king_addr = msg.sender;
            king_balance = msg.value;
        }else{
            require(msg.value >= king_balance * 3 / 2, "Not enough eth amount to be the king of fools");
            //send back to the current king.
            (bool sent, bytes memory data) = king_addr.call{value: msg.value}("");
            require(sent, "Failed to send Ether");

            //replace king info
            king_balance = msg.value;
            king_addr = msg.sender;            
        }        
    }

    function getKing() external view returns (address) {
        return king_addr;        
    }
    function getKingBalance() external view returns (uint256) {
        return king_balance;
    }
}