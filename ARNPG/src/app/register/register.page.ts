import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email requerido' },
     { type: 'pattern', message: 'Por favor ingresar un email valido' }
   ],
   'password': [
     { type: 'required', message: 'Contraseña requerida' },
     { type: 'minlength', message: 'La contraseña debe contener al menos 6 caracteres' }
   ],
   'cpassword': [
     { type: 'required', message: 'Confirmacion requerida'}
   ]
 };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      cpassword: new FormControl('', Validators.compose([
        //Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  tryRegister(value){
    if (value.password == value.cpassword){
      this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
    }
    else {
      this.errorMessage = "La confirmación no coincide con la contraseña";
    }
  }

  goLoginPage(){
    this.navCtrl.navigateBack('');
  }


}