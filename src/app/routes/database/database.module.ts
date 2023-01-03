import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {DatabaseListComponent} from "./pages/database-list.component";
import {DatabaseEditComponent} from './components/database-edit.component';
import {DatabaseRoutingModule} from './database-routing.module';
import {NzNoAnimationModule, NzTreeModule} from "ng-zorro-antd";
import {DatabaseDetailComponent} from "./pages/database-detail.component";
import {DatabaseItemDetailComponent} from "./components/database-item-detail.component";
import {DatabaseItemEditComponent} from "./components/database-item-edit.component";

const COMPONENTS = [
  DatabaseListComponent,
  DatabaseDetailComponent,
];

const COMPONENTS_NO_ROUTE = [
  DatabaseEditComponent,
  DatabaseItemDetailComponent,
  DatabaseItemEditComponent,
];

@NgModule({
  imports: [SharedModule, DatabaseRoutingModule, MonacoEditorModule.forRoot(), NzTreeModule, NzNoAnimationModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NO_ROUTE],
  entryComponents: COMPONENTS_NO_ROUTE,
})
export class DatabaseModule {
}
