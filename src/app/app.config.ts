import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { ListEffects } from './store/effects/list.effects';
import { DetailsEffects } from './store/effects/details.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects(ListEffects, DetailsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
    }),
  ],
};
