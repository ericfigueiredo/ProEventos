import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  pageTitle: string = '';


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      let route = this.activatedRoute.firstChild;
      while (route && route.firstChild) {
        route = route.firstChild;
      }
      this.pageTitle = (route && route.snapshot && route.snapshot.data['title']) || '';
    });
}



}
