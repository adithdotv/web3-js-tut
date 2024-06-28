import { Web3 } from 'web3'

const web3 = new Web3('http://127.0.0.1:8545/'); 

// create random wallet with 1 account
web3.eth.accounts.wallet.create(1)


//account creation from private key of an existing account


// the private key must start with the "0x" prefix
const accounts = web3.eth.accounts.wallet.add('0x359cb96af19e754d5608048ac7d4cd196a1e2b99d5b0ecaef20d5e9c83e6bac0');

// console.log(accounts);

const tx = 
{ 
    from: accounts[1].address,
    to: '0xa3286628134bad128faeef82f44e99aa64085c94', 
    value: web3.utils.toWei('1', 'ether'),
    gas: 800000,
    gasPrice: web3.utils.toWei('20', 'gwei')
};
// the "from" address must match the one previously added with wallet.add

// send the transaction
const txReceipt = await web3.eth.sendTransaction(tx);

console.log('Tx Receipt:', txReceipt)