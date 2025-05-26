interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number;
    location: string;
    [newprop:string]: any;
};

interface Directors extends Teacher {
    numberOfReports: number;
}

interface printTeacherFunction {
    (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName, lastName) => {
    return `${firstName.charAt(0)}. ${lastName}`;
}

interface studentClassConstructor {
    new(firstName: string, lastName: string): StudentClassInterface
}

interface StudentClassInterface{
    workOnHomework(): string;
    displayName(): string 
}

class StudentClass implements StudentClassInterface {
    constructor(public firstName: string, public lastName: string) {}

    workOnHomework(): string {
        return "Currently working"
    }

    displayName(): string {
        return this.firstName;
    }

}

const teacher3: Teacher = {
  firstName: 'John',
  fullTimeEmployee: false,
  lastName: 'Doe',
  location: 'London',
  contract: false,
};

const director1: Directors = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
};

console.log(teacher3);
console.log(director1);
console.log(printTeacher('John', 'doe'));

const student = new StudentClass("article", "49.3")
console.log(student.displayName());
console.log(student.workOnHomework());