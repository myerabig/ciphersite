import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-caesar',
  templateUrl: './caesar.component.html',
  styleUrls: ['./caesar.component.scss']
})
export class CaesarComponent implements OnInit {
  encrypt = true;
  caesarOffset = 1;
  caesarPlaintext = '';
  caesarCiphertext = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  caesarEncrypt(c: string, o: number): string {
    const val = c.charCodeAt(0) - 65 + o;
    let mod = val % 26;

    if (mod < 0) {
      mod = ((val % 26) + 26) % 26;
    }

    return String.fromCharCode(mod + 65);
  }

  handleCaesarOffsetChange(): void {
    if (this.caesarOffset < 1 || this.caesarOffset > 25) {
      this.caesarOffset %= 26;
    }

    if (this.encrypt) {
      this.handleCaesarEncryptionChange();
    } else {
      this.handleCaesarDecryptionChange();
    }
  }

  handleCaesarEncryptionChange(): void {
    this.encrypt = true;
    this.caesarPlaintext = this.caesarPlaintext.toUpperCase();
    let ciphertext = '';

    [...this.caesarPlaintext].forEach(char => {
      if (char >= 'A' && char <= 'Z') {
        ciphertext += this.caesarEncrypt(char, this.caesarOffset);
      } else {
        ciphertext += char;
      }
    });

    this.caesarCiphertext = ciphertext;
  }

  handleCaesarDecryptionChange(): void {
    this.encrypt = false;
    this.caesarCiphertext = this.caesarCiphertext.toUpperCase();
    let plaintext = '';

    [...this.caesarCiphertext].forEach(char => {
      if (char >= 'A' && char <= 'Z') {
        plaintext += this.caesarEncrypt(char, -this.caesarOffset);
      } else {
        plaintext += char;
      }
    });

    this.caesarPlaintext = plaintext;
  }
}
