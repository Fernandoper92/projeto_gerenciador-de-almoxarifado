import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { LocalDataService } from './local-data.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { PhonePipe } from './pipes/phone.pipe';



@NgModule({
  declarations: [
    FormDebugComponent,
    TranslatePipe,
    PhonePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormDebugComponent,
    TranslatePipe,
    PhonePipe
  ],
  providers: [LocalDataService],
})
export class SharedModule { }
