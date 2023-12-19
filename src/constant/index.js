import {COURSE_LEVEL, COURSE_STATUS} from "./course";
import {USER_STATUS} from "./user";
import {ROLE} from "./role";
import {PERMISSION} from "./permission";
import {CATEGORY_STATUS} from "./category";
function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export function mapCourseStatus(value){
    return ucFirst(Object.keys(COURSE_STATUS).find(key => COURSE_STATUS[key] === value));
}
export function mapCourseLevel(value){
    return ucFirst(Object.keys(COURSE_LEVEL).find(key => COURSE_LEVEL[key] === value));
}

export function mapUserStatus(value){
    return ucFirst(Object.keys(USER_STATUS).find(key => USER_STATUS[key] === value));
}

export function mapUserRoles(value){
    return value.map(role => ucFirst(Object.keys(ROLE).find(key => ROLE[key] === role))).join(', ');
}

export function mapUserPermissions(value){
    return value.map(permission => PERMISSION[permission.toUpperCase()]);
}

export function mapCategoryStatus(value){
    return ucFirst(Object.keys(CATEGORY_STATUS).find(key => CATEGORY_STATUS[key] === value));
}