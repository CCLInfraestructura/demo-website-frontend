import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  //data
  categories: Category[] = []

  //helpers
  gridColsNum: string = "4"

  constructor(private photoService: PhotoService, private categoryService: CategoryService) { }

  loadTabImages(event: any) {
    let searchparam = this.categories[event.index].ID
    this.photoService.getPhotosByCategoryID(searchparam).subscribe((data: any) => {
      console.log(data)
      this.categories[event.index].photos = data
    }, err => console.log(err))
  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data
      this.categories.sort((a, b) => a.title.localeCompare(b.title))
      console.log(this.categories)

      this.loadTabImages({ index: 0 })

    }, err => console.log(err))


  }


}
