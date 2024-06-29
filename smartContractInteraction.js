import { Web3 } from 'web3'

const web3 = new Web3('wss://ethereum.publicnode.com'); 

// Uniswap token smart contract address (Mainnet)
const address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

const privateKey = '0xbec7a7eccd564f4ff0a7af6aab7ab7b48b2764b2f4a745fe6ae62fac10c47737'

const account = web3.eth.accounts.wallet.add(privateKey);

console.log('Account address:', account[0].address);

// you can find the complete ABI on etherscan.io
// https://etherscan.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984#code
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "to", "type": "address"}, {"name": "value", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
          {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
          {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
          {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
        ],
        "name": "Transfer",
        "type": "event"
      }
];


// instantiate the smart contract
const uniswapToken = new web3.eth.Contract(abi, address);

// console.log(uniswapToken.methods)

// make the call to the contract
const symbol = await uniswapToken.methods.symbol().call();

console.log('Uniswap symbol:',symbol);
// ↳ Uniswap symbol: UNI

// make the call to the contract
const totalSupply = await uniswapToken.methods.totalSupply().call();

console.log('Uniswap Total supply:', totalSupply);
// ↳ Uniswap Total Supply: 1000000000000000000000000000n

// address to send the token
const to = '0xcf185f2F3Fe19D82bFdcee59E3330FD7ba5f27ce';

// value to transfer (1 with 18 decimals)
const value = web3.utils.toWei('1','ether');

// send the transaction => return the Tx receipt
const balance = await uniswapToken.methods.balanceOf(account[0].address).call();
console.log('Account balance (in wei):', balance);

// Convert balance from wei to human-readable format
const balanceInTokens = web3.utils.fromWei(balance, 'ether');
console.log('Account balance (in UNI tokens):', balanceInTokens);

// Compare the balance with the value to transfer
if (BigInt(balance) >= BigInt(value)) {
    try {
        // Estimate gas for the transaction
        const gasEstimate = await uniswapToken.methods.transfer(to, value).estimateGas({ from: account[0].address });
        console.log('Estimated gas:', gasEstimate);

        // Send the transaction with the estimated gas limit
        const txReceipt = await uniswapToken.methods.transfer(to, value).send({
            from: account[0].address,
            gas: gasEstimate
        });

        console.log('Tx hash:', txReceipt.transactionHash);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
} else {
    console.error('Insufficient balance to complete the transfer.');
}

(async () => {
    // Get past `Transfer` events from a smaller block range
    const fromBlock = 20170000;
    const toBlock = 20173393; // Or specify a smaller block number
    const eventTransfer = await uniswapToken.getPastEvents('Transfer', { fromBlock, toBlock });

    // console.log(eventTransfer);
})();

const subscription = uniswapToken.events.Transfer();

subscription.on('data', (event) => {
    console.log('Transfer event received:', event.returnValues);
});

// Handle errors
subscription.on('error', (error) => {
    console.error('Error with event subscription:', error);
});