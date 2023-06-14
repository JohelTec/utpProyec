import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  register(){
    // this.auth.signInWithPopup(this.fbProvider)
    // .then(result => {
    //   console.log("result", result);
    //   // this.auth.setPersistence;
    //   PERSISTENCE
    //   if(result && result.user) {
    //     const data = {
    //       name: result.user.displayName.split(' ')[0],
    //       lastname: result.user.displayName.split(' ')[1],
    //       email: result.user.email,
    //       password: result.user.uid,
    //       description: "Creación por facebook",
    //       urlImage: result.user.photoURL
    //     };
        
    //     console.log("data", data);
    //     this.authService.registerFB(data).subscribe(res => {
    //       if(res){
    //         this.authService.setSesionStorage('token', res.token )
    //       }
    //     });
    //   }
    // })
    // .catch(err => {
    //   console.log(err.message);
    // })
  }

}
