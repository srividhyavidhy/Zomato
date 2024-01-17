import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm : any ={
    "email":"",
    "password":""
  }
constructor(private user:UsersService, private router:Router ){}
ngOnInit(): void {
  
}
onLogin(){
  this.user.loginUser(this.loginForm).subscribe((res:any)=>{
    
    if(res.success){
     alert("Login successfull");
     localStorage.setItem('Zomato_User', JSON.stringify(res.data));
     this.reloadPage();
    }
    else{
     alert("Failed to login employee");
     
    }

  })

 }
 reloadPage(): void {
  window.location.reload();
}
}

