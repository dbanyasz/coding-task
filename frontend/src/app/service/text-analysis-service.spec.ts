// src/app/services/offline-analyzer.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { filter, take } from 'rxjs/operators';
import { TextAnalysisService } from './text-analysis-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AnalysisRequest } from '../model/analysis-models';


describe('TextAnalysisService', () => {
  let service: TextAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(TextAnalysisService);
  });

  /* ------------------------------------------------------------------
   *  VOWEL TESTS
   * ------------------------------------------------------------------ */
  describe('Vowel tests', () => {
    const vowels = ['A', 'E', 'I', 'O', 'U'];

    it('phrase with vowels returns correct occurrences', (done) => {
      const request: AnalysisRequest = {
        input: 'This phrase contains ALL kinds of things!',
        mode: 'VOWELS',
      };

      // Expected counts for each vowel in the sentence above:
      // A → 3, E → 1, I → 4, O → 2, U → 0
      const expected = [3, 1, 4, 2, 0] as const;

      service.response$
      .pipe(filter((result) => result !== null))
      .pipe(take(1)).subscribe({
        next: (result) => {
          console.log(result);
          checkMap(result?.letterCount!, vowels, expected);
          done();
        },
        error: (err) => done.fail(err),
      });

      service.analyzeOffline(request);
    });

    it('phrase without vowels returns zero occurrences', (done) => {
      const request: AnalysisRequest = {
        input: 'Ths phrs cnts ll knds f thngs!',
        mode: 'VOWELS',
      };

      const expected = [0, 0, 0, 0, 0] as const;
      service.response$
      .pipe(filter((result) => result !== null))
      .pipe(take(1)).subscribe({
        next: (result) => {
          console.log(result);
          checkMap(result?.letterCount!, vowels, expected);
          done();
        },
        error: (err) => done.fail(err),
      });

      service.analyzeOffline(request);
    });
  });

  /* ------------------------------------------------------------------
   *  CONSONANT TESTS
   * ------------------------------------------------------------------ */
  describe('Consonant tests', () => {
    // Exact order from the Java test
    const consonants = [
      'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
      'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z',
    ] as const;

    it('phrase with consonants returns correct occurrences', (done) => {
      const request: AnalysisRequest = {
        input: 'Test phrase TIME!',
        mode: 'CONSONANTS',
      };

      // Expected counts (same order as the Java test):
      // B0 C0 D0 F0 G0 H1 J0 K0 L0 M1 N0 P1 Q0 R1 S2 T3 V0 W0 X0 Y0 Z0
      const expected = [
        0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
        0, 1, 0, 1, 2, 3, 0, 0, 0, 0, 0,
      ] as const;

      service.response$
      .pipe(filter((result) => result !== null))
      .pipe(take(1)).subscribe({
        next: (result) => {
          console.log(result);
          checkMap(result?.letterCount!, consonants, expected);
          done();
        },
        error: (err) => done.fail(err),
      });

      service.analyzeOffline(request);
    });

    it('phrase without consonants returns zero occurrences', (done) => {
      const request: AnalysisRequest = {
        input: 'aua OI',
        mode: 'CONSONANTS',
      };

      const expected = new Array(consonants.length).fill(0);

      service.response$
      .pipe(filter((result) => result !== null))
      .pipe(take(1)).subscribe({
        next: (result) => {
          console.log(result);
          checkMap(result?.letterCount!, consonants, expected);
          done();
        },
        error: (err) => done.fail(err),
      });

      service.analyzeOffline(request);
    });
  });
});

/**
 * Verifies that the map returned by the analyser contains the expected
 * counts for the supplied ordered list of characters.
 *
 * @param result   – the map produced by OfflineAnalyzerService.analyze()
 * @param chars    – ordered list of characters we are checking (vowels or consonants)
 * @param expected – ordered list of expected occurrence numbers
 */
function checkMap(
  result: Record<string, number>,
  chars: readonly string[],
  expected: readonly number[]
): void {
  expect(chars.length).toBe(expected.length);
  chars.forEach((ch, idx) => {
    const actual = result[ch] ?? 0;
    const exp = expected[idx];
    expect(actual)
      .withContext(`Character "${ch}" should occur ${exp} times`)
      .toBe(exp);
  });
}
