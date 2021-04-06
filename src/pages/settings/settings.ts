import { AlertController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})

export class SettingsPage {

    constructor(private alertCtrl: AlertController,
                private menuCtrl: MenuController) {

    }

    onToggleLights(): void {
        let alert = this.alertCtrl.create({
            title: 'Etes-vous certain(e) de vouloir continuer ?',
            subTitle: 'Cette action allumera ou éteindra toutes les lumières de la maison !',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel'
                },
                {
                    text: 'Confirmer',
                    handler: () => console.log('Confirmé !')
                }
            ]
        });
        alert.present();
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }
    
}