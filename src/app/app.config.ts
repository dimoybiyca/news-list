import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { baseUrlInterceptor } from './shared/interceptors/base-url/base-url.interceptor';
import { DetailsEffects } from './store/effects/details.effects';
import { ListEffects } from './store/effects/list.effects';
import { appReducers } from './store/reducers/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideStore(appReducers),
    provideEffects(ListEffects, DetailsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
    }),
  ],
};
