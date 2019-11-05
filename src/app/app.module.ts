import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent, routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
