import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CompanionComponent } from './list/companion.component';
import { CompanionDetailComponent } from './detail/companion-detail.component';
import { CompanionUpdateComponent } from './update/companion-update.component';
import { CompanionDeleteDialogComponent } from './delete/companion-delete-dialog.component';
import { CompanionRoutingModule } from './route/companion-routing.module';

@NgModule({
  imports: [SharedModule, CompanionRoutingModule],
  declarations: [CompanionComponent, CompanionDetailComponent, CompanionUpdateComponent, CompanionDeleteDialogComponent],
})
export class CompanionModule {}
