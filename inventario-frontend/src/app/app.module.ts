import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app';
import { AuthInterceptor } from './auth/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideRouter([])
  ]
});
