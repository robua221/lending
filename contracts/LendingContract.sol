//SPDX-License-Identifier:MIT
pragma solidity >=0.5.0 <0.9.0;

contract LendingContract {
    mapping(address => uint256) public balances;
    uint256 public totalLiquidity;

    function deposit(uint256 amount) external {
        require(amount > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += amount;
        totalLiquidity += amount;
    }

    function borrow(uint256 amount) external {
        require(amount > 0, "Borrow amount must be greater than 0");
        require(amount <= totalLiquidity, "Insufficient liquidity");
        balances[msg.sender] -= amount;
        totalLiquidity -= amount;
    }
}
