import { Component, signal } from '@angular/core';
import { AnalysisInput } from './analysis-input/analysis-input';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalysisResults } from './analysis-results/analysis-results';

@Component({
  selector: 'app-root',
  imports: [
    AnalysisInput,
    AnalysisResults,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('text-analyzer-frontend');
}
