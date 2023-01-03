import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {RegisterRoutingModule} from './register-routing.module';
import {IndexComponent} from './index/index.component';

const COMPONENTS = [];
const COMPONENTS_NO_ROUTE = [];

@NgModule({
  imports: [
    SharedModule,
    RegisterRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NO_ROUTE,
    IndexComponent
  ],
})
export class RegisterModule {
}
