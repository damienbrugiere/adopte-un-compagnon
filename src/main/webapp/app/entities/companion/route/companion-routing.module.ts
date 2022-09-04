import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CompanionComponent } from '../list/companion.component';
import { CompanionDetailComponent } from '../detail/companion-detail.component';
import { CompanionUpdateComponent } from '../update/companion-update.component';
import { CompanionRoutingResolveService } from './companion-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const companionRoute: Routes = [
  {
    path: '',
    component: CompanionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompanionDetailComponent,
    resolve: {
      companion: CompanionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompanionUpdateComponent,
    resolve: {
      companion: CompanionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompanionUpdateComponent,
    resolve: {
      companion: CompanionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(companionRoute)],
  exports: [RouterModule],
})
export class CompanionRoutingModule {}
