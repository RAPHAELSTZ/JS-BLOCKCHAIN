import { Blockchain } from "./blockchain";
import { Transaction } from "./transaction";
// import { Inject } from '@angular/core';


export class Wallet {
    
    //Add angular and then use this..
    // @Inject(Blockchain) private blockchain:Blockchain;

    constructor(
        public blockchain: Blockchain,
        public publicAddress: string
    ){

    }


    /**
     * Validates transactions against double spending, signature
     */
    public getUserBalance(publicAddress=this.publicAddress):number {
        // Calculating balance
        let blockAnalyzed = 0;
        let senderBalance: number = 0;
    
        console.log ("Block analyzed :", blockAnalyzed); 
        blockAnalyzed +=1;
        this.blockchain.chain.forEach(block => {
            block.transactionList.forEach(
                (transaction: Transaction) => {
                    //Getting sender wallet balance
                    let senderPublicAddress = transaction.senderAddress;
    
                    //If the transaction was targetting the sender add up this received amount
                    if (transaction.receiverAddress == publicAddress)
                        senderBalance += parseInt(''+transaction.amountInSatoshi)
    
                    if (transaction.senderAddress == publicAddress)
                        senderBalance -= parseInt(''+transaction.amountInSatoshi)
                }
            )
        });
        console.log("Sender's balance is : " + senderBalance+ " Satoshi.");
        return senderBalance;
    }





    

}


