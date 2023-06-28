import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class MEXCTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    this.title.setTitle(title ? `MEXCAPI - ${title}` : `MEXCAPI`);
  }
}

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', title: 'Home' },
  { path: '**', component: PageNotFoundComponent, title: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: MEXCTitleStrategy}
  ]
})
export class AppRoutingModule { }
