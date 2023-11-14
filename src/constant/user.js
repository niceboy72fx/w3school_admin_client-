export const USER_STATUS = {
    ACTIVE: 1,
    INACTIVE: 2,
};

export const USER_ROLES_CMS = {
    ADMIN: 1,
    EDITOR: 2,
};

export const USER_ROLES_CLIENT = {
    USER: 3,
};

export const USER_ROLES = {
    ...USER_ROLES_CMS,
    ...USER_ROLES_CLIENT,
};
