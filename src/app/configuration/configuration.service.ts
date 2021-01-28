import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configurationPath = '/configurações'
  configurationList: AngularFireList<any> = null;
  groupPath = '/grupos'
  groupList: AngularFireList<any> = null;
  sectorPath = '/setores'
  sectorList: AngularFireList<any> = null;
  positionPath = '/cargos'
  positionList: AngularFireList<any> = null;

  constructor(private configurationDb: AngularFireDatabase) {
    this.configurationList = configurationDb.list(this.configurationPath);
    this.groupList = configurationDb.list(this.configurationPath + this.groupPath);
    this.sectorList = configurationDb.list(this.configurationPath + this.sectorPath);
    this.positionList = configurationDb.list(this.configurationPath + this.positionPath);
  }

  listAllOptions(option): AngularFireList<any> {
    switch (option) {
      case 'group':
        return this.groupList;
      case 'sector':
        return this.sectorList;
      case 'position':
        return this.positionList;
      default:
        return this.configurationList;
    }
  }

  pushOption(item: any, option: string) {
    switch (option) {
      case 'group':
        this.configurationDb.list(this.configurationPath + this.groupPath).push(item).then((result: any) => {
        })
        break;
      case 'sector':
        this.configurationDb.list(this.configurationPath + this.sectorPath).push(item).then((result: any) => {
        })
        break;
      case 'position':
        this.configurationDb.list(this.configurationPath + this.positionPath).push(item).then((result: any) => {
        })
        break;
      default:
        this.configurationDb.list(this.configurationPath).push(item).then((result: any) => {
        })
    }
  }

  updateOption(key: string, item: any, option: string) {
    switch (option) {
      case 'group':
        return this.groupList.update(key, item);
      case 'sector':
        return this.sectorList.update(key, item);
      case 'position':
        return this.positionList.update(key, item);
      default:
        return this.configurationList.update(key, item);
    }
  }

  deleteOption(key: string, option: string) {
    switch (option) {
      case 'group':
        return this.groupList.remove(key);
      case 'sector':
        return this.sectorList.remove(key);
      case 'position':
        return this.positionList.remove(key);
      default:
        return this.configurationList.remove(key);
    }
  }
}