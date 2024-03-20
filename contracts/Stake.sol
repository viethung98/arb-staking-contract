//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Stake is Ownable {
	using SafeERC20 for IERC20;

	event TokenStaked(address indexed _wallet, uint256 _amount, uint256 _time);
	event TokenClaimed(address indexed _wallet, uint256 _amount, uint256 _time);

	IERC20 public token;

	constructor() Ownable() {}

	function setting(address _token) external onlyOwner {
		token = IERC20(_token);
	}

	function stake(uint _amount) public {
		require(
			_amount > 0,
			"USDT amount is not valid"
		);

		token.transferFrom(_msgSender(), address(this), _amount);
		emit TokenStaked(
			_msgSender(),
			_amount,
			block.timestamp
		);
	}

	function claimToken(address _to) external onlyOwner {
		uint256 balance = token.balanceOf(address(this));
		token.safeTransfer(_to, balance);
		emit TokenClaimed(
			_to,
			balance,
			block.timestamp
		);
	}
}
