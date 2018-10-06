import { Component, OnInit } from "@angular/core";

@Component({
  selector: "searchpage",
  templateUrl: "./searchpage.component.html",
  styleUrls: ["./searchpage.component.css"]
})
export class SearchPageComponent implements OnInit {
  years: String[];

  constructor() {
    this.years = ["2017"]; //initializing list so that the method "push" can be used
    for (var ano = 2016; ano >= 1998; ano--) {
      this.years.push(ano.toString()); //populating list "years" with the years between 1998 and 2016
    }
  }

  ngOnInit() {}
}
