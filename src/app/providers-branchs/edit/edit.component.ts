import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { ProvidersService } from './../providers.service';
import { BranchsService } from '../branchs.service';


@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private providersService: ProvidersService,
    private branchsService: BranchsService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      type: [null]
    });
  }

  onSubmit(form) {
    if(form.value.type === 'Filial'){
      this.pushBranch(form.value);
    } else {
      this.pushProvider(form.value);
    }
    this.form.reset()
  }

  pushBranch(branch) {
this.branchsService.pushBranch(branch);
  }

  pushProvider(provider) {
this.providersService.pushProvider(provider);
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
