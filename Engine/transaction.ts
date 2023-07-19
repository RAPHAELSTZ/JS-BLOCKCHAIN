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
            this.transactionHash = Math.random()*100000000000+'';
            
    }



    



}