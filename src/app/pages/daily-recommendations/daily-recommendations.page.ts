import { AnimationController, GestureController, IonCard, Platform } from '@ionic/angular';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

import { Globals } from 'src/app/_common/globals';
import { ToastService } from '../../_common/_services/toast.service';

@Component({
  selector: 'app-daily-recommendations',
  templateUrl: './daily-recommendations.page.html',
  styleUrls: ['./daily-recommendations.page.scss'],
})
export class DailyRecommendationsPage implements OnInit {

  @ViewChildren(IonCard, { read: ElementRef }) data: QueryList<ElementRef>;

  profiles : any = []
  public xAxis: any;
  public yAxis: any;

  private unlistener: () => void;

  constructor(
    private gestureCtrl: GestureController,
    private toast: ToastService,
    private platform: Platform,
    private renderer2: Renderer2,
    private animationCtrl: AnimationController,
    private globals: Globals
  ) {

  }

  async ngOnInit() {
    this.profiles  = this.globals.profiles;
  }

  ionViewDidEnter() {
    const data = this.data.toArray();
    this.swipe(data);
  }

  swipe(data) {
    data.forEach((data: ElementRef) => {
      const card = data;
      this.xAxis = this.gestureCtrl.create({
        direction: 'x',
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'my-gesture',
        onStart: (elm) => {
          console.log(elm);
        },
        onMove: (elm) => {
          console.log(elm.deltaX);
          card.nativeElement.style.transform = `translateX(${elm.deltaX}px) rotate(${elm.deltaX / 10}deg)`;
        },
        onEnd: (elm) => {
          card.nativeElement.style.transition = '.5s ease-out';
          //Right side Move
          if (elm.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${+this.platform.width() * 2
              }px) rotate(${elm.deltaX / 2}deg)`;
            this.toast.success('Interested');
          }
          // Left Side Move
          else if (elm.deltaX < -150) {
            card.nativeElement.style.transform = `translateX(-${+this.platform.width() * 2
              }px) rotate(${elm.deltaX / 2}deg)`;
            this.toast.error('Not Interested');
          }
          // When No move or if small move back to original
          else {
            card.nativeElement.style.transform = '';
          }
        },
      });
      this.yAxis = this.gestureCtrl.create({
        direction: 'y',
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'my-gesture',
        onStart: (elm) => {
          console.log(elm);
        },
        onMove: (elm) => {
          ;
          card.nativeElement.style.transform = `translateY(${elm.deltaY}px) rotate(${elm.deltaY / 10}deg)`;
        },
        onEnd: (elm) => {
          card.nativeElement.style.transition = '.5s ease-out';
          if (elm.deltaY < 0) {
            card.nativeElement.style.transform = `translateY(-${+this.platform.width() * 2
              }px) rotate(${elm.deltaY / 2}deg)`;
            this.toast.success('Shortlisted');
          }
          else {
            card.nativeElement.style.transform = '';
          }
        },
      });
      this.yAxis.enable(true);
      this.xAxis.enable(true);

      this.unlistener = this.renderer2.listen(card.nativeElement.querySelector('.shortListed'), 'click', elm => {
        const animation = this.animationCtrl
          .create()
          .addElement(card.nativeElement)
          .duration(1500)
          .fromTo('transform', `rotate(50deg)`, `translateY(-${+this.platform.width() * 2}px)`);
        animation.play();
        this.shortListed();
      });

      this.unlistener = this.renderer2.listen(card.nativeElement.querySelector('.profileStatusTrue'), 'click', elm => {
        const animation = this.animationCtrl
          .create()
          .addElement(card.nativeElement)
          .duration(1500)
          .from('transform', `rotate(40deg)`)
          .to('transform', `translateX(${+this.platform.width() * 2}px)`);
        animation.play();
        this.preference(true);
      });

      this.unlistener = this.renderer2.listen(card.nativeElement.querySelector('.profileStatusFalse'), 'click', elm => {
        const animation = this.animationCtrl
          .create()
          .addElement(card.nativeElement)
          .duration(1500)
          .from('transform', `rotate(40deg)`)
          .to('transform', `translateX(-${+this.platform.width() * 2}px)`);
        animation.play();
        this.preference(false);
      });
    });
  }

  shortListed() {
    this.toast.success('Shortlisted');
  }

  preference(status: boolean) {
    if (status) {
      this.toast.success('Interested');
    } else {
      this.toast.error('Not Interested');
    }
  }

}
