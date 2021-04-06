import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Appareil } from '../../../models/appareil';
import { AppareilsService } from '../../../services/appareils.service';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SingleAppareilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-appareil',
  templateUrl: 'single-appareil.html',
})
export class SingleAppareilPage implements OnInit {

    appareil: Appareil;
    index: number;

    constructor(public viewCtrl: ViewController,
                public navParams: NavParams,
                private appareilsService: AppareilsService) {
    }

    ngOnInit(): void {
        this.index = +this.navParams.get('index');
        this.appareil = this.appareilsService.appareilsList[this.index];
    }

    dismissModal() {
        this.viewCtrl.dismiss();
    }

    onToggleAppareil() {
        this.appareil.isOn = !this.appareil.isOn;
    }

    onSubmitForm(form: NgForm) {
        console.log(form.value);
        this.dismissModal();
    }

    onDeleteHours() {
        this.appareil.startTime = '';
        this.appareil.endTime = '';
        this.dismissModal();
    }

}
