import { Component, OnInit } from '@angular/core';
import { GifsService } from '@app/core/services/gifs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  searchHistory: string[] = [];
  cardsData: any[] = [];
  pagedCardsData: any[] = [];
  pageSize: number = 12;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  searchQuery: string = '';

  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {
    this.getTrendingGifs();
  }

  getTrendingGifs(): void {
    this.gifsService.getTrendingGifs().subscribe(
      (data: any) => {
        this.cardsData = data.data;
        this.totalPages = Math.ceil(this.cardsData.length / this.pageSize);
        this.setPage(1);
      },
      (error) => {
        console.error('Error obteniendo gifs:', error);
      }
    );
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.cardsData.length
    );
    this.pagedCardsData = this.cardsData.slice(startIndex, endIndex);
    this.calculatePages();
  }

  calculatePages(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setCurrentPage(page: number): void {
    this.setPage(page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  search(): void {
    if (this.searchQuery.trim() !== '') {
      this.gifsService.searchGifs(this.searchQuery).subscribe(
        (data: any) => {
          
          this.cardsData = data.data;
          this.totalPages = Math.ceil(this.cardsData.length / this.pageSize);
          this.setPage(1);

          this.addToSearchHistory(this.searchQuery);

        },
        (error) => {
          console.error('Error searching gifs:', error);
        }
      );
    } else {
      this.getTrendingGifs();
    }
  }

  addToSearchHistory(query: string): void {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.push(query);
    }
  }

  repeatSearch(query: string): void {
    this.searchQuery = query;
    this.search();
  }
}
