import { Web3 } from 'web3'

const web3 = new Web3('http://127.0.0.1:8545/'); 

// generate a new random account
// const account = web3.eth.accounts.create();

// load an existing account from its private key
const account = web3.eth.accounts.privateKeyToAccount("0x040a7ff0a433c79cc8b065bb62e4c3748966ff62fec10a764e5ad5d014d621c4");


console.log(account);

// use the account to sign a message
const signature = account.sign("Hello, Web3.js!");

console.log(signature)