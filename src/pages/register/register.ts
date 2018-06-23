import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { PetPage } from '../pet/pet'
import { ProfilePage } from '../profile/profile';
import { WalksPage } from '../walks/walks'
import * as firebase from 'firebase'
import '@firebase/firestore'


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	name : string
	email : string 
	phone : any
	address : string 
	zip : number
  state : string
  startPage : string;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private storage : Storage,
  	public platform : Platform ) {

      this.startPage = navParams.get('startPage');

  		this.platform.ready().then(() => {

  			this.storage.get('phone')
  			.then((phone) => this.phone = phone)
  			.catch((err) => console.log(err))

  		})

  		
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {

  	let _id = (Date.now()).toString()

  	let firestore = firebase.firestore()

  		let client = {
  		   name : this.name,
           email : this.email,
           phone : this.phone,
           client_id : _id,
           address : this.address,
           zip : this.zip,
  		}


         firestore.collection('users').doc(_id).set({
           name : this.name,
           email : this.email,
           phone : this.phone,
           client_id : _id,
           address : this.address,
           zip : this.zip,
         })
         .then(() => {

            //this.storage.set('client', client)
            localStorage.setItem('client', JSON.stringify(client))
            if(this.startPage != "walker"){
              if(this.startPage == "profile"){
                this.navCtrl.push(ProfilePage)
              }
              if(this.startPage == "walks"){
                this.navCtrl.push(WalksPage)
              }
            }
            this.navCtrl.push(PetPage)
 
         })
         .catch((err) => console.log(err))
  }

}
