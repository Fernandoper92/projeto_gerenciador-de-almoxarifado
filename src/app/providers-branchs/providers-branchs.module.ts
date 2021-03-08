import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProvidersBranchsRoutingModule } from './providers-branchs-routing.module';
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
    ProvidersBranchsRoutingModule
  ]
})
export class ProvidersBranchsModule { }
