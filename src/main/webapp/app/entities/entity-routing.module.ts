import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'companion',
        data: { pageTitle: 'adopteUnCompagnonApp.companion.home.title' },
        loadChildren: () => import('./companion/companion.module').then(m => m.CompanionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
