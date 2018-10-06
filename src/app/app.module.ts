import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchPageComponent } from './pages/searchpage/searchpage.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
