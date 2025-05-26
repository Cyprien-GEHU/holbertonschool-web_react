interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
};

const student1: Student = {
    firstName: "leo",
    lastName: "carpachio",
    age: 30,
    location: "italie"
};

const student2: Student = {
    firstName: "gustave",
    lastName: "effel",
    age: 33,
    location: "lumiere"
};

const studentsList: Student[] = [student1, student2];

console.log(studentsList);