import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { tokenInterceptor} from './services/token-interceptor.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NgxUiLoaderModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useFactory: () => tokenInterceptor, 
    multi: true
  }]
})
export class AppComponent {
  title = 'frontend-cafe-nodejs';
}
