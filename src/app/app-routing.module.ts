import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGuard } from './core/guards/public.guard';
import { AdminGuard } from './core/guards/post.guard';
// import {  } 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: SkeletonComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'casesReported',
        loadChildren: () => import('./modules/researchers/researchers.module').then(m => m.ResearchersModule)
      },
    ]
  },
  {
    path: 'login',
    canActivate: [PublicGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'investigador',
    component: SkeletonComponent,
    // canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/researchers/researchers.module').then(m => m.ResearchersModule)
      }
    ]
  },
  {
    path: 'user',
    component: SkeletonComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/end-user/end-user.module').then(m => m.EndUserModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
