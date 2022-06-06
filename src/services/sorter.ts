/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */

export const sortByCreation = <T extends Record<any, any>>(a: T, b: T) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

export const sortByLastChange = <T extends Record<any, any>>(a: T, b: T) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
