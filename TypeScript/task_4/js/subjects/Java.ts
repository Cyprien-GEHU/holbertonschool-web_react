/// <reference path="./Teacher.ts"/>
/// <reference path="./React.ts"/>
/// <reference path="./Subject.ts"/>
/// <reference path="./Cpp.ts" />

namespace Subjects {
    export interface Teacher {
        experienceTeachingJava?: number;
    }

    export class JavaClass extends Subject {

        getRequirements(): string {
            return 'Here is the list of requirements for Java';
        }

        getAvailableTeacher(): string {
            if (this.teacher.experienceTeachingJava > 0) {
                return `Available Teacher: ${this.teacher.firstName}`;
            } else {
                return 'No available teacher';
            }
        }
    }
}