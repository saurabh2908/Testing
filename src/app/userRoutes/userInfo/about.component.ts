import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
   styleUrls: ['./component.css']
})

export class AboutComponent implements OnInit {
  
  regiterForm:FormGroup;
  blackListedUsers:string[] = ["tim","kim","rim","sim"];

  ngOnInit(){
      this.regiterForm = new FormGroup({
        'userInfo': new FormGroup({
           'username':new FormControl(null,[Validators.required,this.checkUsers.bind(this)]),
            'email':new FormControl(null,[Validators.required,Validators.email],)
        })
       ,
        
      });
  }

 doRegister(){
   console.log("Form Submitted Call ",this.regiterForm);
 }
 checkUsers(control:FormControl):{[key:string]:boolean}{
  if(this.blackListedUsers.indexOf(control.value)!==-1){
    return {'blackListed':true};
  }
  return null;  // if validation is pass , return null
}

}