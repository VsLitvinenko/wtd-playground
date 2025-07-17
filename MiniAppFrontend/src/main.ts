import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';


registerLocaleData(localeRu);

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    provideAnimations(),
    provideIonicAngular(),
    // provideRouter(
    //   routes,
    //   withPreloading(PreloadAllModules),
    //   withComponentInputBinding()
    // ),
    // provideHttpClient(
    //   withInterceptors([
    //     apiUrlInterceptor,
    //     authInterceptor,
    //     errorsHandleInterceptor,
    //   ])
    // ),
    // provideAppInitializer(() => {
    //   const tg = inject(TelegramService);
    //   return tg.initApp();
    // }),
  ],
});
