import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { ANALYSIS_MODE_MAP, AnalysisRequest, AnalysisResult, LetterCountResponse, ModeBehaviour } from '../model/analysis-models';

@Injectable({
  providedIn: 'root'
})
export class TextAnalysisService {

  private readonly apiUrl = `${environment.apiBase}/text-analysis`;

  private readonly _response$ = new BehaviorSubject<AnalysisResult | null>(null);
  readonly response$ = this._response$.asObservable();
  
  private http = inject(HttpClient);

  /**
   * sends an AnalysisRequest containing a input sentence and an analysis mode to the text analysis backend and notifies subscribers
   * @param payload the request to forward to the API
   */
  analyzeRemote(payload: AnalysisRequest) {
    console.log("launching request to: " + this.apiUrl)
    this.http
      .post<LetterCountResponse>(this.apiUrl, payload)
      .pipe(
        tap(resp => {
          console.log("received response", resp);

          this._response$.next(this.convertResponseToResult(payload, resp, true));
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  /**
   * locally calculates the occurrences and notifies subscribers
   * @param request containing input and analysis mode
   * @returns 
   */
  analyzeOffline(request: AnalysisRequest) {
    const alphabeticalInput = request.input.toUpperCase().replace(/[^A-Z]/g, '');
    const modeBehaviour: ModeBehaviour = ANALYSIS_MODE_MAP[request.mode];
    const filteredInput = modeBehaviour.filter(alphabeticalInput);

    const letterOccurrences: LetterCountResponse = {} as LetterCountResponse;
    for (const l of modeBehaviour.letters) {
        letterOccurrences[l] = 0;
    }
    
    for (const ch of filteredInput) {
      letterOccurrences[ch] += 1;
    }

    const sortedKeys = Object.keys(letterOccurrences).sort();
    for (const key of sortedKeys) {
        console.log(`Letter '${key}' appears ${letterOccurrences[key]} times`);
    }
    this._response$.next(this.convertResponseToResult(request, letterOccurrences, false));
  }

  private convertResponseToResult(request: AnalysisRequest, response: LetterCountResponse, online: boolean): AnalysisResult {
    const analysisResult : AnalysisResult = {
      timestamp: new Date(),
      input: request.input,
      mode: request.mode,
      letterCount: response,
      online
    }

    return analysisResult;
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
