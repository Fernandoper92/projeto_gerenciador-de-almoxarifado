import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalDataService } from 'src/app/shared/local-data.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  form: FormGroup;

  groups: string[] = this.localData.groups;

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
        group: [null, Validators.required],
        structureCode: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        alternativeCode: [null],
        stock: [null],
        minStock: [null]
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
