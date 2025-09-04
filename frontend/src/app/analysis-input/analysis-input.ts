import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TextAnalysisService } from '../service/text-analysis-service';
import { AnalysisModeId, AnalysisRequest} from '../model/analysis-models';
import { OnlineToggle } from "../online-toggle/online-toggle";

const modeOptions = [
  { label: 'Vowels', value: 'VOWELS' as AnalysisModeId },
  { label: 'Consonants', value: 'CONSONANTS' as AnalysisModeId },
];

@Component({
  selector: 'app-analysis-input',
  imports: [ReactiveFormsModule, OnlineToggle],
  templateUrl: './analysis-input.html',
  styleUrl: './analysis-input.less'
})
export class AnalysisInput {

  analysisForm!: FormGroup;

  online = true;
  private destroy$ = new Subject<void>();

  private analysisService = inject(TextAnalysisService);
  private fb = inject(FormBuilder);

  modeOptions = [
    { label: 'Vowels', value: 'VOWELS' as AnalysisModeId },
    { label: 'Consonants', value: 'CONSONANTS' as AnalysisModeId },
  ];

  ngOnInit() {
    this.analysisForm = this.fb.group({
      input: ['', [Validators.minLength(1), Validators.required]],
      mode: [this.modeOptions[0].value, Validators.required],
    });
  }

  onSubmit(): void {
    const payload: AnalysisRequest = this.analysisForm.getRawValue();

    console.log("is online: " + this.online);
    
    if (this.online) {
      this.analysisService.analyzeRemote(payload);
    } else {
      this.analysisService.analyzeOffline(payload);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
