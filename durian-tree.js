class Employee {
    constructor(name, title, salary) {
        this.name = name;
        this.title = title;
        this.salary = salary;
        this.boss = null;
        this.subordinates = [];
    }
    
    addSubordinate(subordinate) {
        this.subordinates.push(subordinate);
        subordinate.boss = this;
      }
    
    get numberOfSubordinates() {
        return this.subordinates.length;
    }

    get numberOfPeopleToCEO() {
        let numberOfPeople = 0;
        let currentEmployee = this;
    
        // climb "up" the tree (using iteration), counting nodes, until no boss is found
        while (currentEmployee.boss) {
          currentEmployee = currentEmployee.boss;
          numberOfPeople++;
        }
    
        return numberOfPeople;
      }

    hasSameBoss(employee) {
        return this.boss === employee.boss;
    }

    employeesThatMakeOver(amount) {

        let employees = []; // 1
    
        if (this.salary > amount) {
          employees.push(this); // 2
        }
    
        for (const subordinate of this.subordinates) {
          const subordinatesThatMakeOver = subordinate.employeesThatMakeOver(amount); // 3
          employees = employees.concat(subordinatesThatMakeOver);
        }
    
        return employees;
    }

    get totalEmployees() {

        let totalEmployees = 1; // 1
    
        // Use depth first traversal to calculate the total employees
        for (const subordinate of this.subordinates) {
            subordinate.totalEmployees; // 2
            totalEmployees++
        }
    
        return totalEmployees;
    
    }
}

const ada = new Employee("Ada", "CEO", 3000000.00);

const craig    = new Employee("Craig", "VP Software", 1000000);
const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
const angela   = new Employee("Angela", "VP Retail", 1000000);
const phil     = new Employee("Phil", "VP Marketing", 1000000);
const smith    = new Employee("Smith", "AVP Software", 500000);

ada.addSubordinate(craig);
ada.addSubordinate(arvinder);
ada.addSubordinate(angela);
ada.addSubordinate(phil);
craig.addSubordinate(smith);

console.log(craig.boss.name);
console.log(craig.numberOfSubordinates);
console.log(craig.numberOfPeopleToCEO);
console.log(craig.hasSameBoss(arvinder));

let wealthyEmployees = ada.employeesThatMakeOver(418401);

console.log(wealthyEmployees);

// Returns the total number of employees in the entire company.
console.log(ada.totalEmployees);
// Returns the total number of employees working in software development.
console.log(craig.totalEmployees);