import { Component, OnInit } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import * as $ from "jquery";

import { AssetImportFacts, Query } from "../../types";

@Component({
  selector: "searchpage",
  templateUrl: "./searchpage.component.html",
  styleUrls: ["./searchpage.component.css"]
})
export class SearchPageComponent implements OnInit {
  years: String[];
  data: AssetImportFacts;
  importations: Observable<AssetImportFacts>;
  byear;
  fyear;
  dataIsNotEmpty: boolean

  constructor(private apollo: Apollo) {

    this.dataIsNotEmpty = false;
    this.years = ["2017"]; //initializing list so that the method "push" can be used
    for (var ano = 2016; ano >= 1998; ano--) {
      this.years.push(ano.toString()); //populating list "years" with the years between 1998 and 2016
    }
  }

  public queryData() {

    this.dataIsNotEmpty = false;

    this.data = {
      edges: [{ node: { date: "", fobValue: "", ncm: { ncmNamePt: "" } } }]
    };

    this.byear = $("#y-initial option:selected").text() + "-01-01";
    this.fyear = $("#y-final option:selected").text() + "-12-31";

    if (this.fyear < this.byear) {
      alert("The final year of the range can't be lower than the initial")
      return
    }

    //Sending query to GraphQL end-point and receiving its result
    this.importations = this.apollo
      .watchQuery<Query>({
        query: gql`
        {
          allImport(commercializedBetween:"[\\"${
          this.byear
          }\\",\\"${this.fyear}\\"]"){
              edges{
                 node{
                  ncm{
                    ncmNamePt
                  }
                  date
                  fobValue
                 }
  
              }
            
          }
          
        }
        `
      })
      .valueChanges.pipe(
        //Maping result objects to importations variable
        map(result => result.data.allImport)
      );
    //Printing to console each element returne

    this.importations.forEach(element => {
      element.edges.forEach(edge => {
        this.dataIsNotEmpty = true;
        this.data.edges.push({
          node: {
            date: edge.node.date,
            fobValue: edge.node.fobValue,
            ncm: { ncmNamePt: edge.node.ncm.ncmNamePt }
          }
        });

      });
    });

    this.data.edges.shift();

  }

  public exportToCsv(element) {
    var table = element.nextElementSibling;
    var csvString = "";
    for (var i = 0; i < table.rows.length; i++) {
      var rowData = table.rows[i].cells;
      for (var j = 0; j < rowData.length; j++) {
        csvString = csvString + rowData[j].innerHTML + ";";
      }
      csvString = csvString.substring(0, csvString.length - 1);
      csvString = csvString + "\n";
    }
    csvString = csvString.substring(0, csvString.length - 1);
    var a = $("<a/>", {
      style: "display:none",
      href: "data:application/octet-stream;base64," + btoa(csvString),
      download: "assetsData.csv"
    }).appendTo("body");
    a[0].click();
    a.remove();
  }

  ngOnInit() {

  }
}

export class NgIfComponent {
  show = false;
}