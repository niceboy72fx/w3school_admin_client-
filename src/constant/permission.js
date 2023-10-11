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
    ACCOUNT_CMS_VIEW:"Account cms view",
    ACCOUNT_CMS_UPDATE:"Account cms view",
    ACCOUNT_CMS_CREATE:"Account cms view",
    ACCOUNT_CLIENT_VIEW:"Account cms view",
    ACCOUNT_CLIENT_CLOSURE:"Account cms view",
}

export const PERMISSION = {
    LOGIN: {...PERMISSION_GROUP_LOGIN},
    COURSE: {...PERMISSION_GROUP_COURSE},
    ACCOUNT: {...PERMISSION_GROUP_ACCOUNT},
}