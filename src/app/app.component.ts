import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedCipher = 'caesar';

  handleCipherChange(e: Event): void {
    console.log(e.target);
    console.log(this.selectedCipher);
  }
}
