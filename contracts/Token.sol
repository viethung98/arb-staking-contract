// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract Token is ERC20PresetMinterPauser, Ownable {
    constructor(
        string memory name,
        string memory symbol
    ) ERC20PresetMinterPauser(name, symbol) {
        mint(_msgSender(), 100000000 * 10 ** decimals());
    }

    /**
     * @dev Returns the cap on the token's total supply.
     */
    function mint(address to, uint256 amount) public virtual override {
        require(owner() == msg.sender, "ERC20: must have owner to mint");
        _mint(to, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
