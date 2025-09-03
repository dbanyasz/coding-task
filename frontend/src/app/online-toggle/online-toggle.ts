import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-online-toggle',
  imports: [],
  templateUrl: './online-toggle.html',
  styleUrl: './online-toggle.less'
})
export class OnlineToggle {
  @Input() analyzeOnline = true;
  @Output() analyzeOnlineChange = new EventEmitter<boolean>();

  toggleArchive(event: Event): void {
    const cb = event.target as HTMLInputElement;
    this.analyzeOnline = cb.checked;
    this.analyzeOnlineChange.emit(this.analyzeOnline);
  }

}
