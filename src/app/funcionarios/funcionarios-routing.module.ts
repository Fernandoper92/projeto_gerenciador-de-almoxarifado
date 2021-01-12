import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'listar', pathMatch: 'full' },
            { path: 'listar', component: ListarComponent },
            { path: ':id', component: EditarComponent },
            { path: ':id/editar', component: EditarComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FuncionariosRoutingModule { }