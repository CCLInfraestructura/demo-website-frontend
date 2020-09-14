import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css', '../../../customstyles/carousel.css', './web.component.overlay.css'],
  encapsulation: ViewEncapsulation.None
})
export class WebComponent implements OnInit {

  //data
  pictures: any[];
  selectedTeamMember: any

  //carousel
  carouselNumVisible = 3
  carouselNumScroll = 1
  responsiveOptions;

  //helpers
  screenHeight: number;
  screenWidth: number;

  //google maps
  latitude = 37.2536643;
  longitude = -6.9429049;
  mapType = 'roadmap';
  zoom = 18


  constructor(private photoService: PhotoService, private categoryService: CategoryService) {
    
    //responsive carousel
    this.responsiveOptions = [
      {
        breakpoint: '1324px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1250px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '600px',
        numVisible: 1,
        numScroll: 1
      }
    ];

 

  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data: any) => {
      let categories = data
      let teamCategory = categories.filter(cat => cat.title === "Equipo")
      let searchparam = teamCategory[0].ID
      console.log(categories, teamCategory, searchparam)

      this.photoService.getPhotosByCategoryID(searchparam).subscribe((data: any) => {
        console.log(data)
        this.pictures = data;
        this.selectedTeamMember = this.pictures[0]

      }, err => console.log(err))

    }, err => console.log(err));


    (async () => {

      await new Promise(resolve => setTimeout(resolve, 500));

      document.querySelectorAll('.moving-text').forEach((c) => {
        c.classList.add('moving-text-end');
      });

    })();

  }

  //Overlay

  showPhotoOverlay(pic: any) {
    console.log(pic)
    this.selectedTeamMember = pic
    document.getElementById("myNav").style.width = "100%";
    document.body.style.overflow = "hidden"
  }

  closePhotoOverlay() {
    document.getElementById("myNav").style.width = "0%";
    document.body.style.overflowY = "scroll"
  }


  //Effects/Animations

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 50) {

      document.querySelectorAll('.moving-text-scroll').forEach((c) => {
        c.classList.add('moving-text-end');
        c.classList.add('text-fadein');
        //c.classList.remove('moving-text');
      });

    } else {

    }
  }



}
