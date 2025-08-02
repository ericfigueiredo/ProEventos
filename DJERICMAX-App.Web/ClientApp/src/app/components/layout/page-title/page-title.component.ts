import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  pageTitle: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.updateTitle();

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd))
        .subscribe(() => {
        this.updateTitle();
      });
  }

  private updateTitle() {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.pageTitle = (route.snapshot && route.snapshot.data['title']) || '';
  }




}
