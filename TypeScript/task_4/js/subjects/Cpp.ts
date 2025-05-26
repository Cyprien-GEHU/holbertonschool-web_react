/// <reference path="./Teacher.ts"/>
/// <reference path="./React.ts"/>
/// <reference path="./Subject.ts"/>
/// <reference path="./Java.ts"/>

namespace Subjects {
    export interface Teacher {
        experienceTeachingC?: Number;
    }

    export class Cpp extends Subject {

        getRequirements(): string {
            return 'Here is the list of requirements for Cpp';
        }
        
        getAvailableTeacher(): string {
            if (this.teacher.experienceTeachingC > 0) {
                return `Available Teacher: ${this.teacher.firstName}`;
            } else {
                return 'No available teacher';
            }
        }
    }
}