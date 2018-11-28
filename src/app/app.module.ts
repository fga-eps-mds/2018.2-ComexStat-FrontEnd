import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchPageComponent } from './pages/searchpage/searchpage.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpModule } from '@angular/http'
import { ResultPageComponent } from './pages/resultpage/resultpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SearchPageComponent,
    ResultPageComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      //creating connection between Angular and GraphQL back-end endpoint
      link: httpLink.create({ uri: 'http://0.0.0.0:8000/graphql/' }),
      cache: new InMemoryCache()
    });
  }
}
