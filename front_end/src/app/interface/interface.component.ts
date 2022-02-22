import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})


export class InterfaceComponent implements OnInit {

  equation: string[] = ['0'];
  result: number = 0;
  PreviousEquation: string[] = [];

  resulted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  evaluate() {
    console.log('evaluate')
  }

  MainDisplay() {
    if (this.equation[0] == 'NaN') {
      return 'Malformed expression'
    }
    else if (this.equation[0] == 'Infinity') {
      return 'Math error: dividing by 0'
    }
    else {
      return this.equation.join("");
    }
  }

  SecondDisplay() {
    return this.PreviousEquation.join("");
  }

  square() {
    if (this.resulted) {

      this.resulted = false;

      this.equation.push('²');
      console.log('Resulted: ' + this.resulted);
    }

    else {
      this.equation.push('²');
      console.log(this.equation);
    }
  }

  SquareRoute() {

    if ((this.equation[0] == '0') && this.equation.length == 1) {
      this.equation.splice((this.equation.length-1),1);
      this.equation.push('√');
      this.equation.push('(');
      console.log(this.equation);
    }

    else {
      this.equation.push('√');
      this.equation.push('(');
      console.log(this.equation);
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

    if (this.equation[this.equation.length -1] == '/') {
      this.equation.splice((this.equation.length-1),1);
      this.equation.push(x);
      console.log(this.equation);
    }
    else if (this.equation[this.equation.length -1] == 'X') {
      this.equation.splice((this.equation.length-1),1);
      this.equation.push(x);
      console.log(this.equation);
    }
    else {
      this.equation.push(x);
      console.log(this.equation);
    }
  }

  subtract() {

    if (this.resulted) {

      this.resulted = false;

      this.equation.push('-');
      console.log(this.equation);
    }

    else {
      this.equation.push('-');
      console.log(this.equation);
    }
  }

  add() {

    if (this.resulted) {
      this.resulted = false;
    }

    if (this.equation[this.equation.length -1] == '+' || this.equation[this.equation.length -1] == 'X' || this.equation[this.equation.length -1] == '/') {
      this.equation.splice((this.equation.length-1),1);
      this.equation.push('+');
      console.log(this.equation);
    }
    else if ((this.equation[this.equation.length -1] == '-' && this.equation[this.equation.length -2] == '+') || (this.equation[this.equation.length -1] == '-' && this.equation[this.equation.length -2] == '-')) {
      this.equation.splice((this.equation.length-2),2);
      this.equation.push('+');
      console.log(this.equation);
    }
    else {
      this.equation.push('+');
      console.log(this.equation);
    }
  }

  clear() {
    this.equation.splice(0,this.equation.length);
    console.log(this.equation);
    this.equation.push('0');
  }

  delete() {
    this.equation.splice((this.equation.length-1),1);
    console.log(this.equation);
    console.log(this.equation.length);

    if (0==this.equation.length) {
      this.equation.push('0');
    }
  }

  decimal() {

    //checks if array is a result and if so removes it
    if (this.resulted) {
      this.equation.splice(0,this.equation.length);
      this.equation.push('.');
      console.log(this.equation);
    }

    else {
      this.equation.push('.');
      console.log(this.equation);
    }

    //resets resulted
    this.resulted = false;
  }

  LeftBracket () {
    //deletes initial 0
    if ((this.equation[0] == '0') && this.equation.length == 1) {
      this.equation.splice((this.equation.length-1),1);
      console.log(this.equation);
      this.equation.push('(');
      console.log(this.equation.length);
    }

    //checks if array is a result and if so removes it
    else if (this.resulted) {
      this.equation.splice(0,this.equation.length);
      this.equation.push('(');
      console.log(this.equation);
    }

    else {
      this.equation.push('(');
      console.log(this.equation);
    }

    //resets resulted
    this.resulted = false;
  }

  RightBracket () {
    //deletes initial 0
    if ((this.equation[0] == '0') && this.equation.length == 1) {
      this.equation.splice((this.equation.length-1),1);
      console.log(this.equation);
      this.equation.push(')');
      console.log(this.equation.length);
    }

    //checks if array is a result and if so removes it
    else if (this.resulted) {
      this.equation.splice(0,this.equation.length);
      this.equation.push(')');
      console.log(this.equation);
    }

    else {
      this.equation.push(')');
      console.log(this.equation);
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
    if ((this.equation[0] == '0') && this.equation.length == 1) {
      this.equation.splice((this.equation.length-1),1);
      this.equation.push(x);
      console.log(this.equation);
    }

    //checks if array is a result and if so removes it
    else if (this.resulted) {
      this.equation.splice(0,this.equation.length);
      this.equation.push(x);
      console.log(this.equation);
    }

    else {
      this.equation.push(x);
      console.log(this.equation);
    }

    //resets resulted
    this.resulted = false;
  }
}
