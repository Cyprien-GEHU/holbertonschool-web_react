/// <reference path="./Cpp.ts" />
/// <reference path="./Teacher.ts"/>
/// <reference path="./React.ts"/>
/// <reference path="./Java.ts"/>

namespace Subjects {
    export class Subject {
        teacher: Teacher;
        
        set setTeacher(teacher: Teacher) {
            this.teacher = teacher;
        }
    }
}