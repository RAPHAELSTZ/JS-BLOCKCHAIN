import { Blockchain } from "./Engine/blockchain";
import { Block } from "./Engine/block"
import { Transaction } from "./Engine/transaction";

//File to launch Blockchain

let blockchain = new Blockchain("HagerChain")


// let transaction = new Transaction();
// let block = new Block();


console.log("New blockchain : ", blockchain);



//Test

let taille = blockchain.getChainHeight()
console.log("Blockchain size :", taille)

let listOfPendingTransactions = blockchain.getPendingTransactions()
console.log("Pending transactions :", listOfPendingTransactions)


//Création d'un ensemble de transactions
let transaction1 = new Transaction("SenderA", "SenderB", "J'aime les fleurs", 100000)
let transaction2 = new Transaction("SenderA", "SenderB", "Deuxieme rose envoyée", 300000)
let transaction3 = new Transaction("SenderB", "SenderC", "Quelle belle technologie", 45200)
let transaction4 = new Transaction("SenderA", "SenderB", "Qui a snapchat ici ?", 324000)
let transaction5 = new Transaction("SenderA", "SenderB", "J'adore les Bitcoins", 78565)
let transaction6 = new Transaction("SenderA", "SenderB", "Nano est mieux que bitcoin", 98078)
let transaction7 = new Transaction("SenderA", "SenderB", "Allez ferme là", 28968)
//TRANSACTION ARRAY
let nextBlockTransactions = [];
nextBlockTransactions.push(transaction1,transaction2,transaction3,transaction4,transaction5,transaction6,transaction7)

//Nouveau Block (Normalement créé par un mineur):
let recentBlock = new Block(blockchain.getChainHeight(), blockchain.chain[blockchain.getChainHeight()-1].blockHash, nextBlockTransactions, blockchain.difficulty )
//ajout d'un block
blockchain.addBlock(recentBlock);
