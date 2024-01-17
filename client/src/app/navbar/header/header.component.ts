import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn : boolean = false;
  userInfo:any;
  constructor(){
      const userData = localStorage.getItem('Zomato_User');
      if(userData == null) {
        this.isLoggedIn = false;
        
      } else {
        this.isLoggedIn = true;
        this.userInfo = JSON.parse(userData);
       
      }

  }
ngOnInit(): void {
 
}
  Logoff(){
    localStorage.removeItem('Zomato_User')
    this.isLoggedIn = false;
  }


}