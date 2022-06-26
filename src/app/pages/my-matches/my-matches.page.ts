import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { FireService } from 'src/app/_common/_services/fire.service';
import { Globals } from 'src/app/_common/globals';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {

  public profiles : any;

  constructor(
    private router: Router,
    private globals: Globals,
    private fireService: FireService,
    public loadingController: LoadingController
  ) { }

   ngOnInit() {

    this.profiles = this.globals.profiles;
    if(!this.globals.profiles) {
      this.presentLoading();
      this.getProfiles();
    }
    
   }

   getProfiles() {
    this.fireService.getProfiles().subscribe(data => {
      let res  = data;
      this.globals.profiles = res;
      this.profiles = res;
      });
   }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  showProfile(profileId: number) {
    const params: NavigationExtras = {
      queryParams: { profileId }
    };
    this.router.navigate(['/profile'], params);
  }

}
