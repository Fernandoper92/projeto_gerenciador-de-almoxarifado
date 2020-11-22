import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalDataService } from 'src/app/shared/local-data.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  form: FormGroup;

  sectors: string[] = this.localData.sectors;

  positions: string[] = this.localData.positions;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private localData: LocalDataService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      position: [null],
      sector: [null],
      uniformSize: [null],
      shoeSize: [null],
      GloveSize: [null]
    });
  }

  onSubmit() {
    this.http.post('http://httpbin.org/post', JSON.stringify(this.form.value)).pipe().subscribe(data => {
      console.log(data)
      this.form.reset();
    },
      (error: any) => alert('Erro ao enviar os dados, por favor tente de novo mais tarde!')
    );
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
