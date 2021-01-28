import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  groups: any;
  sectors: any;
  positions: any;

  constructor(
    private configurationService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this.collapseMenu();
    this.listAllOptions('group');
    this.listAllOptions('sector');
    this.listAllOptions('position');
  }

  listAllOptions(option) {
    return this.configurationService.listAllOptions(option).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
        ({
          key: c.payload.key, ...c.payload.val()
        })
        )
      )
    ).subscribe(data => {
      switch (option) {
        case 'group':
          this.groups = data;
          break;
        case 'sector':
          this.sectors = data;
          break;
        case 'position':
          this.positions = data;
          break;
      }
    });
  }

  pushOption(value: any, option: string) {

    const item = {
      value: value,
      date: Date.now()
    }

    this.configurationService.pushOption(item, option);
  }

  deleteOption(key: string, option: string) {
    this.configurationService.deleteOption(key, option);
  }

  collapseMenu() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

}
