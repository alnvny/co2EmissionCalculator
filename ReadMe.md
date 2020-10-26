# CO2 emission calculator


A simple program that returns the amount of CO2-equivalent that will be caused when traveling between two cities using a given transportation method.

  - Technology
  - Installation
  - Execution
  - Example
  - Test
 
### Technology
These are the technologies used to develop the program:
* Node.js for program development
* commander.js module for node.js command line interface
* Jasmine for unit test

### Installation
These are the prerequisite to setup the program:
* Node.js v12+
* npm v6+


Setup instructions:
(Steps with referance to Windows OS)
* Download the co2EmissionCalculator.zip file and unzip it
* open the command prompt with the co2EmissionCalculator folder path (make sure you are in the right path where you have the co2-calculator.js file)
* execute   ``` npm install ```
* installation successful if no issues in this process

### Execution
Program can be executed with the below command in the command prompt of the same folder path.
```sh
>node co2-calculator.js --start Berlin  --end Munich  --transportation-method bus
```
  or 
  ```sh
>node co2-calculator.js --start=Berlin  --end=Munich  --transportation-method= bus
```

* Named parameters can be mentioned in any order
* Either use a space ( ) or equal sign ( = ) between key and value are allowed
* The program has a strong validation mechanism which will validate for empty named parameters and some common invalid charecters 
* The program will return **Your trip caused 0kg of CO2-equivalent.** if the start and end location are same
* The program will return **{{non-listed-vahicle }}transportation-method is not supported** if the transportation-method is not in the list below
    * small-diesel-car 
    * small-petrol-car 
    * small-plugin-hybrid-car
    * small-electric-car
    * medium-diesel-car" 
    * medium-petrol-car
    * medium-plugin-hybrid-car 
    * medium-electric-car 
    * large-diesel-car
    * large-petrol-car
    * large-plugin-hybrid-car 
    * large-electric-car
    * bus 
    * train

### Example
These are some of the examples and results of the execution of the program 
```sh
>node co2-calculator.js  --start Berlin  --end Munich  --transportation-method bus
>Your trip caused 15.81kg of CO2-equivalent.
```
(Note: sucessfully executes and returns the CO2-eqivalent for the travel between Berlin and Munich)
```sh
>node co2-calculator.js --start --end Munich --transportation-method bus
>required option '--end <end>' not specified
```
(Note: --start = "--end", so the program will not have a --end argument)

```sh
>node co2-calculator.js --start Berlin! --end Munich --transportation-method bus
>error: start location has invalid charecters in pattern /[/\\:*?@#$%!{}(),.+~"<>|]/
```
(Note: --start value 'Berlin!' which has a special character "!"

### Testing
You can run the test suite using the below command in the command prompt of the same folder path.
```sh
>npm test
```
* The above command will run the spec files in the spec folder
* All functions in the program are unit tested


**Developer : Gnana Allan Whinney GnanaPragasam, Chennai, India.**

