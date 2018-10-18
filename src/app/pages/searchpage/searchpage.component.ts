import { Component, OnInit } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

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
  year = "2018-05-01";


  constructor(private apollo: Apollo) {

    this.data = {
      edges: [{ node: { date: "", fobValue: "", ncm: { ncmNamePt: "" } } }]
    };

    this.years = ["2017"]; //initializing list so that the method "push" can be used
    for (var ano = 2016; ano >= 1998; ano--) {
      this.years.push(ano.toString()); //populating list "years" with the years between 1998 and 2016
    }
  }

  ngOnInit() {
    //Sending query to GraphQL end-point and receiving its result
    this.importations = this.apollo
      .watchQuery<Query>({
        query: gql`
      {
        allImport(commercializedBetween:"[\\"${
          this.year
          }\\",\\"2018-12-31\\"]"){
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
}

export class NgIfComponent {
  show = false;
}