import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';

@NgModule({
  declarations: [
    ListarComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule
  ]
})
export class FuncionariosModule { }
