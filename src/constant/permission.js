export const PERMISSION_GROUP_LOGIN = {
    LOGIN_CMS: 'CMS',
    LOGIN_CLIENT: 'Client',
}

export const PERMISSION_GROUP_COURSE = {
    // VIEW_COURSE_APPROVED:"View course approved",
    // VIEW_COURSE_PENDING:"View course pending",
    // VIEW_COURSE_REJECTED:"View course rejected",
    COURSE_VIEW:"View",
    COURSE_UPDATE:"Update",
    COURSE_CREATE:"Create",
    COURSE_APPROVE:"Approve",
}

export const PERMISSION_GROUP_ACCOUNT = {
    MANAGE_ACCOUNT:"Manage account",
    MANAGE_ACCOUNT_CMS:"Manage account cms",
    MANAGE_ACCOUNT_CLIENT:"Manage account client",
}

export const PERMISSION = {
    LOGIN: {...PERMISSION_GROUP_LOGIN},
    COURSE: {...PERMISSION_GROUP_COURSE},
    ACCOUNT: {...PERMISSION_GROUP_ACCOUNT},
}