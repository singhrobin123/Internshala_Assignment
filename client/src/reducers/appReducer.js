import {
    GET_ERRORS,
    SET_USER_LOGOUT,
    SET_CUSTOMER_LOGIN,
    SET_AUTH,
    SET_ALL_COURSES,
    SOMETHING_WRONG,
    USER_LOADING,
    SET_USER
} from "../actions/types";


const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    UserCourse: [],
    allCourses: [],
    loading: false,
    authResponseIdentifer: 0,
    history: [],
    historyResponseIdentifer: 0,
    setAllCoursesResponseIdentifer: 0,
    s_id: null,
    courses: [],
    errorMessage: null,
    logoutResponseIdentifer: 0,
    serverError: null,
    setUserCoursesResponseIdentifer: 0,
    courseFlag: false

};
//this.props.history.push()
export default function(state = initialState, action) {
    switch (action.type) {

        case SET_ALL_COURSES:
            console.error("Get 123 ", action.payload);
            return {
                ...state,
                allCourses: action.payload,
                setAllCoursesResponseIdentifer: (state.setAllCoursesResponseIdentifer) + 1
            };
        case SET_USER:
            console.error("Get 123 ", action.payload);
            return {
                ...state,
                UserCourse: action.payload.print,
                allCourses: action.payload.ans,
                setUserCoursesResponseIdentifer: (state.setUserCoursesResponseIdentifer) + 1
            };
        case SET_AUTH:
            console.error("SOME Auth", action.payload);
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                s_id: action.payload.s_id,
                authResponseIdentifer: (state.authResponseIdentifer + 1)
            };
        case SOMETHING_WRONG:
            console.error("SOME", action.payload);
            return {
                ...state,
                courseFlag: action.payload.Course,
                errorMessage: action.payload.message,
                serverError: action.payload,
                s_id: action.payload.s_id
            };

        case SET_USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                s_id: null,
                user: null,
                logoutResponseIdentifer: (state.logoutResponseIdentifer + 1)
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
