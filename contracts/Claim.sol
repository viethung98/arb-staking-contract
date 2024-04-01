//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Claim is Ownable {
	using SafeERC20 for IERC20;

	event TokenStaked(address indexed _wallet, uint256 _amount, uint256 _time);
	event TokenClaimed(address indexed _wallet, uint256 _amount, bytes signature, uint256 _time);

	IERC20 public token;
    address public signer;
    mapping(bytes => bool) public listSignature;



	constructor() Ownable() {}

	function setting(address _token, address _signer) external onlyOwner {
		token = IERC20(_token);
        signer = _signer;
	}

	function getMessageHash(
        string memory _txId,
        address _to,
        uint256 _amount,
        string memory _message
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_txId,_to, _amount, _message));
    }

    function getEthSignedMessageHash(bytes32 _messageHash)
        public
        pure
        returns (bytes32)
    {
        return keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
        );
    }

    function verify(
        address _signer,
        string memory _txId,
        address _to,
        uint256 _amount,
        string memory _message,
        bytes memory signature
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHash(_txId, _to, _amount, _message);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        return recoverSigner(ethSignedMessageHash, signature) == _signer;
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (bytes32 r, bytes32 s, uint8 v)
    {
        require(sig.length == 65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        // implicitly return (r, s, v)
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function deposit(uint _amount) public {
		require(
			_amount > 0,
			"amount is not valid"
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
	}

	function claimReward(
        string memory _txId,
        address _to,
        uint256 _amount,
        string memory _message,
        bytes memory signature
    ) public {
        require(
            !listSignature[signature],
            "signature already used"
        );

        require(
            verify(signer, _txId, _to, _amount, _message, signature),
            "invalid signature"
        );
		uint256 _balance = token.balanceOf(address(this));
        require(_balance > _amount, "balance is not enough");
        listSignature[signature] = true;

		token.safeTransfer(_to, _amount);
		emit TokenClaimed(
			_to,
			_amount,
            signature,
			block.timestamp
		);
	}
}
