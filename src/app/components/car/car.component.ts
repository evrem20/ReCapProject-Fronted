import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[]=[];
  carDetailDtos: CarDetailDto[]=[];
  dataLoaded = false;

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCarDetailDto()
      }
    })
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars= response.data
      this.dataLoaded = true;
    })
  }

  getCarDetailDto(){
    this.carService.getCarDetailDto().subscribe(response=>{
      this.carDetailDtos= response.data
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDetailDtos= response.data
      this.dataLoaded = true;
    })
  }


  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.carDetailDtos= response.data
      this.dataLoaded = true;
    })
  }
  
}
