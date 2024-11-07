import { Component } from '@angular/core';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  single: any[] =  [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "UK",
      "value": 6200000
    },
    {
      "name": "Italy",
      "value": 4200000
    },
    {
      "name": "Spain",
      "value": 8200000
    }
  ];
  view = [500, 400];


  public reportsData: any[] = [];
  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  dataLabelFormatterVBC(tooltipText: any) {
    return "$" + tooltipText + " trillion";
  }
  constructor(private reportService: ReportService) {
    this.reportService.getReports().subscribe(res => {
      if(res.success == true){
        this.reportsData = [
          {
            "name": "Categorías",
            "value": res.categories,
            "extra": {
              "code": "CAT"
            }
          },
          {
            "name": "Usuarios",
            "value": res.users,
            "extra": {
              "code": "USR"
            }
          },
          {
            "name": "Productos",
            "value": res.products,
            "extra": {
              "code": "PRD"
            }
          }
        ]
      }else{

      }
    })
  }


  onSelect(event: any) {
    console.log(event);
  }
}
