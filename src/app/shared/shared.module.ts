import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { LocalDataService } from './local-data.service';



@NgModule({
  declarations: [
    FormDebugComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormDebugComponent
  ],
  providers: [LocalDataService],
})
export class SharedModule { }
