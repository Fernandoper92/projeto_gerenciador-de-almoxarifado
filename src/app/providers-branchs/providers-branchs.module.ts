import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ProvidersBranchsRoutingModule } from './providers-branchs-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProvidersBranchsComponent } from './providers-branchs.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ProvidersBranchsComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProvidersBranchsRoutingModule,
    MatIconModule,
    SharedModule
  ]
})
export class ProvidersBranchsModule { }
