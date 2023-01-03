import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutDefaultComponent} from '../layout/default/default.component';
import {LayoutFullScreenComponent} from '../layout/fullscreen/fullscreen.component';
import {LoginGuard} from '../shared/auth/login.guard';
import {CallbackComponent} from './callback/callback.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./platform-overview/platform-overview.module').then((m) => m.PlatformOverviewModule)
      },
      // 业务子模块
      {path: 'databases', loadChildren: () => import('./database/database.module').then((m) => m.DatabaseModule)},
    ],
  },
  // 全屏布局
  {
    path: 'fullscreen',
    component: LayoutFullScreenComponent,
    children: [
      {
        path: '', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule)
      },
      {
        path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule)
      },
    ],
  },
  // 单页不包裹Layout
  {path: 'callback/:type', component: CallbackComponent},
  {path: '**', redirectTo: 'exception/404'},
  {path: 'sign-in', loadChildren: () => import('../login/login.module').then((m) => m.LoginModule)},
  {path: 'sign-up', loadChildren: () => import('../register/register.module').then((m) => m.RegisterModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: false,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
