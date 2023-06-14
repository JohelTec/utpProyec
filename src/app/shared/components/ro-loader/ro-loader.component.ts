import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-ro-loader',
  templateUrl: './ro-loader.component.html',
  styleUrls: ['./ro-loader.component.scss']
})
export class RoLoaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
