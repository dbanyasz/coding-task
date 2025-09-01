import { Component, signal } from '@angular/core';
import { AnalyzerInput } from './analyzer-input/analyzer-input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    AnalyzerInput,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('text-analyzer-frontend');
}
