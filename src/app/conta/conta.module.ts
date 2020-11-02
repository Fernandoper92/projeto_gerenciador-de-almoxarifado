import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrarComponent } from './entrar/entrar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ContaComponent } from './conta.component';



@NgModule({
  declarations: [
    ContaComponent,
    EntrarComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContaComponent
  ]
})
export class ContaModule { }
