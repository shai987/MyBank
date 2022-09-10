import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankTransaction } from '../bank-transaction';
import { MenuComponent } from '../menu/menu.component';
import { TransactionManager } from '../transaction-manager';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  transiction?: BankTransaction;

  constructor(private route: ActivatedRoute, private router_srv: Router) {
    MenuComponent.setShouldAppered(false);
  }

  ngOnInit(): void {
    // Taking the address of the URL 
    const count = this.route.snapshot.paramMap.get('count');
    if (count) {
      this.transiction = TransactionManager.getTransictionByCounter(Number(count));
    }

    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }
  }

  deleteTransiction(): void {
    if (this.transiction) {
      let text = "You must press one of the buttons!\nThe confirmation button will delete your transaction.\nThe cancel button will leave you on the traffic details page.";
      if (confirm(text) == true) {
        if (this.transiction?.count !== 1 || this.transiction?.trnTyp * 1 !== 0) {
          alert("Your deletion was successful!");
          TransactionManager.deleteTransacionByCounter(this.transiction);
          this.router_srv.navigateByUrl('/ListOfTransaction');
        }
        else {
          alert("You can't delete the account opener action!!!");
        }
      }
      else {
        alert("You stayed on the page!");
      }
    }
  }
}
