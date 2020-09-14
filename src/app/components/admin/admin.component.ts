import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhotoService } from 'src/app/services/photo.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  //data
  categories: Category[] = []
  selectedCategory: Category = { title: "" }

  photosform: FormGroup;
  photoSelected: Photo = {}
  isPhotoSelected: boolean = false

  editphotoform: FormGroup;
  updatedCategoryTitle: string = ""

  selectedTab = 0

  //helpers
  disableButtons: boolean = false
  gridColsNum: string = "8"

  @ViewChild('fileinput')
  fileinputElement: ElementRef;

  @ViewChild('categoryinput')
  categoryinputElement: ElementRef;




  constructor(private photoService: PhotoService, private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data: any) => {

      this.categories = data
      this.categories.sort((a, b) => a.title.localeCompare(b.title))
      console.log(this.categories)

    }, err => console.log(err))

    this.photosform = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(null),
      categoryID: new FormControl('', [Validators.required]),
      //base64: new FormControl('', [Validators.required]),
    });
    this.editphotoform = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(null),
      categoryID: new FormControl('', [Validators.required]),
      //base64: new FormControl('', [Validators.required]),
    });
  }





  addCategory() {

    this.categoryService.postCategory(this.selectedCategory).subscribe((data: any) => {
      console.log(data);
      this.categoryinputElement.nativeElement.value = "";

      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = data
        this.categories.sort((a, b) => a.title.localeCompare(b.title))
        //console.log( this.categories)

      }, err => console.log(err))

    }, err => { console.log(err) })

  }

  editCategory(category) {

    //console.log(category.ID,this.updatedCategoryTitle)

    this.categoryService.updateCategoryByID(category.ID, { title: this.updatedCategoryTitle }).subscribe((data: any) => {
      console.log(data);
      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = data
        this.categories.sort((a, b) => a.title.localeCompare(b.title))
        console.log(this.categories)

      }, err => console.log(err))

      category.editing = false
    }, err => { console.log(err) })
  }

  deleteCategory(ID: string) {
    this.categoryService.deleteCategoryByID(ID).subscribe((data: any) => {
      console.log(data);
      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = data
        this.categories.sort((a, b) => a.title.localeCompare(b.title))
        console.log(this.categories)

      }, err => console.log(err))
    }, err => { console.log(err) })
  }

  addPhoto() {
    console.log(this.photosform.value)
    this.photoSelected.title = this.photosform.value.title
    this.photoSelected.description = this.photosform.value.description
    this.photoSelected.categoryID = this.photosform.value.categoryID
    this.photoService.postPhoto(this.photoSelected).subscribe((data: any) => {
      console.log(data);
      this.loadTabImages(null)
    }, err => { console.log(err) })
  }

  editPhoto(photo) {

  }

  deletePhoto(photo) {
    console.log(photo)
    let searchparam = photo.ID
    this.photoService.deletePhotoByID(searchparam).subscribe((data: any) => {
      console.log(data);
      this.loadTabImages(null)
    }, err => { console.log(err) })
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.uploadForm.get('image').setValue(file);
      //console.log(this.uploadForm.get('image').value)

      console.log(file)

      if (file.size > 1000000) {
        console.log("Exceeded file size")
        this.fileinputElement.nativeElement.value = "";
        return
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      let self = this
      reader.onload = function () {
        const base64String: string = (reader.result as string).match(
          /.+;base64,(.+)/
        )[1];

        var newimage: Photo = {}
        newimage.title = "random"
        newimage.base64 = base64String
        self.photoSelected = newimage
        self.isPhotoSelected = true

        //self.photoService.postPhoto(newimage).subscribe((data: any) => { console.log(data); }, err => { console.log(err) }) //.updateItem(update).subscribe((data: any) => { console.log(data); self.selectedItem.image = base64String }, err => { console.log(err) })

      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };



    }
  }

  loadTabImages(event: any) {

    let searchparam

    if (event != null) {
      this.selectedTab = event.index

      if (event.tab.textLabel === "Sin clasificar") {
        searchparam = "unclasified"
      } else {
        searchparam = this.categories[event.index].ID
      }

    } else {
      searchparam = this.categories[this.selectedTab].ID
    }

    console.log(searchparam, event)
    this.photoService.getPhotosByCategoryID(searchparam).subscribe((data: any) => {
      console.log(data)
      this.categories[this.selectedTab].photos = data
    }, err => console.log(err))
  }


}

