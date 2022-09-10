import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showErrorFocus } from '../bank-account/bank-account.component';
import { MenuComponent } from '../menu/menu.component';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  crntPwd: string = "";
  nwPwd: string = "";
  nw2Pwd: string = "";
  jobDone: boolean = false;
  constructor(private router_srv: Router) {
    MenuComponent.setShouldAppered(false);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn())
      this.router_srv.navigateByUrl('/AccountLogin');
  }

  updIt(): void {
    this.jobDone = false;
    // סיסמא נוכחית
    if (this.crntPwd.trim() === "") {
      showErrorFocus("The current password field is empty", "crntpwd");
      return;
    }
    if (this.crntPwd.trim().length < 4) {
      showErrorFocus("The current password field must be 4 numbers long", "crntpwd");
      return;
    }
    if (!UserManager.isPwdOk(this.crntPwd.trim())) {
      showErrorFocus("Current password incorrect", "crntpwd");
      return;
    }

    // New password
    if (this.nwPwd.trim() === "") {
      showErrorFocus("New password field is empty", "nwpwd");
      return;
    }
    if (this.nwPwd.trim().length < 4) {
      showErrorFocus("The new password field must be 4 numbers long", "nwpwd");
      return;
    }

    // Verifying new password
    if (this.nw2Pwd.trim() === "") {
      showErrorFocus("The verifying password field is empty", "nw2pwd");
      return;
    }
    if (this.nw2Pwd.trim().length < 4) {
      showErrorFocus("The verifying password field must be 4 numbers long", "nw2pwd");
      return;
    }
    if ((this.nwPwd.trim() !== this.nw2Pwd.trim())) {
      showErrorFocus("New password as well as verification password must be the same", "nw2pwd");
      return;
    }
    if ((this.crntPwd.trim() === this.nwPwd.trim())) {
      showErrorFocus("New password must be different from the current password", "nwpwd");
      return;
    }
    this.jobDone = true;
    UserManager.changePwd(this.nwPwd.trim());
  }
}
