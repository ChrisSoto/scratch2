import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonToolbarComponent } from './shared/components/common-toolbar/common-toolbar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from 'firebase_config';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from './shared/services/custom-error-handler.service';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonToolbarComponent,
    MatSnackBarModule,
    MarkdownModule.forRoot(),
    MatNativeDateModule // I had to import here, didn't work from standalone component...
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
    MarkdownService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
