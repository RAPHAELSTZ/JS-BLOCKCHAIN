import { SHA256 } from "crypto-js";
import { Transaction } from "./transaction";

export class Block {

    public heightNumber: number;
    public timestamp: Date;
    public blockHash: string;
    public previousBlockHash: string;
    public noonce: number;
    public transactionList: Array<Transaction>
    public difficulty: number;

    constructor(heightNumber:number, previousBlockHash:string, transactionList:Array<Transaction>, difficulty:number ) {

        /**
         * Creation of a timestamp for the block
         */
        this.timestamp = new Date();

        this.heightNumber = heightNumber;
        this.previousBlockHash = previousBlockHash;
        this.transactionList = transactionList;
        this.difficulty = difficulty;

        /**
         * The default noonce of most blocks is 0
         */
        this.noonce = 0;

        /**
         * Generates the hash of this block
         */
        this.blockHash = ""


    }

        /**
         * Generates hash
         */
        private  generateHashFake():string {
            //generates hash
            return ""+Math.random()*1000000000000000000;
        }

        /**
         * Generates hash
         */
        public generateHash():any {

            let contentToHash = {
                timestamp: this.timestamp,
                heightNumber: this.heightNumber,
                previousBlockHash: this.previousBlockHash,
                transactionList: this.transactionList,
                difficulty: this.difficulty,
                noonce: this.noonce,
            }

            //generates hash
            return SHA256(JSON.stringify(contentToHash)).toString()
        }

}