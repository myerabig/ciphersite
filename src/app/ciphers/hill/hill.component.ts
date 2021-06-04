import {Component, OnInit} from '@angular/core';
import {inv} from 'mathjs';

@Component({
  selector: 'app-hill',
  templateUrl: './hill.component.html',
  styleUrls: ['./hill.component.scss']
})
export class HillComponent implements OnInit {
  hillKeyword = '';
  keyArray: number[] = [];
  hillPlaintext = '';
  hillCiphertext = '';
  encrypt = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleHillKeyChange(): void {
    this.hillKeyword = this.hillKeyword.toUpperCase();

    // Convert each key letter into a number in keyArray
    this.keyArray = [];
    for (let i = 0; i < this.hillKeyword.length; i++) {
      const char = this.hillKeyword.charAt(i);
      this.keyArray[i] = char.charCodeAt(0) - 65;
    }

    // If the key is not in nxn format, fill in missing letters with A, B, C, D,...
    const n = Math.ceil(Math.sqrt(this.keyArray.length));
    const expectedLength = Math.pow(n, 2);
    let count = 0;
    while (this.keyArray.length !== expectedLength) {
      this.keyArray.push(count);
      count++;

      if (count > 25) {
        count = 0;
      }
    }

    if (this.encrypt) {
      this.handleHillEncryptionChange();
    } else {
      this.handleHillDecryptionChange();
    }
  }

  hillEncrypt(plaintext: string, rows: number): string {
    const plaintextArray: number[] = [];
    plaintext.split('').forEach(char => plaintextArray.push(char.charCodeAt(0) - 65));

    const resultArray: number[] = [];
    for (let i = 0; i < rows; i++) {
      let sum = 0;
      for (let j = 0; j < rows; j++) {
        sum += this.keyArray[(i * rows) + j] * plaintextArray[j];
      }

      resultArray.push(sum % 26);
    }

    let result = '';
    resultArray.forEach(num => result += String.fromCharCode(num + 65));

    return result;
  }

  handleHillEncryptionChange(): void {
    this.encrypt = true;
    this.hillPlaintext = this.hillPlaintext.toUpperCase();
    const n = Math.sqrt(this.keyArray.length);

    // Remove anything that's not a letter from the plaintext and store the character/index in nonLetters
    const nonLetters = [];
    let hillPlaintextClean = this.hillPlaintext;
    for (let i = 0; i < hillPlaintextClean.length; i++) {
      const char = hillPlaintextClean[i];
      if (char < 'A' || char > 'Z') {
        nonLetters.push([char, i + nonLetters.length]);
        hillPlaintextClean = hillPlaintextClean.slice(0, i) + hillPlaintextClean.slice(i + 1);
        i--;
      }
    }

    // Encrypt the plaintext
    let ciphertext = '';
    const plaintextLength = hillPlaintextClean.length;
    for (let i = 0; i < plaintextLength - (plaintextLength % n) - 1; i += n) {
      ciphertext += this.hillEncrypt(hillPlaintextClean.slice(i, i + 3), n);
    }
    if (plaintextLength % n > 0) {
      ciphertext += this.hillEncrypt(hillPlaintextClean.slice(plaintextLength - (plaintextLength % n)), plaintextLength % n);
    }

    // Restore non-letter characters to ciphertext
    nonLetters.forEach(arr => {
      ciphertext = ciphertext.slice(0, Number(arr[1])) + arr[0] + ciphertext.slice(Number(arr[1]));
    });

    this.hillCiphertext = ciphertext;
  }

  // Doesn't work
  handleHillDecryptionChange(): void {
    this.encrypt = false;
    this.hillCiphertext = this.hillCiphertext.toUpperCase();
    const n = Math.sqrt(this.keyArray.length);

    // Remove anything that's not a letter from the ciphertext and store the character/index in nonLetters
    const nonLetters = [];
    let hillCiphertextClean = this.hillCiphertext;
    for (let i = 0; i < hillCiphertextClean.length; i++) {
      const char = hillCiphertextClean[i];
      if (char < 'A' || char > 'Z') {
        nonLetters.push([char, i + nonLetters.length]);
        hillCiphertextClean = hillCiphertextClean.slice(0, i) + hillCiphertextClean.slice(i + 1);
        i--;
      }
    }

    // Separate keyArray into n-length arrays
    let separateMatrix = [];
    for (let i = 0; i < this.keyArray.length; i += n) {
      const temp = [];
      for (let j = i; j < (i + n); j++) {
        temp.push(this.keyArray[j]);
      }
      separateMatrix.push(temp);
    }

    // Invert keyArray
    separateMatrix = inv(separateMatrix);
    this.keyArray = [];
    separateMatrix.forEach(arr => arr.forEach(num => this.keyArray.push(num)));

    // Decrypt the ciphertext
    let plaintext = '';
    const ciphertextLength = hillCiphertextClean.length;
    for (let i = 0; i < ciphertextLength - (ciphertextLength % n) - 1; i += n) {
      plaintext += this.hillEncrypt(hillCiphertextClean.slice(i, i + 3), n);
    }
    if (ciphertextLength % n > 0) {
      plaintext += this.hillEncrypt(hillCiphertextClean.slice(ciphertextLength - (ciphertextLength % n)), ciphertextLength % n);
    }

    // Restore non-letter characters to ciphertext
    nonLetters.forEach(arr => {
      plaintext = plaintext.slice(0, Number(arr[1])) + arr[0] + plaintext.slice(Number(arr[1]));
    });

    this.hillPlaintext = plaintext;
  }
}
