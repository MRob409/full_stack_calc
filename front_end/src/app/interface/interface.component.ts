import { Component, OnInit } from '@angular/core';
import { EquationService } from "../service/equation.service";
import {Equation} from "../equation";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})


export class InterfaceComponent implements OnInit {

  equationFrontEnd: string[] = ['0'];
  result: number = 0;
  PreviousEquation: string[] = [];

  private equation: Equation = {'equation': ['0']}

  resulted: boolean = false;

  constructor(private equationService: EquationService) {
  }

  ngOnInit(): void {
  }

  evaluate() {

    console.log('evaluate')

    let i: number = 0;

    //Sets previous equation
    this.PreviousEquation.splice(0,this.PreviousEquation.length);
    for (i; i < this.equationFrontEnd.length; i++) {
      this.PreviousEquation.push(this.equationFrontEnd[i]);
    }
    this.PreviousEquation.push('=');

    i = 0;

    //clears equation
    this.equation.equation.splice((this.equation.equation.length-1),1);

    //assigns front end value to equation
    this.equation.equation.push(this.equationFrontEnd.join(""))
    console.log(this.equation.equation)

    //clears front end equation
    this.equationFrontEnd.splice(0,this.equationFrontEnd.length);

    // POST request
    this.equationService.postEquation(this.equation).subscribe(
      (response) => this.equationFrontEnd.push(response.equation.join(""))
        && this.PreviousEquation.push(response.equation.join(""))
        && console.table(response),
      (error: any) => console.log(error),
      () => console.log('Done post equation'),
    )

    this.resulted = true

    // GET request
    // this.equationService.getEquation().subscribe(
    //   (response) => console.log(response),
    //   (error: any) => console.log(error),
    //   () => console.log('Done getting equation'),
    // );
  }

  MainDisplay() {
    if (this.equationFrontEnd[0] == 'NaN') {
      return 'Malformed expression'
    }
    else if (this.equationFrontEnd[0] == 'Infinity') {
      return 'Math error: dividing by 0'
    }
    else {
      return this.equationFrontEnd.join("");
    }
  }

  SecondDisplay() {
    return this.PreviousEquation.join("");
  }

  square() {

    if (this.resulted) {

      this.resulted = false;

      this.equationFrontEnd.push('²');
      console.log('Resulted: ' + this.resulted);
    }

    else {
      this.equationFrontEnd.push('²');
      console.log(this.equationFrontEnd);
    }
  }

  SquareRoute() {

    if ((this.equationFrontEnd[0] == '0') && this.equationFrontEnd.length == 1) {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
      this.equationFrontEnd.push('√');
      this.equationFrontEnd.push('(');
      console.log(this.equationFrontEnd);
    }

    else {
      this.equationFrontEnd.push('√');
      this.equationFrontEnd.push('(');
      console.log(this.equationFrontEnd);
    }

    if (this.resulted) {

      this.resulted = false;
      console.log(this.resulted);
    }
  }

  DM (event: MouseEvent) {

    //gets id
    const eventTarget: Element = event.target as Element;
    const elementId: string = eventTarget.id;

    let x: string = elementId;

    if (this.resulted) {
      this.resulted = false;
    }

    if (this.equationFrontEnd[this.equationFrontEnd.length -1] == '/') {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
      this.equationFrontEnd.push(x);
      console.log(this.equationFrontEnd);
    }
    else if (this.equationFrontEnd[this.equationFrontEnd.length -1] == 'X') {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
      this.equationFrontEnd.push(x);
      console.log(this.equationFrontEnd);
    }
    else {
      this.equationFrontEnd.push(x);
      console.log(this.equationFrontEnd);
    }
  }

  subtract() {

    if (this.resulted) {

      this.resulted = false;

      this.equationFrontEnd.push('-');
      console.log(this.equationFrontEnd);
    }

    else {
      this.equationFrontEnd.push('-');
      console.log(this.equationFrontEnd);
    }
  }

  add() {

    if (this.resulted) {
      this.resulted = false;
    }

    if (this.equationFrontEnd[this.equationFrontEnd.length -1] == '+' || this.equationFrontEnd[this.equationFrontEnd.length -1] == 'X' || this.equationFrontEnd[this.equationFrontEnd.length -1] == '/') {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
      this.equationFrontEnd.push('+');
      console.log(this.equationFrontEnd);
    }
    else if ((this.equationFrontEnd[this.equationFrontEnd.length -1] == '-' && this.equationFrontEnd[this.equationFrontEnd.length -2] == '+') || (this.equationFrontEnd[this.equationFrontEnd.length -1] == '-' && this.equationFrontEnd[this.equationFrontEnd.length -2] == '-')) {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-2),2);
      this.equationFrontEnd.push('+');
      console.log(this.equationFrontEnd);
    }
    else {
      this.equationFrontEnd.push('+');
      console.log(this.equationFrontEnd);
    }
  }

  clear() {

    this.equationFrontEnd.splice(0,this.equationFrontEnd.length);
    console.log(this.equationFrontEnd);
    this.equationFrontEnd.push('0');
  }

  delete() {

    this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
    console.log(this.equationFrontEnd);
    console.log(this.equationFrontEnd.length);

    if (0==this.equationFrontEnd.length) {
      this.equationFrontEnd.push('0');
    }
  }

  decimal() {

    //checks if array is a result and if so removes it
    if (this.resulted) {
      this.equationFrontEnd.splice(0,this.equationFrontEnd.length);
      this.equationFrontEnd.push('.');
      console.log(this.equationFrontEnd);
    }

    else {
      this.equationFrontEnd.push('.');
      console.log(this.equationFrontEnd);
    }

    //resets resulted
    this.resulted = false;
  }

  LeftBracket () {

    //deletes initial 0
    if ((this.equationFrontEnd[0] == '0') && this.equationFrontEnd.length == 1) {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
      console.log(this.equationFrontEnd);
      this.equationFrontEnd.push('(');
      console.log(this.equationFrontEnd.length);
    }

    //checks if array is a result and if so removes it
    else if (this.resulted) {
      this.equationFrontEnd.splice(0,this.equationFrontEnd.length);
      this.equationFrontEnd.push('(');
      console.log(this.equationFrontEnd);
    }

    else {
      this.equationFrontEnd.push('(');
      console.log(this.equationFrontEnd);
    }

    //resets resulted
    this.resulted = false;
  }

  RightBracket () {

    //deletes initial 0
    if ((this.equationFrontEnd[0] == '0') && this.equationFrontEnd.length == 1) {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
      console.log(this.equationFrontEnd);
      this.equationFrontEnd.push(')');
      console.log(this.equationFrontEnd.length);
    }

    //checks if array is a result and if so removes it
    else if (this.resulted) {
      this.equationFrontEnd.splice(0,this.equationFrontEnd.length);
      this.equationFrontEnd.push(')');
      console.log(this.equationFrontEnd);
    }

    else {
      this.equationFrontEnd.push(')');
      console.log(this.equationFrontEnd);
    }

    //resets resulted
    this.resulted = false;
  }

  Numbers (event: MouseEvent) {

    //gets id
    const eventTarget: Element = event.target as Element;
    const elementId: string = eventTarget.id;

    let x: string = elementId;

    //deletes initial 0
    if ((this.equationFrontEnd[0] == '0') && this.equationFrontEnd.length == 1) {
      this.equationFrontEnd.splice((this.equationFrontEnd.length-1),1);
      this.equationFrontEnd.push(x);
      console.log(this.equationFrontEnd);
    }

    //checks if array is a result and if so removes it
    else if (this.resulted) {
      this.equationFrontEnd.splice(0,this.equationFrontEnd.length);
      this.equationFrontEnd.push(x);
      console.log(this.equationFrontEnd);
    }

    else {
      this.equationFrontEnd.push(x);
      console.log(this.equationFrontEnd);
    }

    //resets resulted
    this.resulted = false;
  }
}
