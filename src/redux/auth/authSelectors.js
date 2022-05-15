import { createSelector } from 'reselect';

export const authSelector = (state) => state.firebase.auth;
export const authUserErrorSelector = (state) => state.auth.error;

export const authUidSelector = createSelector(authSelector, (auth) => auth.uid);
