import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  { path: '', redirectTo: 'movimentações', pathMatch: 'full' },
  {
    path: 'fornecedor-filial',
    loadChildren: () => import('./providers-branchs/providers-branchs.module').then(m => m.ProvidersBranchsModule)
  },
  {
    path: 'funcionarios',
    loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionariosModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule)
  }, 
  { path: 'movimentações', component: MovimentacoesComponent },
  { path: 'configurações', component: ConfigurationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
