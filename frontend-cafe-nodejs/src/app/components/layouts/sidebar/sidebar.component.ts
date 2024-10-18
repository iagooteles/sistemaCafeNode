import { ChangeDetectorRef, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { jwtDecode } from 'jwt-decode';
import { MenuItens } from '../../../shared/menu-itens';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatSidenavModule, RouterModule, FlexLayoutModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  token:any = localStorage.getItem('token');
  tokenPayload:any;
  isSidebarOpen: boolean = false;

  private _mobileQueryListener: () => void;
  private clickListener: (() => void) | undefined;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItens:MenuItens,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {
    this.tokenPayload = jwtDecode(this.token);
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;

    if (this.isSidebarOpen) {
      this.clickListener = this.renderer.listen('document', 'click', (event: Event) => this.handleClickOutside(event));
    } else if (this.clickListener) {
      this.clickListener();
    }
  }

  handleClickOutside(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);

    if (!clickedInside && this.isSidebarOpen) {
      this.isSidebarOpen = false;

      if (this.clickListener) {
        this.clickListener();
      }
    }
  }

}
