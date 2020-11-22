import { Component, OnInit } from '@angular/core';

import { LocalDataService } from '../shared/local-data.service';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  groups: string[] = this.localData.groups;
  sectors: string[] = this.localData.sectors;
  positions: string[] = this.localData.positions;

  constructor(
    private localData: LocalDataService
  ) { }

  ngOnInit(): void {
    this.collapseMenu();
  }

  addGroup(paramName:string, paramType) {
    console.log(this.localData[paramType].push([paramName]))
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
