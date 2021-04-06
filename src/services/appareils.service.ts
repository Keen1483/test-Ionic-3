import { Appareil } from '../models/appareil';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import Datasnapshot = firebase.database.DataSnapshot;

export class AppareilsService {

    appareils$ = new Subject<Appareil[]>();

    appareilsList: Appareil[] = [
        {
          name: 'Machine à laver',
          description: [
            'Volume: 6 litres',
            'Temps de lavage: 2 heures',
            'Consommation: 173 kWh/an'
          ],
          isOn: true,
          startTime: '',
          endTime: ''
        },
        {
          name: 'Télévision',
          description: [
            'Dimensions: 40 pouces',
            'Consommation: 22 kWh/an'
          ],
          isOn: true,
          startTime: '',
          endTime: ''
        },
        {
          name: 'Ordinateur',
          description: [
            'Marque: fait maison',
            'Consommation: 500 kWh/an'
          ],
          isOn: false,
          startTime: '',
          endTime: ''
        }
    ];

    emitAppareils() {
        this.appareils$.next(this.appareilsList.slice());
    }

    addAppareil(appareil: Appareil) {
        this.appareilsList.push(appareil);
        this.emitAppareils();
    }

    saveData() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('appareils').set(this.appareilsList).then(
                (data: Datasnapshot) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    retrieveData() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('appareils').once('value').then(
                (data: Datasnapshot) => {
                    this.appareilsList = data.val();
                    this.emitAppareils();
                    resolve('Données récupérées avec succèes');
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}