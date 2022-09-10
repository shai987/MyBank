import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccountDetails } from '../bank-account-details';
import { TransactionType, BankTransaction } from '../bank-transaction';
import { EditBankBranchComponent } from '../edit-bank-branch/edit-bank-branch.component';
import { MenuComponent } from '../menu/menu.component';
import { TransactionManager } from '../transaction-manager';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})

export class BankAccountComponent implements OnInit {
  obj = [
    { id: 0, name: 'openAcount' }, { id: 1, name: 'deposit' }, { id: 2, name: 'withdraw' }
  ]
  currentAmount: number = 0;
  currentBalance: number = 0;
  transaction?: BankTransaction = undefined;
  accountDetails: BankAccountDetails;
  currentTransactionType: TransactionType = -1;
  currentTransactionAsmachta: string = "";
  note: string = '';
  currentTransactionDateS: string = "";
  lastActionFail: boolean = false;
  transactionLengthBool: boolean = false;

  constructor(private router_srv: Router) {
    this.accountDetails = EditBankBranchComponent.getBankAccountDetails()
    if (TransactionManager.getTransactionLength() > 0) {
      this.transactionLengthBool = true;
    }
    this.currentBalance = TransactionManager.getBalance();
    MenuComponent.setShouldAppered(true);
  }

  getArrayLength(): number {
    return TransactionManager.getTransactionLength();
  }

  getMin(): string {
    if (this.getArrayLength() === 0) {
      return '0';
    }
    else {
      // return '0.01';
      return '1';

    }
  }

  doTransaction(): void {
    this.lastActionFail = false;
    if (this.getArrayLength() === 0) {
      if (this.currentAmount == null || this.currentAmount < 0) {
        showErrorFocus("The amount of opening an account must be a non-negative number", "amount");
        return;
      }
    }
    else {
      if (this.getArrayLength() !== 0) {
        if (this.currentAmount == null || this.currentAmount <= 0) {
          showErrorFocus("Deposit or withdraw must be greater than zero", "amount");
          return;
        }
      }
    }

    if (this.currentTransactionAsmachta.trim() === "") {
      this.currentTransactionAsmachta = `#${TransactionManager.getCount()}`;
    }

    if (this.currentTransactionAsmachta !== `#${TransactionManager.getCount()}` && this.currentTransactionAsmachta.trim().length < 4) {
      showErrorFocus("You must enter at least 4 characters", "asmachta");
      return;
    }

    if (this.currentTransactionDateS == "") {
      showErrorFocus("You must enter a date", "taarich");
      return;
    }

    let achshav: Date = new Date();
    let typedDt: Date = new Date(this.currentTransactionDateS);
    // console.log(typedDt != achshav);
    // console.log(achshav, typedDt);
    if (typedDt > achshav) {
      showErrorFocus("Date later than today is not allowed", "taarich");
      return;
    }
    let dateTra: Date = new Date(TransactionManager.getDate());
    if (dateTra > typedDt) {
      showErrorFocus(`It is required to enter a transaction date that will be equal or later than the date - ${dateTra.toLocaleDateString()} which was entered in the last transaction.`, "taarich");
      return;
    }

    if (!this.transactionLengthBool && this.currentTransactionType * 1 === 1) {
      showErrorFocus("The first action must be opening an account", "sugpeula");
      this.currentTransactionType = 0;
      this.note = 'Deposit action converted to account opening action';
    }
    else if (this.transactionLengthBool && this.currentTransactionType * 1 === 0) {
      showErrorFocus("This action isn't allowed, can only be selected once when opening an account", "sugpeula");
      return;
    }

    switch (this.currentTransactionType * 1) {
      case TransactionType.openAcount: this.currentBalance = this.currentAmount;
        break;
      case TransactionType.deposit: this.currentBalance += this.currentAmount;
        break;
      case TransactionType.withdraw: if ((this.currentBalance - this.currentAmount) < this.accountDetails.limit) {
        this.lastActionFail = true;
        return;
      }
        this.currentBalance -= this.currentAmount;
        break;
      default: showErrorFocus("You haven't selected an action type", "sugpeula");
        return;
    }

    TransactionManager.getTransactionLength();
    this.transaction = new BankTransaction(this.currentAmount, new Date(this.currentTransactionDateS), this.currentTransactionAsmachta.trim(), this.currentTransactionType, this.currentBalance, TransactionManager.getCount(), this.note);
    TransactionManager.addTransiction(this.transaction);
    this.transactionLengthBool = true;
    this.currentTransactionAsmachta = "";
    this.note = '';
    this.currentTransactionType = -1;
    this.currentAmount = 0;
    this.currentTransactionDateS = '';
  }

  toString(): string {
    let ezer = `${this.transaction} into ${this.accountDetails}`;
    return ezer;
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }
  }

  logOut(): void {
    UserManager.byeUser();
    this.router_srv.navigateByUrl('/AccountLogin');
  }

}
export function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}