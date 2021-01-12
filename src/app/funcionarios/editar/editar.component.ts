import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalDataService } from 'src/app/shared/local-data.service';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  form: FormGroup;

  sectors: string[] = this.localData.sectors;

  roles: string[] = this.localData.positions;

  constructor(
    private formBuilder: FormBuilder,
    private localData: LocalDataService,
    private employeeService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      type: ["employee"],
      
      role: this.formBuilder.group({
        role: [null],
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
