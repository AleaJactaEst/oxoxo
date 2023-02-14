# Code Styles & Admin V2 Standards

Admin V2 application is developed with the Angular framework. 
Code styles and coding conventions applied in Admin V2 are mainly taken from the Angular style guides (Opinionated Angular style guide for teams by @john_papa) and are recommended for developing the Angular application.
The style guides can be found under the following link:
https://angular.io/guide/styleguide

When developing Admin V2 developers should keep in mind the style guides from the above link.

## Admin V2 specific style guides 
Indentation - 2 spaces (applies to all the files - .ts, .html, .scss)
Line length - 140 characters (exceptions are any strings with a length longer than 14 chars)

### Typescript

1. Single quotes should be used for all strings.
2. Imports
    - Angular and external imports always on top of the file
    - application imports below the Angular imports and external imports
    - Angular and other external imports should be separated by one empty line from the application imports
    - Imports should be grouped by angular imports, "rxjs" imports etc., this same applies to application imports where services should be grouped together, constants together, models together.

        Below is the example how the imports should be grouped:
        ```sh
        import { Component, OnInit } from '@angular/core';
        import { ActivatedRoute, Router } from '@angular/router';
        import { TranslateService } from '@ngx-translate/core';
        import { Subject } from 'rxjs';
        
        import { AuthService, UtilsService } from 'app/core/services';
        import { AdminService } from './admin.service';
        import { CommonConstants } from 'app/shared/constants';
        import { Image, MenuItem, UserDetails } from 'app/shared/models';
        ```
    
    - there should always be one space after and before curly brackets (closing and opening brackets)
        ```sh
        // wrong
        import {Component, OnInit} from '@angular/core';
        
        // correct
        import { Component, OnInit } from '@angular/core';
        ```

3. Naming convention

    Names should always be meaningful and they should describe the purpose of the file, component, service, property, method as best as possible, the name should always at least give a hint what the purpose of the particular functionality is.
Angular style docs reference: https://angular.io/guide/styleguide#naming

    - component selectors should be kebab case with the prefix ***exa*** (configured in Admin V2 configuration - angular.json)
    - components, services, pipes, directives names, files names - follow Angular style guides
    - method names - name the events without the ***on*** prefix, name event handler methods with the prefix ***on*** followed by the event name.
        ```sh
        // wrong
        .ts
        @Output() onSaveFruit = new EventEmitter<boolean>();
        onSaveFruit() { }
        
        .html
        <some-component (onSaveFruit)="onSaveFruit($event)"></some-component>
        
        
        // correct
        .ts
        @Output() saveFruit = new EventEmitter<boolean>();
        onSaveFruit() { }
        
        .html
        <some-component (saveFruit)="onSaveFruit($event)"></some-component>
        ```
    - methods arguments - (always name the properties and arguments by its names - be descriptive)
        ```sh
        // wrong
        fruits.map(a => { })
        
        // correct
        fruits.map(fruit => { })
        ```
 
4. Order (as below)
    - Inputs and Outputs should always be at the top of the component class
    - remaining properties of the class should be next - in first-order those that would be defined with decorators such as @HostBinding, @ViewChild etc.
    - class constructor
    - Angular hooks (in the order that angular hooks are instantiated)
    - public method
    - private methods
        ```sh
        /** list of fruits */
        @Input() fruits: Fruit[];
        /** emit event with fruit ID */
        @Output() selected = new EventEmitter<number>();

        /** reference to the fruit container html element */
        @ViewChild('fruitContainer') fruitContainer: ElementRef;

        selectedFruit: number;
        
        constructor() { }
        
        ngOnInit() { }
        ngAfterViewInit() { }
        ngOnDestroy() { }
        
        onSelectFruit(id: number): void { }
        private isFruitSelected(): boolean { }
        ```


5. Methods 
    - short functions - method should not contain more than 20-30 lines of code (more than 20 indicates that possibly there is a potential to split the method into few methods)
    - self-explanatory name
    - each method should take care of a single functionality
    - public methods docs are obligatory
    - if method receiving more than 3 arguments, it should use rest parameters or split into few methods.


6. Documentation - always give as much documentation as needed for particular functionality. You will find it useful when revisiting the same chunk of code sometime after.

    - Documentation should be included on top of each component, directive, service, pipe, interceptor describing the purpose of those functionalities.
        ```sh
        /**
         * This is a short description for this component
         */
        @Component({
          selector: 'some-component',
          templateUrl: './some-component.component.html',
          styleUrls: ['./some-component.component.scss']
        })
        export class SomeComponent implements OnInit {
        ...
        }
        ```
    - Every Input, Output, ViewChild, HostBinding etc. should have a doc included. The following format should be used (jsdocs like comment in one line):
        ```sh
        /** list of fruits */
        @Input() fruits: Fruit[];
        /** emit event with fruit ID */
        @Output() selected = new EventEmitter<number>();
        ```
    - The "rule of thumb" would be to include the docs for any property that require some explanation (when property name is not descriptive enough).
        ```sh
        /** list of fruits */
        fruits: Fruit[];
        /** the ID of the selected fruit */
        selectedFruitId: number;
        ```
        below example is also correct - it is acceptable not to document 'selectedFruitId' as this property is self explanatory
        ```sh
        /** list of fruits */
        fruits: Fruit[];
        selectedFruitId: number;
        ```
    - Public methods should always include docs. The docs for methods should be in the following format:
        ```sh
        /**
         * Get the list of fruits 
         *
         * @param filters used to query the fruits
         */
        getFruits(filters: FruitFilters): Observable<Fruit[]> {
            ...
        }
        ```
    - Private methods - although is not crucial to add the docs for a private method, it is recommended to do so. In cases where method name is not descriptive enough or the logic doesn't seem to be self-explanatory the docs should be always included.

    - Following format should be used for documenting properties - 1 line comments
    
        ```sh
        /** */
        ```
        ```sh
        /** list of fruits */
        @Input() fruits: Fruit[];
        /** emit event with fruit ID */
        @Output() selected = new EventEmitter<number>();
        ```
    - Following format should be used for making comments about the logic
        ```sh
        //
        ```
        ```sh
        onSelectFruit($event): void {
            // Reset apple property in order to...
            this.apple = 0;
        }
        ```

7. Types
    
    Types should be always provided for the properties and methods. 
Always avoid ***any*** type. 

    ```sh
     // wrong
    foo: any;
    
    // correct
    foo: string;
    ```

    ```sh
    // wrong
    isFruitNew(status) {
        return status === 'new';
    }
    
    // correct
    isFruitNew(status: string): boolean {
        return status === 'new';
    }
    ```

    ```sh
    // wrong
    setFruitName() {
        this.fruit = 'apple';
    }
    
    // correct
    setFruitName(): void {
        this.fruit = 'apple';
    }
    ```


8. Too long line formats - often when the line has more than 140 character it is necessary to break the line into multiple lines. Below are examples of how the code should be formatted when breaking into multiple lines.

    - imports
        ```sh
        import { 
            Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2
        } from '@angular/core';
        ```
        or
        ```sh
        import { 
            Component,
            OnInit,
            OnDestroy,
            AfterViewInit,
            ...
        } from '@angular/core';
        ```

    - methods arguments
        ```sh
        // wrong
        processFruits(fruits: Fruit[],
                      isNew: boolean,
                      ...more arguments
        ): void {
            ...some logic
        }
        
        // wrong
        processFruits(fruits: Fruit[],
                      isNew: boolean,
                      ...more arguments): void {
            ...some logic
        }
        
        // wrong
        processFruits(
            fruits: Fruit[],
            isNew: boolean,
            ...more arguments): void {
            ...some logic
        }
        
        // correct
        processFruits(
            fruits: Fruit[],
            isNew: boolean,
            ...more arguments
        ): void {
            ...some logic
        }
        ```

    - array items
        ```sh
        // wrong
        const array = [
            item1, item2, item3, ...];
            
        // wrong
        const array = [
            item1,
            item2,
            item3];
        
        // correct
        const array = [
            item1, item2, item3, ...
        ];
        
        // correct - line longer that 140 characters
        const array = [
            item1,
            item2,
            item3,
            ...
        ];
        ```

    - ternary operator
        ```sh
        // wrong
        const isNewFruit = fruit.status === 'new' ?
            this.eatFruit() : this.binFruit();
            
        // wrong
        const isNewFruit = fruit.status === 'new' ?
        this.eatFruit() : this.binFruit();
        
        // correct
        const isNewFruit = fruit.status === 'new' ?
            this.eatFruit() :
            this.binFruit();
        ```
    
9. Destructuring - always give spaces when destructuring objects
    ```sh
    // wrong
    const {apple} = fruits;
    
    // correct
    const { apple } = fruits;
    ```
        
    ```sh
    // wrong
    const [apple, grape] = fruits;
        
    // correct
    const [ apple, grape ] = fruits;
    ```
    
10. When programmatically building up strings, use template strings instead of concatenation.
    ```sh
    // wrong
    const foo = 'This is my ' + name;
    
    // correct
    const foo = `This is my ${name}`;
    ```
    
11. Spaces
    - do not add spaces between square brackets
        ```sh
        // wrong
        const fruits = [ apple, grape, orange ];
        console.log(fruits[ 0 ]);
        
        // correct
        const fruits = [apple, grape, orange];
        console.log(fruits[0]);
        ```
    
    - do add spaces inside curly brackets
        ```sh
        // wrong
        const fruits = {apple: 0}; 
        
        // correct
        const fruits = { apple: 0 }; 
        ```
        
12. Conditional Statements
    - always use curly braces to wrap the condition block 
        ```sh
        // wrong
        if (fruit.apple === 0) return 'something';
        
        // wrong
        if (fruit.apple === 0)
            return 'something';
        
        // correct
        if (fruit.apple === 0) {
            return 'something';
        }
        ```
    - for one line simple conditional statements use ternary operator
        ```sh
        // correct
        const foo = fruit.apple === 0 ? 'this' : 'that';
        ```
    - avoid unneeded ternary statements
        ```sh
        // wrong
        const foo = a ? a : b;
        const bar = c ? true : false;
        const baz = c ? false : true;
        
        // correct
        const foo = a || b;
        const bar = !!c;
        const baz = !c;
        ```
    

#### HTML
1. The indentation and line length is this same in HTML as in TypeScript files, 2 spaces, and 140 characters.

2. In the case when the HTML line is longer than 140 characters the line should be broken down by attributes. The ***Admin V2*** standard is to always keep the native HTML attributes in the first line and angular properties broken down into multiple lines.

    ```sh
    <some-component id="fruits-list-container" class="spacer-top spacer-bottom"
      *ngIf="fruits.length"
      [fruits]="newFruits"
      (saveFruit)="onSaveFruit($event)">
    </some-component>
    ```
    
    This format is also acceptable when breaking down into multiple lines:
    ```sh
    <some-component id="fruits-list-container" class="spacer-top spacer-bottom"
                    *ngIf="fruits.length"
                    [fruits]="newFruits"
                    (saveFruit)="onSaveFruit($event)">
    </some-component>
    ```

3. Closing HTML tag should be always in the new line when breaking down the attributes.

    ```sh
    // wrong
    <some-component id="fruits-list-container" class="spacer-top spacer-bottom"
      *ngIf="fruits.length"
      [fruits]="newFruits"
      (saveFruit)="onSaveFruit($event)"></some-component>
    
    // correct
    <some-component id="fruits-list-container" class="spacer-top spacer-bottom"
      *ngIf="fruits.length"
      [fruits]="newFruits"
      (saveFruit)="onSaveFruit($event)">
    </some-component>
    ```

4. Closing chevron of the opening HTML tag should be always in the same line as the last broken down attribute.
    ```sh
    // wrong
    <some-component id="fruits-list-container" class="spacer-top spacer-bottom"
      *ngIf="fruits.length"
      [fruits]="newFruits"
      (saveFruit)="onSaveFruit($event)"
    >
    </some-component>
    
    // correct
    <some-component id="fruits-list-container" class="spacer-top spacer-bottom"
      *ngIf="fruits.length"
      [fruits]="newFruits"
      (saveFruit)="onSaveFruit($event)">
    </some-component>
    ```

5. Class, Id and Attributes names should always be kebab case.
    ```sh
    // wrong
    <div class="fruitsListContainer"></div>
    
    // wrong
    <div class="fruits_list_container"></div>
    
    // correct
    <div class="fruits-list-container"></div>
    ```
    
6. Interpolation - when using interpolation binding there should be one space after and one space before the interpolation brackets
    ```sh
    // wrong
    <p>{{fruitName}}</p>
    
    // correct
    <p>{{ fruitName }}</p>
    ```

#### CSS
1. Indentation 2 spaces
2. Naming convention - classes and id's should always be kebab case


#### Tests
For writing unit test we are using Karma and Jasmine as provided by default by Angular CLI.

Use ***describe*** block to define a test suite (a group of related tests)
Use ***it*** block to define a single unit test

1. Always describe the unit test properly, unit tests that names are well described are somewhat criteria requirements.
    ```sh
    // wrong
    it('should test selectFruit method', () => {
        ...
    });
    
    // wrong
    it('should select a single fruit', () => {
        ...
    });
    ```

2. Triple "A"
Arrange - initialisation the system for the test
Act - often involves calling a method or function
Assert - test assertion

    As the best practice always put a vertical line between each "A" step.
    ```sh
    it('should select a single fruit', () => {
        // Arrange
        const component = new FruitComponent();
        const fruitIdToBeSelected = 2;
        
        // Act
        component.selectFruit(fruitIdToBeSelected);
        
        // Assert
        expect(component.selectedFruitId).toBe(fruitIdToBeSelected);
    });
    ```

3. Testing shared components
When testing shared components in Admin V2 there should be always two types of unit tests provided. One for the component class and the other for the template.     - Component Class Test - testing only functionality in the class itself. The main describe block name should be in the following format:
    ```sh
    describe('SomeComponent:class', () => {
        ...
    });
    ```
    - Component Template Test - usage of a dummy component in the test in order to test all the Inputs and Outputs available in the component. The main describe block name should be in the following format:
    ```sh
    describe('SomeComponent:template', () => {
        ...
    });
    ```
    Example for how to use dummy component to set up the test (in the template test we are always testing TestHostComponent (dummy component) that we set up in the unit test. 
    ```sh
    @Component({
        template: `<some-component [height]="elHeight" (select)="onSelectSomething()"></exa-centered-wrapper>`
    })
    class TestHostComponent {
        elHeight: number;
        onSelectSomething() { }
    }

    describe('SomeComponent:template', () => {
        ...
    });
    ```

#### PR
1. Each PR should have approvals of two reviewers in order to merge the feature to the development branch.
2. Validate the design and functionality with the QA
3. Review your own code before making PR
4. The screenshot should be included with each PR for the functionality that involves UI changes

