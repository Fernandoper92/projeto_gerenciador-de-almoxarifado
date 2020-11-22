import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  
  groups: string[] = ["EPI - Equipamento de Proteção Individual","Mecânico/Elétrico","Liquido","Escritorio","Outros"];

  sectors: string[] = ["Administração", "Expedição", "Produção", "Classificação", "Pav 2", "Manutenção", "Motorista"];

  positions: string[] = ["Auxiliar de Produção", "Auxiliar de expedição", "Auxiliar de Manutenção", "Auxiliar de Classificação"];

  constructor() { }
}
