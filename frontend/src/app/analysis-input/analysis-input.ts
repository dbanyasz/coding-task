import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  takeUntil,
} from 'rxjs/operators';
import { TextAnalysisService } from '../service/text-analysis-service';
import { AnalysisMode, AnalysisRequest } from '../model/analysis-request';

type AnalysisFormControls = {
  mode: FormControl<AnalysisMode>;
  input: FormControl<string>;
};

@Component({
  selector: 'app-analysis-input',
  imports: [ReactiveFormsModule],
  templateUrl: './analysis-input.html',
  styleUrl: './analysis-input.less'
})
export class AnalysisInput {

  analysisForm!: FormGroup<AnalysisFormControls>;

  private destroy$ = new Subject<void>();

  readonly modes = Object.values(AnalysisMode);

  private analysisService = inject(TextAnalysisService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.analysisForm = this.fb.group<AnalysisFormControls>({
      mode: new FormControl<AnalysisMode>(AnalysisMode.Consonants, {
        validators: Validators.required,
        nonNullable: true
      }),
      input: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true
      }),
    });
  }

  onSubmit(): void {
    // Guard: do nothing if the form is invalid
    if (this.analysisForm.invalid) {
      // Touch all controls so validation messages appear
      this.analysisForm.markAllAsTouched();
      return;
    }
    const payload: AnalysisRequest = this.analysisForm.getRawValue();

    this.analysisService
      .analyze(payload)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          console.log('Server responded with:', response);
        },
        error: (err) => console.error('Request error:', err),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
