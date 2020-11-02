import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'listar', pathMatch: 'full' },
            { path: 'listar', component: ListarComponent },
            { path: 'novo', component: EditarComponent },
            // { path: ':id', component: EditarComponent },
            // { path: ':id/editar', component: EditarComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutosRoutingModule { }