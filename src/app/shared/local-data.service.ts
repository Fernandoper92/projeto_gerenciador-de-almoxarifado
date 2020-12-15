import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  
  groups: string[] = ["EPI - Equipamento de Proteção Individual","Mecânico/Elétrico","Liquido","Escritorio","Outros"];

  sectors: string[] = ["Administração", "Expedição", "Produção", "Classificação", "Pav 2", "Manutenção", "Transporte"];

  positions: string[] = ["Auxiliar de Produção", "Gerente de Produção", "Auxiliar de expedição", "Auxiliar de Manutenção", "Auxiliar de Classificação","Motorista", "Financeiro", "Compras", "Vendas", "Gerente Geral", "Auxiliar de RH", "Auxiliar de Logística"];

  constructor() { }
}
