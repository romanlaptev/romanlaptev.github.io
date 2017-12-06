var AppModule = ng.core.NgModule({
	
	// import * as angular2 from 'angular2/angular2';
	// console.log(angular2.version);
	
    imports: [ng.platformBrowser.BrowserModule, ng.forms.FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
  })
  .Class({
    constructor: function() { }
});