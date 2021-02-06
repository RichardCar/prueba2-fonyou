import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CarouselModel } from 'src/app/models/carousel.model';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  templateModal: any;
  dataCarousel: CarouselModel[] = [];

  constructor(private requestService: RequestService) {
    this.setDataCarousel();
    this.getTemplateModal();
    
  }

  ngOnInit(): void {
    
    setTimeout(() => {
      $('.carousel').carousel({
        interval: 2000
      });
    }, 100);
    
  }

  setDataCarousel(): void {
    this.requestService.getJson('plans_mobile').subscribe((resp: any) => {
      console.log(resp);
      this.dataCarousel = resp.plans;
    }, error => {
      console.error('Error obteniendo json data', error);
    });
  }

  getTemplateModal(): void {
    this.requestService.getTemplate('templateModal').subscribe(resp => {
      this.templateModal = resp;
    }, error => {
      console.error('Error obteniendo template data', error);
    });
  }

  buyPlan(plan?): void{
    Swal.fire({
      html: this.templateModal,
      showConfirmButton: false,
    });
  }

}
