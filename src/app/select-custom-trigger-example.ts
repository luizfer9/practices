import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormArray,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/** @title Select with custom trigger text */
@Component({
  selector: "select-custom-trigger-example",
  templateUrl: "select-custom-trigger-example.html",
  styleUrls: ["select-custom-trigger-example.css"]
})
export class SelectCustomTriggerExample implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = ["Extra cheese", "Mushroom"]; //,'Pepperoni', 'Sausage', 'Tomato'];
  toppingArray = new FormArray([]);
  agrega: boolean = false;
  registroGroup: FormGroup;
  respaldoArray: FormArray;

  constructor(private fb: FormBuilder) {
    this.registroGroup = this.fb.group({
      nombreControl: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.pattern('^[a-zA-Z ]*$')
        ]
      )
    });
  }

  ngOnInit() {
    this.toppingList.map(ing => {
      let index = this.toppingList.indexOf(ing);
      this.toppingArray.push(
        new FormControl(this.toppingList[index], [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.pattern('^[a-zA-Z ]*$')
        ])
      );
    });
  }

  eliminaRegistro() {
    let indexValue;

    indexValue = this.toppingList.indexOf(this.toppings.value.toString());
    this.toppingArray.removeAt(indexValue);
    this.respaldoArray = this.toppingArray;
    this.toppingList = this.toppingArray.value;
  }
  disabledButton() {
    let verify: boolean = false;
    if (this.toppingList.length < 3) {
      verify = true;
    }
    return verify;
  }
  agregarRegistro() {
    let newControl;
    newControl = this.registroGroup.controls['nombreControl'];
    this.toppingArray.push(newControl);
    this.toppingList = this.toppingArray.value;
    this.registroGroup.removeControl('nombreControl')
    this.registroGroup = this.fb.group({
      nombreControl: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.pattern('^[a-zA-Z ]*$')
        ]
      )
    });
  }
  isControlHasError(controlName: string, type: string) {
    let control = this.registroGroup.controls['nombreControl'];

    if (!control) {
      return false;
    }

    return control.hasError(type) && (control.dirty || control.touched);
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
