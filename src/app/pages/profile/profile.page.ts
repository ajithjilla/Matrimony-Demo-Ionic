import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FireService } from 'src/app/_common/_services/fire.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  profiles: any;

  constructor(
    private route: ActivatedRoute,
    private fireService: FireService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.profileId) {
        this.getProfilesByMid(+params.profileId)
      }
    });
  }

  getProfilesByMid(profileId: number) {
    this.fireService.getProfilesByMid(profileId).subscribe(data => {
      let res  = data;
      this.profiles = res;
      });
  }

}
