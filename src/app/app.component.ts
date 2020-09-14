import { Component, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../customstyles/global-mat.css']
})
export class AppComponent {
  
  title = 'ccl-website-frontend';
  toolbarHidden=false
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/admin' ) {
          this.toolbarHidden = true;
        } else {
          this.toolbarHidden = false;
        }
      }
    });
    }

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 75) {
      //console.log('You are 50px from the top to bottom');

      document.querySelectorAll('.toolbar1').forEach((c) => {
        c.classList.add('toolbarmoved');
        c.classList.remove('toolbartop');
    });

    document.querySelectorAll('.toolbar-link').forEach((c) => {
      c.classList.add('toolbar-link-moved');
      
  });


    }else if(number<=75){

      document.querySelectorAll('.toolbar1').forEach((c) => {
        c.classList.add('toolbartop');
        c.classList.remove('toolbarmoved');
    });

    document.querySelectorAll('.toolbar-link').forEach((c) => {
      c.classList.remove('toolbar-link-moved');
      
  });

    }
  }

  
}
