import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-vigenere',
  templateUrl: './vigenere.component.html',
  styleUrls: ['./vigenere.component.scss']
})
export class VigenereComponent implements OnInit {
  vigenereKey = '';
  keyNums: number[] = [];
  vigenerePlaintext = '';
  vigenereCiphertext = '';
  encrypt = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleVigenereKeyChange(): void {
    this.vigenereKey = this.vigenereKey.toUpperCase();

    const keyChars = this.vigenereKey.split('');
    this.keyNums = [];
    for (let i = 0; i < keyChars.length; i++) {
      this.keyNums[i] = keyChars[i].charCodeAt(0) - 65;
    }

    if (this.encrypt) {
      this.handleVigenereEncryptionChange();
    } else {
      this.handleVigenereDecryptionChange();
    }
  }

  caesarEncrypt(c: string, o: number): string {
    const val = c.charCodeAt(0) - 65 + o;
    let mod = val % 26;

    if (mod < 0) {
      mod = ((val % 26) + 26) % 26;
    }

    return String.fromCharCode(mod + 65);
  }

  vigenereEncrypt(): string {
    let ciphertext = '';
    let keyCount = 0;

    [...this.vigenerePlaintext].forEach(char => {
      if (char >= 'A' && char <= 'Z') {
        ciphertext += this.caesarEncrypt(char, this.keyNums[keyCount % this.keyNums.length]);
        keyCount++;
      } else {
        ciphertext += char;
      }
    });

    return ciphertext;
  }

  handleVigenereEncryptionChange(): void {
    this.encrypt = true;
    this.vigenerePlaintext = this.vigenerePlaintext.toUpperCase();
    this.vigenereCiphertext = this.vigenereEncrypt();
  }

  vigenereDecrypt(): string {
    let plaintext = '';
    let keyCount = 0;

    [...this.vigenereCiphertext].forEach(char => {
      if (char >= 'A' && char <= 'Z') {
        plaintext += this.caesarEncrypt(char, -(this.keyNums[keyCount % this.keyNums.length]));
      } else {
        plaintext += char;
      }
      keyCount++;
    });

    return plaintext;
  }

  handleVigenereDecryptionChange(): void {
    this.encrypt = false;
    this.vigenereCiphertext = this.vigenereCiphertext.toUpperCase();
    this.vigenerePlaintext = this.vigenereDecrypt();
  }
}
