import { Component, OnInit } from '@angular/core';
import { GifsService } from '@app/core/services/gifs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {
    this.getTrendingGifs();
  }

  getTrendingGifs(): void {
    this.gifsService.getTrendingGifs().subscribe(
      (data: any) => {
        this.gifsService = data.data;
        console.log(this.gifsService);
      },
      (error) => {
        console.error('Error obteniendo trending gifs:', error);
      }
    );
  }
}
