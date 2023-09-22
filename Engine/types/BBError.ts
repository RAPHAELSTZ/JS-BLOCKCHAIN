import { Transaction } from "../transaction"

export interface BlockchainBooleanError {
  success: Boolean,
  error?: string
}



export interface BlockTransactionsValid {
  blockTransactionValid: Boolean,
  transactionsInError?: Array<Transaction>
}