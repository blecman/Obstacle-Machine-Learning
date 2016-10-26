import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule }   from '@angular/router';

import { MapBuilderComponent } from './map-builder.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    RouterModule.forRoot([
      {
        path: 'mapBuilder',
        component: MapBuilderComponent
      },
      {
        path: '',
        redirectTo: '/mapBuilder',
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [ AppComponent, MapBuilderComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
