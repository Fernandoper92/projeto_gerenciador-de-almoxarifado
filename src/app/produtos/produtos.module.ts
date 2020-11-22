import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ListarComponent } from './listar/listar.component';
import { EditarComponent } from './editar/editar.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  declarations: [
    ListarComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProdutosRoutingModule,
    SharedModule
  ],
})
export class ProdutosModule { }
