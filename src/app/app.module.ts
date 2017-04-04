import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from '@angular/router';
import { PostsService } from './posts.service';
import { PublicDealsComponent } from './public-deals/public-deals.component';
import { PrivateDealsComponent } from './private-deals/private-deals.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertService, AuthenticationService, AuthGuardService, DealsService, UserService} from './services/index';
import { MapViewComponent } from './map-view/map-view.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AlertComponent } from './alert/alert.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UserInfoComponent } from './user-info/user-info.component';

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
    canActivate: [AuthGuardService]
  },
  {
    path: 'maps-view',
    component: MapViewComponent,
    pathMatch: 'full'
  },
  {
   path: 'register',
   component: RegisterUserComponent,
   canActivate: [AuthGuardService]
  },
  {
  path: 'delete',
  component: DeleteUserComponent,
  canActivate: [AuthGuardService]
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
    MapViewComponent,
    RegisterUserComponent,
    AlertComponent,
    DeleteUserComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [
    AlertService,
    AuthenticationService,
    PostsService,
    AuthGuardService,
    DealsService,
    UserService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
