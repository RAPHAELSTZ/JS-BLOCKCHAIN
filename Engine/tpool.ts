import { Blockchain } from "./blockchain";
import { Transaction } from "./transaction";

export class Tpool {
    private pendingTransactions: Transaction[] = [];



    constructor(private blockchain: Blockchain) {

    }

    /**
     * Setter for the pending transactions array that will hold all the transaction that
     * have yet to be included in a block on the blockchain
     * @param transactions 
     */
    public addPendingTransactions(transactions: Array<Transaction>) {
        if (this.blockchain.getChainHeight() > 0) {
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
     * Remove transaction by hash
     */
    private removeTransaction(transactionHash: string) {
    }


    /**
     * Fetch transactions by decreasing fees
     */
    private fetchTransactions() {

    }



    /**
     * The pool needs to updated according to what's been added to the blockchain
     */
    private updatePool() {
    }





}