// LendingContract.test.js
const LendingContract = artifacts.require("LendingContract");

contract("LendingContract", (accounts) => {
  it("should allow users to deposit and borrow assets", async () => {
    const lendingContract = await LendingContract.deployed();
    const user = accounts[0];
    const depositAmount = 100;
    const borrowAmount = 50;

    // Deposit
    await lendingContract.deposit(depositAmount, { from: user });
    const userBalanceAfterDeposit = await lendingContract.balances(user);
    const totalLiquidityAfterDeposit = await lendingContract.totalLiquidity();
    assert.equal(
      userBalanceAfterDeposit,
      depositAmount,
      "User balance not updated correctly after deposit"
    );
    assert.equal(
      totalLiquidityAfterDeposit,
      depositAmount,
      "Total liquidity not updated correctly after deposit"
    );

    // Borrow
    await lendingContract.borrow(borrowAmount, { from: user });
    const userBalanceAfterBorrow = await lendingContract.balances(user);
    const totalLiquidityAfterBorrow = await lendingContract.totalLiquidity();
    assert.equal(
      userBalanceAfterBorrow,
      depositAmount - borrowAmount,
      "User balance not updated correctly after borrow"
    );
    assert.equal(
      totalLiquidityAfterBorrow,
      depositAmount - borrowAmount,
      "Total liquidity not updated correctly after borrow"
    );
  });

  it("should revert when a user attempts to borrow more than available liquidity", async () => {
    const lendingContract = await LendingContract.deployed();
    const user = accounts[1];
    const depositAmount = 30;
    const borrowAmount = 40;

    // Deposit
    await lendingContract.deposit(depositAmount, { from: user });

    // Attempt to borrow more than available liquidity
    try {
      await lendingContract.borrow(borrowAmount, { from: user });
      // If the borrow is successful, this line should not be executed
      assert.fail(
        "Borrow should revert when attempting to borrow more than available liquidity"
      );
    } catch (error) {
      assert.include(error.message, "revert", "Expected revert error");
    }
  });
});
