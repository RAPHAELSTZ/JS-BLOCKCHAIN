import { SHA256 } from "crypto-js";

export class Transaction {

    senderAddress: string;
    receiverAddress: string;
    transactionAdditionalData: string;
    amountInSatoshi: number;
    transactionHash: string;


    constructor(senderAddress: string,
                receiverAddress: string, 
                transactionAdditionalData: string,
                amountInSatoshi: number) {

            this.senderAddress = senderAddress;
            this.receiverAddress = receiverAddress;
            this.amountInSatoshi = amountInSatoshi;
            this.transactionAdditionalData = transactionAdditionalData;

            this.transactionHash = SHA256(
               JSON.stringify( {
                    senderAddress: this.senderAddress,
                    receiverAddress: this.receiverAddress,
                    transactionAdditionData: this.transactionAdditionalData,
                    amountInSatoshi: this.amountInSatoshi
                })
            ).toString();


            console.log(" ==> Hash generated for transaction :  ",   {
                senderAddress: this.senderAddress,
                receiverAddress: this.receiverAddress,
                transactionAdditionData: this.transactionAdditionalData,
                amountInSatoshi: this.amountInSatoshi
            },  this.transactionHash)
            
    }



    



}