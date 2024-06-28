import { Web3 } from 'web3'

const web3 = new Web3('https://eth.llamarpc.com'); 

// Uniswap token smart contract address (Mainnet)
const address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

const account = web3.eth.accounts.wallet.add('0x359cb96af19e754d5608048ac7d4cd196a1e2b99d5b0ecaef20d5e9c83e6bac0');

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
