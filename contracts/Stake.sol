//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Stake is AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event TokenStaked(address indexed _wallet, uint256 _amount, uint256 _time);
    event TokenClaimed(address indexed _wallet, uint256 _amount, uint256 _time);

    IERC20 public token;

    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
    }
	
    function setting(address _token) external onlyRole(ADMIN_ROLE) {
        token = IERC20(_token);
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function stake(uint _amount) public {
        require(_amount > 0, "amount is not valid");

        token.transferFrom(_msgSender(), address(this), _amount);
        emit TokenStaked(_msgSender(), _amount, block.timestamp);
    }

    function claimToken(
        address _token,
        address _to
    ) external onlyRole(ADMIN_ROLE) {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        IERC20(_token).safeTransfer(_to, amount);
    }
}
