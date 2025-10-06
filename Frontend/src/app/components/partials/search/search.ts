import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchTerm: string = '';
  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    });
  }

  search(term: string):void {
    if(term)
    this.router.navigateByUrl('/search/'+term);

  }
}
