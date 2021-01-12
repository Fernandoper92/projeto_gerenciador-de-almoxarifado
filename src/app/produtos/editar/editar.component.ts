import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalDataService } from 'src/app/shared/local-data.service';
import { ProductsService } from './../products.service';

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
    private localData: LocalDataService,
    private productService: ProductsService
    ) { }

    ngOnInit(): void {
      this.createFormGroup();
    }
  
    createFormGroup() {
      this.form = this.formBuilder.group({
        name: [null, Validators.required],
        group: [null, Validators.required],
        provider: [null],
        code: [null],
        stock: [null],
        minStock: [null]
      });
    }

    onSubmit(form) {
      this.pushProduct(form.value);
      this.form.reset()
    }

    pushProduct(product) {
      this.productService.pushProduct(product);
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
