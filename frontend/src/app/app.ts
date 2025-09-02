import { Component, signal } from '@angular/core';
import { AnalysisInput } from './analysis-input/analysis-input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    AnalysisInput,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('text-analyzer-frontend');
}
