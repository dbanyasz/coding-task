import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AnalysisRequest } from '../model/analysis-request';

export type LetterCountResponse = Record<string, number>;

@Injectable({
  providedIn: 'root'
})
export class TextAnalysisService {

  private readonly apiUrl = `${environment.apiBase}/text-analysis`;

  private readonly _response$ = new BehaviorSubject<LetterCountResponse | null>(null);
  readonly response$ = this._response$.asObservable();
  

  constructor(private http: HttpClient) {}

  /**
   * sends an AnalysisRequest containing a input sentence and an analysis mode to the text analysis backend
   * @param payload the request to forward to the API
   * @returns a map of letters and their number of occurrence
   */
  analyze(payload: AnalysisRequest): Observable<LetterCountResponse> {
    return this.http
      .post<LetterCountResponse>(this.apiUrl, payload)
      .pipe(
        tap(resp => {
          this._response$.next(resp);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Generic error handler for HttpClient calls.
   * Returns an observable that errors out with a user‑friendly message.
  */
  private handleError(error: HttpErrorResponse) {
    // Client‑side / network error
    if (error.error instanceof ErrorEvent) {
      console.error('Network error:', error.error.message);
    } else {
      // Server returned an unsuccessful status code
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }

    const friendlyMessage = 'Something went wrong - please try again later.';
    return throwError(() => new Error(friendlyMessage));
  }
}
