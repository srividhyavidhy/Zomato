import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  usersArray:any[]=[];

  selectedUser:string='';
  signupForm:any={
    "userId":"",
    "userName": "",
    "email":"",
    "password":"",
    "role":"",
    "mobileNo":"",
     
     "restaurentId":"",
     
  }
  
  constructor(private user:UsersService, private router:Router){}
  ngOnInit(): void {
    
  }
  register(){
    this.user.createUser(this.signupForm).subscribe((res:any)=>{
      
      if(res.success){
       alert("Registration successfull");
       localStorage.setItem('Zomato_User', JSON.stringify(res.data));
       this.reloadPage();
      }
      else{
       alert("Failed to create employee");
       
      }
 
    })
   
   }

   reloadPage(): void {
    window.location.reload();
  }
   }
  

