import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { CaesarComponent } from './ciphers/caesar/caesar.component';
import { VigenereComponent } from './ciphers/vigenere/vigenere.component';
import { AffineComponent } from './ciphers/affine/affine.component';

@NgModule({
  declarations: [
    AppComponent,
    CaesarComponent,
    VigenereComponent,
    AffineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
