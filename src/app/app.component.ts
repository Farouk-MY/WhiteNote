import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  ngOnInit():void{
    this.checkAppMode()
  }
  
  darkMode=false;
  constructor() {}

  async checkAppMode(){
    //const checkIsDarkMode = localStorage.getItem('darkModeActivated')
    const checkIsDarkMode= await Preferences.get({key:'darkModeActivated'})
    checkIsDarkMode?.value == 'true'
    ? (this.darkMode = true) : (this.darkMode = false);
    document.body.classList.toggle('darke',this.darkMode)
  }


  toggleTheme(){
    this.darkMode=!this.darkMode;
    document.body.classList.toggle('darke', this.darkMode)
    if(this.darkMode){
      //localStorage.setItem('darkModeActivated','true')
      Preferences.set({key:'darkModeActivated', value:'true'})
    }else{
      //localStorage.setItem('darkModeActivated','false')
      Preferences.set({key:'darkModeActivated', value:'false'})
    }
    
  }
}
