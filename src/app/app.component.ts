import { Component, OnInit } from '@angular/core';
import { GenericService } from './services/generic.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-starter';


  inputData = [
    ['ADD_WORKER', 'John', 'Junior Developer', '100'],
    ['ADD_WORKER', 'John', 'Junior Developer', '100'],
    ['ADD_WORKER', 'Ashley', 'Middle Developer', '150'],
    ['ADD_WORKER', 'John', 'Middle Developer', '150'],
    ["REGISTER", "Ashley", "40"],
    ["REGISTER", "Ashley", "67"],
    ["REGISTER", "Ashley", "100"],
    ['GET', 'John'],
    ['GET', 'Ashley'],
    ['GET', 'Walter'],
  ];


  constructor(public genericService: GenericService) { }

  ngOnInit() {
    this.genericService.loadWeather();
    this.genericService.weather$.subscribe();
    this.problem(this.inputData);

  }


  // * Level 1: The working hours register program should support adding workers to the system,
  // * registering the time when workers enter or leave the office
  // * and retrieving information about the time spent in the office.

  // * Level 2: The working hours register program should support retrieving statistics about the amount of time that workers spent in the office.


  // * Level 3: The working hours register program should support promoting workers,
  // * assigning them new positions and new compensation.
  // * The program should also support calculating a worker's salary for a given period.

  // * Level 4: The working hours register program should support setting time periods to be double-paid.

  public problem(inputData: string[][]) {
    let records = new Array();
    console.log(this.mySolution(inputData, records));
  }




  public mySolution(queries: string[][], records: string[][]) {
    let results = [];
    let worker: any;

    for (let i = 0; i < queries.length; i++) { // Go through given queries
      const query = this.inputData[i];
      // Start checking query action
      if (query[0] === 'ADD_WORKER') {
        let workerIndex = -1; // Flag to indicate whether the given name was in our records
        for (let i = 0; i < records.length; i++) { // Check for worker name in our records
          if (records[i][0] === query[1]) {
            workerIndex = i;
            break; // Found worker, no need to keep looking
          }
        }
        if (workerIndex !== -1) {
          results.push("false"); // Return false if already present in records
        } else {
          results.push("true");
          records.push([query[1], query[2], query[3], "0", "out"]); // Add to our records with timestamp to track time in office

        }
      }
      else if (query[0] === 'REGISTER') {
        let workerIndex = -1; // Flag to indicate whether the given name was in our records
        for (let i = 0; i < records.length; i++) { // Check for worker name in our records
          if (records[i][0] === query[1]) {
            workerIndex = i;
            worker = records[i];
            console.log(records[i])
            break; // Found worker, no need to keep looking
          }

        }
        if (workerIndex !== -1) {
          console.log(records);
          console.log(worker);
          if (worker[4] == 'in') {
            worker[4] = 'out';
            worker[3] = String(Math.abs(parseInt(worker[3]) - parseInt(query[2]))); // Update workers timestamp
          } else {
            worker[4] = 'in';
            worker[3] = String(parseInt(worker[3]) - parseInt(query[2]));
          }
          results.push("false"); // Return false if already present in records
        } else {
          results.push("invalid_worker");
        }
      } else if ((query[0] === 'GET') && (worker[0] === query[1])) {
        console.log(`${worker[0]}, spent ${worker[3]} time units in the office`);

      }
    }

    return results;
  }


  public findWorker(records: string[][], workerName: string) {
    let workerIndex = -1; // Flag to indicate whether the given name was in our records
        for (let i = 0; i < records.length; i++) { // Check for worker name in our records
          if (records[i][0] === workerName) {
            workerIndex = i;
            break; // Found worker, no need to keep looking
          }
        }
    return workerIndex;
  }





}
