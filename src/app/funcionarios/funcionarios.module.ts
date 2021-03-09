import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    EditarComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FuncionariosRoutingModule,
    SharedModule,
    MatIconModule
  ]
})
export class FuncionariosModule { }
