import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall} from './ajaxStatusActions';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course};
}

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses};
}

export function updateCoursesSuccess(course) {
    return { type: types.UPDATE_COURSES_SUCCESS, course};
}

export function createCoursesSuccess(course) {
    return { type: types.CREATE_COURSES_SUCCESS, course};
}
export function loadCourses() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveCourses(courseNew) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(courseNew).then(course => {
            courseNew.id ? dispatch(updateCoursesSuccess(course)) :
            dispatch(createCoursesSuccess(course));
        }).catch(error => {
            throw(error);
        });
    };
}