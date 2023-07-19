import { Block } from "./block";
import { Transaction } from "./transaction";
import sha256 from 'crypto-js/sha256';
import { BlockchainBooleanError } from "./types/BBError";


export class Blockchain {
    public DEV_MODE = true;
    public name: string;
    public chain: Array<Block> = []
    public difficulty: number = 5;
    public pendingTransactions: Array<Transaction> = []
    public miningReward: Number = 0;
    public genesis_block: {success:Boolean, error?: string, block?: Block};



    constructor(name:string){
        this.name = name;
        //Creates genesis block
        this.genesis_block = this.createGenesisBlock()
        
        //Add Genesis block to blockchain as First Block
        if(this.genesis_block.success && this.genesis_block.block) {
           let addingGenesis =  this.addBlock(this.genesis_block.block);
           if(!addingGenesis || !addingGenesis.success) console.log("Could not add Genesis to blockchain... :( ", addingGenesis)
        
        }
    }

    //Methods
    public checkBlockChain() {

    }
    //new Block(tempChainHeight, this.chain[tempChainHeight - 1], pendingTransactionArray,
    // let tempChainHeight = this.getChainHeight();

    /**
     * Setter for the pending transactions array that will hold all the transaction that
     * have yet to be included in a block on the blockchain
     * @param transactions 
     */
    public addPendingTransactions(transactions: Array<Transaction>) {
        if (this.getChainHeight() > 0) {
            this.pendingTransactions = [...this.pendingTransactions, ...transactions]
        }
        else {
            console.log("There is no genesis block on this blockchain")
        }
    }


    /**
     * Returns and display all pending Transactions
     */
    public getPendingTransactions() {
        return this.pendingTransactions;
    }

    /**
     * Creates the genesis block, which is a block of 
     * height 0. 
     */
    private createGenesisBlock(): {success:Boolean, error?: string, block?: Block} {
        console.log("Checking that the blockchain has no block");
        if (this.getChainHeight() == 0) {
            console.log("A genesis block is being created..");
            console.log("Genesis block created") 
            return { success: true, block: new Block(0, '', [], 7) }
        } else {
            let errorMessage = "You can't create two genesis blocks."
            console.log(errorMessage)
            return { success: false, error: errorMessage }
        }
    }

    public getChainHeight() {
        return this.chain.length;
    }

    /**
     * Add block to the blockchain
     */
    public addBlock(block: Block) {

        /**
         * Check that the block is well formed with data and 
         */
        try {
            let blockAddition:any = this.checkBlock(block);
            console.log("DEBUG ADDITION ", blockAddition)
            if(!blockAddition) {
                return {success: false, error: blockAddition.error}
            }
        } catch(e) {
            console.log("Error occured while checking block :", e)
            return {success: false, error: "error"}

        }

        //verif blockhash (Checks that the block has : 
        /**
         *     A valid hash with the previous block hash included + all pending transactions  
         *     a valid hash following the difficulty game with a certain number of leading 0's
         *     
         *  */
        if(!this.checksHashGame(block.blockHash, this.difficulty)) {
            console.log("The hash of your block is invalid !")
            return {success: false, error: "Hash invalid"}
        }

        console.log("Your block is valid, block pushed.")
        this.chain.push(block);
        return {success: true}
    }


    /**
     * DEBUG FUNCTION : DISPLAY BLOCKS
     */
    public displayBlocks(first: number, last: number) {
        console.log(this.chain.slice(first, last))
    }



    /**
     * Checks hash game validity
     */
    private checksHashGame(hash: string, difficulty:number): Boolean | BlockchainBooleanError{
        if(this.DEV_MODE) return true;

        for (let i = 0; i < difficulty; i++) {
            if (hash[i] !== '0') {
                return false;
            }
        }
        return true;
    }

    private checkBlock(block:Block): Boolean| BlockchainBooleanError{
        // const hashBlock = sha256(nonce + message);

        //Checking structure :
        if(!this.hasThoseProperties(block, ["heightNumber","timestamp","blockHash","previousBlockHash","noonce","transactionList","difficulty"])) {
            return { success: false, error: 'Block structure invalid ! ' };

        } 

        console.log("BLOCK EVALUATED :" , block)

        let hasValues = this.hasValuesInProperties(block);
        if(!hasValues.success){
            console.log("HAS VALUES DEBUG :", hasValues)
            return { success: false, error: "Fatal Error:" + hasValues.error}
        }

        //Checking necessary values: 
        //The index of the block is greater than the current size of the blockchain
        if(!(block.heightNumber > this.chain.length-1)){
        return { success: false, error: 'Block height is below blockchain peak index'}
        }
        
        //Timestamp of the block must be greater than right now, and later than the last block mined (TO IMPROVE, example global Date rather than date())
        if(block.timestamp > new Date()) {
        return { success: false, error: 'Timestamp for block is invalid' }
        }

        //Checking that previous blockhash is actually the previous block hash
        let tempChainHeight = this.getChainHeight();
        if(tempChainHeight > 1 && block.previousBlockHash != this.chain[tempChainHeight - 1].blockHash) {
            return { success: false, error: "Previous blockhash is not correct"}
        }

        
        //Checks structure:
        
        return true;
    }


    /**
     * 
     * @para(m properties Check)s if an object struvture is
     * @returns 
     */
    private hasThoseProperties(block:Block, properties: Array<string>):Boolean {
        return properties.every ( (prop) => block.hasOwnProperty(prop))
    }

    
    private hasValuesInProperties(block: Block):{ success: Boolean, error?: string }{
        console.log("DEBUG HEIGHT : ", block)
        if(block.heightNumber == null || block.heightNumber < 0) return { success: false, error: 'This block has a wrong height number'}
        if(!block.timestamp ) return { success: false, error: "This block has a wrong/bad format timestamp"}
        if(!block.blockHash && block.heightNumber !=0) return { success: false, error: "This block does not have a blockhash"}
        if(!block.previousBlockHash && block.heightNumber !=0) return { success: false, error: "This block does not hold a previousBlockhash"}
        if(!block.noonce && block.heightNumber !=0) return { success: false, error: "This block has no noonce.."}
        if(!block.transactionList) return { success: false, error: "This block holds no transaction, or has a bad transaction List"}
        if(!block.difficulty) return { success: false, error: "This block has no difficulty"}

        return { success: true}

    }


}