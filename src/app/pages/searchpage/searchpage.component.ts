import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import * as $ from "jquery";

import { AssetImportFacts, Query } from "../../types";

@Component({
  selector: "searchpage",
  templateUrl: "./searchpage.component.html",
  styleUrls: ["./searchpage.component.css"]
})
export class SearchPageComponent implements OnInit {years: String[]; //array to store all possible years of the search query selection
  byear;
  fyear;
  show: boolean

  constructor(private router: Router) {
    this.show = false;
    this.years = ["2017"]; //initializing list so that the method "push" can be used
    for (var ano = 2016; ano >= 1998; ano--) {
      this.years.push(ano.toString()); //populating list "years" with the years between 1998 and 2016
    }
  }

  public sendData() {

    //getting the initial and final years of the search date-range selected by the user
    this.byear = $("#y-initial option:selected").text() + "-01-01";
    this.fyear = $("#y-final option:selected").text() + "-12-31";

    if (this.fyear < this.byear) {
      alert("The final year of the range can't be lower than the initial")
      return
    }

    //redirects to the resultpage with the years as parameters, so resultpage can query the api
    this.router.navigate(['/resultpage'], {queryParams: {byear: this.byear, fyear: this.fyear}});
  }

  ngOnInit() {}
}
