// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FireCoin
 * @dev A mineable ERC20 token with pause capability and capped supply
 */
contract FireCoin is ERC20, ERC20Burnable, Pausable, Ownable {
    uint256 public immutable cap;

    // Mining parameters
    uint256 public rewardPerBlock; // tokens rewarded to a successful miner
    uint256 public difficulty; // target threshold for pseudo-random check
    mapping(uint256 => bool) public blockRewardClaimed; // prevent multiple rewards per block

    event Mined(address indexed miner, uint256 indexed blockNumber, uint256 reward);

    constructor(
        uint256 initialSupply,
        uint256 _cap,
        address owner_,
        uint256 _rewardPerBlock,
        uint256 _difficulty
    ) ERC20("FireCoin", "FCOIN") Ownable(owner_) {
        require(_cap >= initialSupply, "Cap below initial supply");
        require(_rewardPerBlock > 0, "Reward must be > 0");
        require(_difficulty > 0, "Difficulty must be > 0");
        cap = _cap;
        rewardPerBlock = _rewardPerBlock;
        difficulty = _difficulty;
        _mint(owner_, initialSupply);
    }

    /**
     * @dev Pause token transfers
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Set mining parameters
     */
    function setMiningParams(uint256 _rewardPerBlock, uint256 _difficulty) external onlyOwner {
        require(_rewardPerBlock > 0, "Reward must be > 0");
        require(_difficulty > 0, "Difficulty must be > 0");
        rewardPerBlock = _rewardPerBlock;
        difficulty = _difficulty;
    }

    /**
     * @dev Mint new tokens (owner only)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= cap, "Cap exceeded");
        _mint(to, amount);
    }

    /**
     * @dev Mine FireCoin - anyone can call this to potentially earn tokens
     * Uses pseudo-random selection (not cryptographically secure)
     * @return success True if mining reward was claimed, false otherwise
     */
    function mine() external returns (bool) {
        require(!paused(), "Token is paused");
        uint256 bn = block.number;
        require(!blockRewardClaimed[bn], "Block already mined");

        // Pseudo-random selection using EIP-4399 (block.prevrandao)
        uint256 rand = uint256(keccak256(abi.encodePacked(
            blockhash(bn - 1),
            block.prevrandao,
            msg.sender
        )));

        if (rand % difficulty == 0) {
            uint256 reward = rewardPerBlock;
            require(totalSupply() + reward <= cap, "Cap exceeded");
            blockRewardClaimed[bn] = true;
            _mint(msg.sender, reward);
            emit Mined(msg.sender, bn, reward);
            return true;
        }
        return false;
    }

    /**
     * @dev Mine FireCoin on behalf of a beneficiary (for relayer/subsidized mining)
     * @param to The address to receive mining rewards
     * @return success True if mining reward was claimed, false otherwise
     */
    function mineFor(address to) external returns (bool) {
        require(!paused(), "Token is paused");
        require(to != address(0), "Invalid beneficiary");
        uint256 bn = block.number;
        require(!blockRewardClaimed[bn], "Block already mined");

        uint256 rand = uint256(keccak256(abi.encodePacked(
            blockhash(bn - 1),
            block.prevrandao,
            to
        )));

        if (rand % difficulty == 0) {
            uint256 reward = rewardPerBlock;
            require(totalSupply() + reward <= cap, "Cap exceeded");
            blockRewardClaimed[bn] = true;
            _mint(to, reward);
            emit Mined(to, bn, reward);
            return true;
        }
        return false;
    }

    /**
     * @dev Hook to enforce pause state on token transfers
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20) whenNotPaused {
        super._update(from, to, value);
    }
}
