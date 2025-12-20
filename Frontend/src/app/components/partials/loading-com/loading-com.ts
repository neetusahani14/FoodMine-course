import { Component } from '@angular/core';
import { LoadingItem } from '../../../services/loading-item';

@Component({
  selector: 'app-loading-com',
  imports: [],
  templateUrl: './loading-com.html',
  styleUrl: './loading-com.css'
})
export class LoadingCom {
  isLoading: boolean = false;  
  constructor(loadingItemService: LoadingItem) { 
    loadingItemService.isLoading.subscribe(isLoading=>{
      this.isLoading = isLoading;
    });

  }

}
