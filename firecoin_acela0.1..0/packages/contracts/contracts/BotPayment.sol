// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BotPayment
 * @dev Automated payment system for bots using FireCoin with owner fee
 */
contract BotPayment is Ownable {
    IERC20 public fireCoin;
    
    // Fee configuration (percentage in basis points, e.g., 500 = 5%)
    uint256 public feePercentage = 1000; // 10% default fee
    uint256 public constant MAX_FEE = 5000; // Max 50% fee
    address public feeCollector;
    
    // Bot registration
    mapping(address => bool) public registeredBots;
    mapping(address => uint256) public botBalances;
    
    // Payment tracking
    uint256 public paymentCount;
    mapping(uint256 => Payment) public payments;
    
    struct Payment {
        address from;
        address to;
        uint256 amount;
        uint256 feeAmount;
        uint256 timestamp;
        string service;
        bool completed;
    }
    
    event BotRegistered(address indexed bot);
    event BotUnregistered(address indexed bot);
    event PaymentCreated(uint256 indexed paymentId, address indexed from, address indexed to, uint256 amount, uint256 fee, string service);
    event PaymentCompleted(uint256 indexed paymentId);
    event Deposit(address indexed bot, uint256 amount);
    event Withdrawal(address indexed bot, uint256 amount);
    event FeeCollected(address indexed collector, uint256 amount);
    event FeePercentageUpdated(uint256 newFee);
    
    constructor(address _fireCoinAddress, address owner_) Ownable(owner_) {
        fireCoin = IERC20(_fireCoinAddress);
        feeCollector = owner_;
    }
    
    /**
     * @dev Set fee percentage (in basis points, e.g., 1000 = 10%)
     */
    function setFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= MAX_FEE, "Fee too high");
        feePercentage = _feePercentage;
        emit FeePercentageUpdated(_feePercentage);
    }
    
    /**
     * @dev Set fee collector address
     */
    function setFeeCollector(address _feeCollector) external onlyOwner {
        require(_feeCollector != address(0), "Invalid address");
        feeCollector = _feeCollector;
    }
    
    /**
     * @dev Register a bot to use the payment system
     */
    function registerBot(address bot) external onlyOwner {
        registeredBots[bot] = true;
        emit BotRegistered(bot);
    }
    
    /**
     * @dev Unregister a bot
     */
    function unregisterBot(address bot) external onlyOwner {
        registeredBots[bot] = false;
        emit BotUnregistered(bot);
    }
    
    /**
     * @dev Deposit FireCoin for bot operations
     */
    function deposit(uint256 amount) external {
        require(registeredBots[msg.sender], "Bot not registered");
        require(fireCoin.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        botBalances[msg.sender] += amount;
        emit Deposit(msg.sender, amount);
    }
    
    /**
     * @dev Withdraw FireCoin from bot balance
     */
    function withdraw(uint256 amount) external {
        require(registeredBots[msg.sender], "Bot not registered");
        require(botBalances[msg.sender] >= amount, "Insufficient balance");
        botBalances[msg.sender] -= amount;
        require(fireCoin.transfer(msg.sender, amount), "Transfer failed");
        emit Withdrawal(msg.sender, amount);
    }
    
    /**
     * @dev Bot pays another bot for a service (with 10% fee to owner)
     */
    function payBot(address to, uint256 amount, string memory service) external returns (uint256) {
        require(registeredBots[msg.sender], "Sender not registered");
        require(registeredBots[to], "Receiver not registered");
        require(botBalances[msg.sender] >= amount, "Insufficient balance");
        
        // Calculate fee
        uint256 feeAmount = (amount * feePercentage) / 10000;
        uint256 amountAfterFee = amount - feeAmount;
        
        uint256 paymentId = paymentCount++;
        payments[paymentId] = Payment({
            from: msg.sender,
            to: to,
            amount: amount,
            feeAmount: feeAmount,
            timestamp: block.timestamp,
            service: service,
            completed: false
        });
        
        botBalances[msg.sender] -= amount;
        botBalances[to] += amountAfterFee;
        botBalances[feeCollector] += feeAmount;
        payments[paymentId].completed = true;
        
        emit PaymentCreated(paymentId, msg.sender, to, amount, feeAmount, service);
        emit PaymentCompleted(paymentId);
        emit FeeCollected(feeCollector, feeAmount);
        
        return paymentId;
    }
    
    /**
     * @dev Quick payment - direct transfer with fee (no deposit needed)
     */
    function quickPay(address to, uint256 amount, string memory service) external returns (uint256) {
        require(registeredBots[msg.sender], "Sender not registered");
        require(registeredBots[to], "Receiver not registered");
        
        // Calculate fee
        uint256 feeAmount = (amount * feePercentage) / 10000;
        uint256 amountAfterFee = amount - feeAmount;
        
        // Transfer to recipient
        require(fireCoin.transferFrom(msg.sender, to, amountAfterFee), "Transfer to recipient failed");
        // Transfer fee to collector
        require(fireCoin.transferFrom(msg.sender, feeCollector, feeAmount), "Fee transfer failed");
        
        uint256 paymentId = paymentCount++;
        payments[paymentId] = Payment({
            from: msg.sender,
            to: to,
            amount: amount,
            feeAmount: feeAmount,
            timestamp: block.timestamp,
            service: service,
            completed: true
        });
        
        emit PaymentCreated(paymentId, msg.sender, to, amount, feeAmount, service);
        emit PaymentCompleted(paymentId);
        emit FeeCollected(feeCollector, feeAmount);
        
        return paymentId;
    }
    
    /**
     * @dev Get payment details
     */
    function getPayment(uint256 paymentId) external view returns (Payment memory) {
        return payments[paymentId];
    }
    
    /**
     * @dev Get bot balance
     */
    function getBotBalance(address bot) external view returns (uint256) {
        return botBalances[bot];
    }
}
