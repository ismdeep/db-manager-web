import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DatabaseListComponent} from "./pages/database-list.component";
import {DatabaseDetailComponent} from "./pages/database-detail.component";

const routes: Routes = [
  {path: '', component: DatabaseListComponent},
  {path: ':id', component: DatabaseDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatabaseRoutingModule {
}
