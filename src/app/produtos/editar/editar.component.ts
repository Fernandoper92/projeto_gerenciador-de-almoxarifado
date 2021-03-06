import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/configuration/configuration.service';

import { ProductsService } from './../products.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  form: FormGroup;
  groups: any;

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.listAllOptions('group');
  }

  listAllOptions(option) {
    this.configurationService.listAllOptions(option).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.groups = data;
    });
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      group: [null, Validators.required],
      code: [null, Validators.required],
      provider: [null],
      stock: [0],
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
