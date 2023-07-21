import { Blockchain } from "./Engine/blockchain";
import { Block } from "./Engine/block"
import { Transaction } from "./Engine/transaction";
import { Miner } from "./Engine/miner";

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



/**
 * FOR BLOCK 2
 */
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
recentBlock.blockHash = recentBlock.generateHash();

console.log("recent block hash: ", recentBlock.blockHash)

//ajout d'un block
blockchain.addBlock(recentBlock);



/**
 * FOR BLOCK 3
 */
//Création d'un ensemble de transactions
let transaction8 = new Transaction("SenderA", "SenderB", "Information inutile", 100000)
let transaction9 = new Transaction("SenderA", "SenderB", "Poésie moderne", 300000)
let transaction10 = new Transaction("SenderB", "SenderC", "Ennuie et divertissement", 45200)
let transaction11 = new Transaction("SenderA", "SenderB", "Rock > Rap ", 324000)
let transaction12 = new Transaction("SenderA", "SenderB", "Ou est passé George Alcoolman", 78565)
let transaction13 = new Transaction("SenderA", "SenderB", "Que faire maintenant", 98078)
let transaction14 = new Transaction("SenderA", "SenderB", "Certaines chansons sont trop nulles !!", 28968)

//TRANSACTION ARRAY
let nextBlockTransactions2 = [];
nextBlockTransactions2.push(transaction8,transaction9,transaction10,transaction11,transaction12,transaction13,transaction14)

//Nouveau Block (Normalement créé par un mineur):
let recentBlock2 = new Block(blockchain.getChainHeight(), blockchain.chain[blockchain.getChainHeight()-1].blockHash, nextBlockTransactions2, blockchain.difficulty )
recentBlock2.blockHash = recentBlock.generateHash();

console.log("recent block hash 2: ", recentBlock2.blockHash)

//ajout d'un block
blockchain.addBlock(recentBlock2);










// Instantiation of miner :


console.log("New minor starteed..");
let slowMiner = new Miner();

console.log("CURRENT DIFFICULTY " , recentBlock2.difficulty)

console.log("Starting hash quest : ");
slowMiner.generateHash(recentBlock2);





