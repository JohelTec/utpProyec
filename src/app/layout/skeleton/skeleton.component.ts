import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@app/shared/services/auth.service';
@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  isLogged:any;
  constructor(
    public authService: AuthService,
    private readonly store: Store<any>
  ) { }

  ngOnInit(): void {
    this.isLogged = this.authService.getSesionStorage('token') !== null ;
    if(this.isLogged){
      // this.store.dispatch(new HomeAction.Loguin());
    }
  }
  

}
