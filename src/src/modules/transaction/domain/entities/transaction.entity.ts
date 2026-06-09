export class TransactionEntity {
  public readonly amount: number;
  public readonly timestamp: Date;

  constructor(amount: number, timestamp: Date) {
    this.amount = amount;
    this.timestamp = timestamp;
  }
}
