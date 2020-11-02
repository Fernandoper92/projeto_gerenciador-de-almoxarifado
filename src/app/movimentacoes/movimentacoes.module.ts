import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MovimentacoesComponent } from './movimentacoes.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    MovimentacoesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // FormsModule,
    SharedModule
  ]
})
export class MovimentacoesModule { }
