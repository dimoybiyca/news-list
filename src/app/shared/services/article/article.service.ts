import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TArticle } from '../../types/article-type';
import { TGetArticlesResponse } from '../../types/get-articles-response.type';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http: HttpClient = inject(HttpClient);

  getArticles(search?: string): Observable<TGetArticlesResponse> {
    let params = new HttpParams();
    params = params.set('limit', 9);
    search && (params = params.set('search', search ?? ''));

    return this.http
      .get<TGetArticlesResponse>(
        'https://api.spaceflightnewsapi.net/v4/articles',
        { params }
      )
      .pipe(
        map(this.truncateSummary),
        map((response) => this.sortArticles(response, search ?? ''))
      );
  }

  getArticle(id: number): Observable<TArticle> {
    return this.http.get<TArticle>(
      `https://api.spaceflightnewsapi.net/v4/articles/${id}`
    );
  }

  getNextPage(next: string, search?: string): Observable<TGetArticlesResponse> {
    return this.http.get<TGetArticlesResponse>(next).pipe(
      map(this.truncateSummary),
      map((response) => this.sortArticles(response, search ?? ''))
    );
  }

  private truncateSummary(
    response: TGetArticlesResponse
  ): TGetArticlesResponse {
    return {
      ...response,
      results: response.results.map((article) => ({
        ...article,
        summary: article.summary.slice(0, 100),
      })),
    };
  }

  private sortArticles(
    response: TGetArticlesResponse,
    search: string
  ): TGetArticlesResponse {
    if (!search) {
      return response;
    }

    const sortedArticles = response.results
      .map((article) => ({
        article: article,
        titleMatches: this.countMatches(article.title, search),
        summaryMatches: this.countMatches(article.summary, search),
      }))
      .sort((a, b) => {
        if (a.titleMatches === b.titleMatches) {
          return b.summaryMatches - a.summaryMatches;
        }

        return b.titleMatches - a.titleMatches;
      })
      .map((result) => result.article);

    return { ...response, results: sortedArticles };
  }

  private countMatches(text: string, search: string): number {
    const terms = search.split(' ').map((term) => term.toLowerCase());
    const words = text.split(' ').map((word) => word.toLowerCase());

    return words.filter((word) => terms.some((term) => term === word)).length;
  }
}
