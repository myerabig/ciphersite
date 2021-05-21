import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-affine',
  templateUrl: './affine.component.html',
  styleUrls: ['./affine.component.scss']
})
export class AffineComponent implements OnInit {
  aValue = 3;
  bValue = 0;
  affinePlaintext = '';
  affineCiphertext = '';
  encrypt = true;
  showMath = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleBValueChange(): void {
    if (this.bValue < 1 || this.bValue > 25) {
      this.bValue %= 26;
    }

    if (this.encrypt) {
      this.handleAffineEncryptionChange();
    } else {
      this.handleAffineDecryptionChange();
    }
  }

  affineEncrypt(c: string): string {
    const val = this.aValue * (c.charCodeAt(0) - 65) + this.bValue;
    let mod = val % 26;

    if (mod < 0) {
      mod = ((val % 26) + 26) % 26;
    }

    return String.fromCharCode(mod + 65);
  }

  handleAffineEncryptionChange(): void {
    this.encrypt = true;
    this.affinePlaintext = this.affinePlaintext.toUpperCase();
    let ciphertext = '';

    [...this.affinePlaintext].forEach(char => {
      if (char >= 'A' && char <= 'Z') {
        ciphertext += this.affineEncrypt(char);
      } else {
        ciphertext += char;
      }
    });

    this.affineCiphertext = ciphertext;
  }

  modInverse(a: number, m: number): number {
    for (let x = 1; x < m; x++) {
      if (((a % m) * (x % m)) % m === 1) {
        return x;
      }
    }
    return -1;
  }

  affineDecrypt(c: string): string {
    const inverse = this.modInverse(this.aValue, 26);
    const val = inverse * ((c.charCodeAt(0) - 65) - this.bValue);
    let mod = val % 26;

    if (mod < 0) {
      mod = ((val % 26) + 26) % 26;
    }

    return String.fromCharCode(mod + 65);
  }

  handleAffineDecryptionChange(): void {
    this.encrypt = false;
    this.affineCiphertext = this.affineCiphertext.toUpperCase();
    let plaintext = '';

    [...this.affineCiphertext].forEach(char => {
      if (char >= 'A' && char <= 'Z') {
        plaintext += this.affineDecrypt(char);
      } else {
        plaintext += char;
      }
    });

    this.affinePlaintext = plaintext;
  }

  showCalculations(show: boolean): void {
    this.showMath = show;
  }
}
