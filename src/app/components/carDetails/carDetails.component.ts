import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImage.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './carDetails.component.html',
  styleUrls: ['./carDetails.component.css']
})
export class CarDetailsComponent implements OnInit {

  carImages:CarImage[]=[]
  carDetailDtos: CarDetailDto[]=[]
  urlPath:string="https://localhost:44304/";



  constructor(private carImageService:CarImageService, private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {

        this.getCarDetailDtoByCarId(params['carId']);
        this.getImagesByCarId(params['carId']);
      
      }
    });
  }
  

  
  getImagesByCarId(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      this.carImages= response.data

    })
  }
  getCarDetailDtoByCarId(carId:number){
    this.carService.getCarDetailDtoByCarId(carId).subscribe(response=>{
      this.carDetailDtos= response.data;

    })
  }
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

}
