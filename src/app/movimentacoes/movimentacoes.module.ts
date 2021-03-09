import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MovimentacoesComponent } from './movimentacoes.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    MovimentacoesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule
  ]
})
export class MovimentacoesModule { }
