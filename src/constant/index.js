import {COURSE_STATUS} from "./courseStatus";
import {USER_STATUS} from "./userStatus";
import {ROLE} from "./role";

function ucfirst(string){
    return string !== undefined ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : 123;
}

export function mapCourseStatus(value){
    return ucfirst(Object.keys(COURSE_STATUS).find(key => COURSE_STATUS[key] === value));
}

export function mapUserStatus(value){
    return ucfirst(Object.keys(USER_STATUS).find(key => USER_STATUS[key] === value));
}

export function mapUserRoles(value){
    return value.map(role => ucfirst(Object.keys(ROLE).find(key => ROLE[key] === role))).toString();
}