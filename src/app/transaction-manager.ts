import { BankTransaction } from "./bank-transaction";
const TRANSACTION_KY = 'TRANSACTION';
const COUNTER_KY = 'COUNTER';

export class TransactionManager {
        public static Transiction: BankTransaction[] = [];
        private static counter: number = 1;

        private static loadFill(): void {
                if (localStorage.getItem(TRANSACTION_KY) == null && localStorage.getItem(COUNTER_KY) == null) {
                        localStorage.setItem(TRANSACTION_KY, JSON.stringify(TransactionManager.Transiction));
                        localStorage.setItem(COUNTER_KY, JSON.stringify(TransactionManager.counter));
                }
                else {
                        try {
                                let transactionKy: any = localStorage.getItem(TRANSACTION_KY);
                                TransactionManager.Transiction = JSON.parse(transactionKy);
                                let counterKy: any = localStorage.getItem(COUNTER_KY);
                                TransactionManager.counter = JSON.parse(counterKy);
                        }
                        catch (prblm: any) {
                                localStorage.setItem(TRANSACTION_KY, JSON.stringify(TransactionManager.Transiction));
                                console.log("JSON problem: " + prblm.message);
                        }
                }
        }
        static addTransiction(transaction: BankTransaction): void {
                TransactionManager.Transiction.push(transaction);
                TransactionManager.counter++;
                localStorage.setItem(TRANSACTION_KY, JSON.stringify(TransactionManager.Transiction));
                localStorage.setItem(COUNTER_KY, JSON.stringify(TransactionManager.counter));
        }

        static allTransiction() {
                TransactionManager.loadFill();
                return TransactionManager.Transiction;
        }

        static getTransictionByCounter(counter: number): BankTransaction | undefined {
                TransactionManager.loadFill();
                for (let i = 0; i < TransactionManager.Transiction.length; i++)
                        if (TransactionManager.Transiction[i].count == counter)
                                return TransactionManager.Transiction[i];
                return undefined;
        }

        static deleteTransacionByCounter(transaction: BankTransaction): void {
                let index = TransactionManager.Transiction.indexOf(transaction);
                let type = transaction.trnTyp * 1;
                let amount = transaction.amount;
                TransactionManager.Transiction.splice(index, 1);

                for (index; TransactionManager.Transiction.length > index; index++) {
                        if (type === 1) {
                                TransactionManager.Transiction[index].balance -= amount;
                        }
                        else if (type === 2) {
                                TransactionManager.Transiction[index].balance += amount;
                        }
                }
                localStorage.setItem(TRANSACTION_KY, JSON.stringify(TransactionManager.Transiction));
        }

        static getCount(): number {
                TransactionManager.loadFill();
                return TransactionManager.counter;
        }

        // Pulls out the current amount
        static getBalance(): number {
                TransactionManager.loadFill();
                if (TransactionManager.Transiction.length === 0) {
                        return 0;
                }
                return TransactionManager.Transiction[TransactionManager.Transiction.length - 1].balance;
        }

        static getAmount(): number {
                TransactionManager.loadFill();
                if (TransactionManager.Transiction.length === 0) {
                        return 0;
                }
                return TransactionManager.Transiction[TransactionManager.Transiction.length - 1].amount;
        }

        static getDate() {
                TransactionManager.loadFill();
                if (TransactionManager.Transiction.length === 0) {
                        return 0;
                }
                return TransactionManager.Transiction[TransactionManager.Transiction.length - 1].trnDate;
        }

        static getTransactionLength(): number {
                TransactionManager.loadFill();
                return TransactionManager.allTransiction().length;
        }
}
