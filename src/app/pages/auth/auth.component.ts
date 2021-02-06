import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PhoneModel } from 'src/app/models/phone.model';
import { RequestService } from '../../services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  phone: PhoneModel = new PhoneModel();
  showFormPin = false;

  constructor(private requestService: RequestService,
    private router: Router) { }

  ngOnInit(): void {
  }

  continueProcess(form: NgForm): void{
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.showModalPhoneNumber();


  }

  showModalPhoneNumber() {
    const swalSendNumber = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger ml-3',
        cancelButton: 'btn btn-light mr-3'
      },
      buttonsStyling: false
    });
    swalSendNumber.fire({
      html: '<i class="fas fa-sms"></i> <br>'+
      '<p> A continuación te enviaremos un SMS con un código de verificaciónpara validartu número de celular </p>'+
      `Si tu número claro es ${this.phone.numberPhone} pulsa "Aceptar"`,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Editar',
      reverseButtons: true
    }).then( resp => {
      if (resp.value) {
        this.sendPhoneNumber();
      }
    });
  }

  sendPhoneNumber(){
    this.requestService.sendPhoneNumber(this.phone).subscribe(resp => {
      console.log(resp);
      Swal.fire({
        icon: 'info',
        text: ' Código de verificación enviado. Por favor espera, puede tardar hasta un minuto',
        timer: 5000,
        showConfirmButton: false,
        iconColor: '#DC3545'
      }).then( () => {
        this.showFormPin = true;
      });
    }, error => {
      console.error('Error envíando número de télefono', error);
    });
  }

  sendPin(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.requestService.getPin(this.phone.pin).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/home']);
    }, error => {
      console.error('Error consultando pin', error);
    });
  }

}
