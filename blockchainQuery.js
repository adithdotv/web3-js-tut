import { Web3 } from 'web3';

// private RPC endpoint 
// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID'); 

// or public RPC endpoint
const web3 = new Web3('https://eth.llamarpc.com'); 

// get the balance of an address
await web3.eth.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045').then(console.log);
// ↳ 114438180989009447638n

// get last block number
await web3.eth.getBlockNumber().then(console.log);
// ↳ 18849658n

// get the chain id of the current provider
await web3.eth.getChainId().then(console.log);
// ↳ 1n

// get the nonce of an address
await web3.eth.getTransactionCount('0x37826D8B5F4B175517A0f42c886f8Fca38C55Fe7').then(console.log);
// ↳ 7n

// get the current gas price
await web3.eth.getGasPrice().then(console.log);
// ↳ 23879160756n

// Get the balance in wei
const balanceInWei = await web3.eth.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

// Convert the balance from wei to Ether
const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');

console.log(balanceInEth);


