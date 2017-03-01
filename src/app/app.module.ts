import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from '@angular/router';
import { PostsService } from './posts.service';
import { PublicDealsComponent } from './public-deals/public-deals.component';
import { PrivateDealsComponent } from './private-deals/private-deals.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertService, AuthenticationService, AuthGuard, DealsService} from './services/index';
import { MapViewComponent } from './map-view/map-view.component';

// Define the routes
const ROUTES = [
{
  path: '',
  component: HomeComponent
},
  {
    path: 'p',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'logout',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'private-deals',
    component: PrivateDealsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'maps-view',
    component: MapViewComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PublicDealsComponent,
    PrivateDealsComponent,
    LoginComponent,
    HomeComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [
    AlertService,
    AuthenticationService,
    PostsService,
    AuthGuard,
    DealsService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
