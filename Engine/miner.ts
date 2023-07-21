import { SHA256 } from "crypto-js"

export class Miner {


    private hashedData:string;
    private SHOW_HASH_SEARCH:Boolean = false;

    constructor() {
        this.hashedData = ''
        console.log("Welcome to EclateMinor1.0, the worst minor ever")
    }




    /**
 * Generates hash
 */
    public generateHash(blockData: any): string {

        let data = {
            timestamp: blockData.timestamp,
            heightNumber: blockData.heightNumber,
            previousBlockHash: blockData.previousBlockHash,
            transactionList: blockData.transactionList,
            difficulty: blockData.difficulty,
            noonce: blockData.noonce
        }


        console.log("===============================================")
        console.log("==== Starting MINER ===========================")
        console.log("===============================================")



        this.hashedData = SHA256(JSON.stringify(data)).toString()

        while(!this.checkLeadingZeros(this.hashedData, data.difficulty)) {
            data.noonce++;
            this.hashedData = SHA256(JSON.stringify(data)).toString();
            if(this.SHOW_HASH_SEARCH) console.log("Attempt with ", this.hashedData, "Noonce :", data.noonce)
        }

        console.log("==== BLOCK MINED !! ====")
        console.log("==== NOONCE = "+ data.noonce)
        console.log(" FINAL HASH : "+ this.hashedData )
        console.log("========================")


        return this.hashedData
    }

              

    checkLeadingZeros(hash:string, diff:number) {

        for (let i = 0; i < diff; i++) {
            if (hash[i] !== '0') {
                return false;
            }
        }

        return true

    }
            

}