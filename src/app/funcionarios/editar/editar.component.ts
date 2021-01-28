import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { ConfigurationService } from './../../configuration/configuration.service';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  form: FormGroup;
  sectors: any;
  positions: any;

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private employeeService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.listAllOptions('sector');
    this.listAllOptions('position');
  }

  listAllOptions(option) {
    this.configurationService.listAllOptions(option).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      switch (option) {
        case 'sector':
          this.sectors = data;
          break;
        case 'position':
          this.positions = data;
          break;
      }
    });
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      type: ["employee"],

      position: this.formBuilder.group({
        position: [null],
        sector: [null]
      }),

      uniformSize: [null],
      shoeSize: [null],
      GloveSize: [null]
    });
  }

  onSubmit(form) {
    this.pushEmployee(form.value);
    this.form.reset();
  }

  pushEmployee(Employee) {
    this.employeeService.pushEmployee(Employee);
  }

  cssErro(param) {
    if (this.form.get(param).touched) {
      const valid = this.form.get(param).valid;
      return {
        'is-invalid': !valid,
        'is-valid': valid
      }
    }
  }

  checkValidTouched(param) {
    return !this.form.get(param).valid
  }

}
