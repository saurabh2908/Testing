import { Component } from '@angular/core';
import { AuthService} from '../../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
  
})
 
export class LoginComponent {
  
  constructor(private Auth:AuthService,private router:Router){}
  title = 'angularRxForm';
  loginUser(event){
    event.preventDefault();
    const target= event.target;
    const email= target.querySelector("#email").value;
    const password= target.querySelector("#password").value;
    console.log("email is ",email, "pasword is ",password);
    this.Auth.getUser(email,password).subscribe((data:any)=>{
      if(data.message){
        this.router.navigate(['register']);
        this.Auth.setLoggedIn(true);
          console.log(data);
      }
      else{
    console.log(data.err);
      }
    })

  }
}
