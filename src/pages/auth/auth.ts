import { Component, OnInit } from '@angular/core';
import { NavParams, MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

    mode: string;
    authForm: FormGroup;
    errorMessage: string;

    constructor(private navParams: NavParams,
                private navCtrl: NavController,
                private authService: AuthService,
                private menuCtrl: MenuController,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.mode = this.navParams.get('mode');
        this.initForm();
    }

    initForm() {
        this.authForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }

    onSubmitForm() {
        const email = this.authForm.get('email').value;
        const password = this.authForm.get('password').value;
        if (this.mode === 'new') {
            this.authService.signUpUser(email, password).then(
                () => {
                    this.navCtrl.setRoot(TabsPage);
                },
                (error) => {
                    this.errorMessage = error;
                }
            );
        } else if (this.mode === 'connect') {
            this.authService.signInUser(email, password).then(
                () => {
                    this.navCtrl.setRoot(TabsPage);
                },
                (error) => {
                    this.errorMessage = error;
                }
            );
        }
    }

}
