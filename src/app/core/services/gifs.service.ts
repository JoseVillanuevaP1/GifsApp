import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  
  private trendingUrl = 'https://api.giphy.com/v1/gifs/trending';
  private searchUrl = 'https://api.giphy.com/v1/gifs/search';
  private apiKey = 'RzSrFbm1ZcGxNa4BKl0iVstUQrG7llul';

  constructor(private http: HttpClient) {}

  getTrendingGifs(): Observable<any> {
    const url = `${this.trendingUrl}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  searchGifs(query: string): Observable<any> {
    const url = `${this.searchUrl}?api_key=${this.apiKey}&q=${query}`;
    return this.http.get(url);
  }
  
}
