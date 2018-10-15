import { Component, OnInit } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { AssetImportFacts, Query } from '../../types';

@Component({
  selector: "searchpage",
  templateUrl: "./searchpage.component.html",
  styleUrls: ["./searchpage.component.css"]
})
export class SearchPageComponent implements OnInit {
  years: String[];
  importations: Observable<AssetImportFacts[]>;


  constructor(private apollo: Apollo) {
    this.years = ["2017"]; //initializing list so that the method "push" can be used
    for (var ano = 2016; ano >= 1998; ano--) {
      this.years.push(ano.toString()); //populating list "years" with the years between 1998 and 2016
    }
  }

  ngOnInit() {

    //Sending query to GraphQL end-point and receiving its result
    this.importations = this.apollo.watchQuery<Query>({
      query: gql`
      {
        allImport{
            edges{
               node{
                 ncm{
                  ncmNamePt
                }
               }

            }
          
        }
        
      }
      `
    })
      .valueChanges
      .pipe(
        //Maping result objects to importations variable
        map(result => result.data.allImport),
      );
    //Printing to console each element returned
    this.importations.forEach(element => {
      console.log(element);

    });
  }

}