import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankTransaction, TransactionType } from '../bank-transaction';
import { MenuComponent } from '../menu/menu.component';
import { TransactionManager } from '../transaction-manager';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-list-of-transactions',
  templateUrl: './list-of-transactions.component.html',
  styleUrls: ['./list-of-transactions.component.css']
})
export class ListOfTransactionComponent implements OnInit {
  public arrayTransiction: BankTransaction[] = TransactionManager.Transiction;
  public selectedTransaction?: BankTransaction;
  transactionTypeNames: string[] = [];

  constructor(private router_srv: Router) {
    MenuComponent.setShouldAppered(true);

    for (let optn in TransactionType) {
      if (isNaN(Number(optn))) {
        this.transactionTypeNames.push(optn);
      }
    }
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }
    this.arrayTransiction = TransactionManager.allTransiction();
  }
  transictoinSelected(r: BankTransaction) {
    this.selectedTransaction = r;
  }

}
