import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent,
  },
  {
    path: 'article/:id',
    component: DetailsComponent,
  },
];
