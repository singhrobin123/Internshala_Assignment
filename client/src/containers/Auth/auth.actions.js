import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
	GET_ERRORS, SET_AUTH, SET_ALL_COURSES, SOMETHING_WRONG, SET_USER_LOGOUT, SET_USER
}
from "./auth.constants.js";
import {
	formatDate
}
from "../../utility";
export const getUserCourses = (s_id) => (dispatch) => {
					
					const apiEndPoint = "http://localhost:8000/getUserCourses";
					axios.post(apiEndPoint, {
						's_id': s_id
					}).then((res) => {
						let User = res.data.data.data.User;
						
						let c = [];
						let data = res.data.data.data.courses;
						data.map(x => c.push({
							course_id: x.course_id,
							name: x.name
						}));
						const key = 'course_id';
						const arrayUniqueByKey = [...new Map(c.map(item => [item[key], item])).values()];
						let ans = [];
						for(let i = 0; i < arrayUniqueByKey.length; i++) {
							let y = arrayUniqueByKey[i];
							let tmp = [];
							data.map(x => {
								if(x.course_id == y.course_id) tmp.push({
									batch_id: x.batch_id,
									date: formatDate(x.date)
								});
							})
							ans.push({
								course_id: y.course_id,
								name: y.name,
								batch: tmp
							});
						}
					
						
						let print = [];
						for(let i = 0; i < ans.length; i++) {
							let x = ans[i].course_id;
							let flag = 0;
							let z = 0;
							for(let j = 0; j < User.length; j++) {
								let y = User[j].course_id;
								if(y == x) {
									flag = 1;
									z = j;
									break;
								}
							}
							if(flag == 1) {
								print.push({
									'name': ans[i].name,
									'date': User[z].date,
									'is_paid': User[z].is_paid
								});
							} else {
								print.push({
									'name': ans[i].name,
									'date': null,
									'is_paid': null
								});
							}
						}
						
						dispatch(setUser({
							User, ans, print
						}));
					}).catch((err) => {
						
						dispatch({
							type: GET_ERRORS,
							payload: err.response,
						})
					});
};
export const getAllCourses = () => (dispatch) => {
					
						const apiEndPoint = "http://localhost:8000/getCourses";
						axios.get(apiEndPoint).then((res) => {
							
							let c = [];
							let data = res.data.data.data;
							data.map(x => c.push({
								course_id: x.course_id,
								name: x.name
							}));
							const key = 'course_id';
							const arrayUniqueByKey = [...new Map(c.map(item => [item[key], item])).values()];
							let ans = [];
							for(let i = 0; i < arrayUniqueByKey.length; i++) {
								let y = arrayUniqueByKey[i];
								let tmp = [];
								data.map(x => {
									if(x.course_id == y.course_id) tmp.push({
										batch_id: x.batch_id,
										date: formatDate(x.date)
									});
								})
								ans.push({
									course_id: y.course_id,
									name: y.name,
									batch: tmp
								});
							}
							
							dispatch(setCourses(ans));
						}).catch((err) => {
						
							dispatch({
								type: GET_ERRORS,
								payload: err.response,
							})
						});
};
export const getAllLoginUserCourses = (data) => (dispatch) => {
					
					const apiEndPoint = "http://localhost:8000/getCourses";
					axios.get(apiEndPoint).then((res) => {
						
						let obj = {};
						if(res && res.data) res && res.data.data && res.data.data.map(course => {
							
							let courseObj = {
								name: course.name,
								batch_id: course.batch_id,
								date: course.date
							};
							if(obj[course.course_id]) {
								obj[course.course_id].push(courseObj);
							} else {
								obj[course.course_id] = [courseObj];
							}
						})
						
						dispatch(setCourses(obj));
					}).catch((err) => {
					
						dispatch({
							type: GET_ERRORS,
							payload: err.response.data,
						})
					});
};
export const authUserLogin = (userData) => dispatch => {
				
				const apiEndPoint = "http://localhost:8000/login";
				axios.post(apiEndPoint, (userData)).then(res => {
					
					if(res.data.data.data.flag) {
						localStorage.setItem("isAuth", res.data.data.data.s_id);
						dispatch(setAuth(res.data.data.data));
					} else {
						dispatch(authWrong(res.data.data.data));
					}
				}).catch(err => { 
					dispatch({
						type: GET_ERRORS,
						payload: null
					})
				});
};
export const authUserRegister = (userData) => dispatch => {
					
					//	debugger;
					const apiEndPoint = "http://localhost:8000/register";
					axios.post(apiEndPoint, userData).then(res => {
						
						//	debugger
						if(res.data.data.data.flag) {
							localStorage.setItem("isAuth", res.data.data.data.s_id);
							dispatch(setAuth(res.data.data.data));
						} else {
							dispatch(authWrong(res.data.data.data));
						}
					}).catch(err => {
						dispatch({
							type: GET_ERRORS,
							payload: null
						})
					});
};
export const logoutUser = () => dispatch => {
	// Remove token from local storage
		localStorage.removeItem("jwtToken");
		localStorage.removeItem("isAuth");
		//  setAuthToken(false);
		dispatch(setCurrentLogout());
};
export const setStore = () => dispatch => {
		let accessToken = localStorage.getItem("jwtToken");
		// Set token to Auth header
		setAuthToken(accessToken);
		// Decode token to get user data
		const decoded = jwt_decode(accessToken);
		// Set current user
		let type = decoded.type;
		dispatch(setCurrentUser({
			decoded, userCartId
		}));
};
// Set logged in user
export const setCurrentLogout = () => {
		
		return {
			type: SET_USER_LOGOUT
		};
};
export const setAuth = data => {
	
		return {
			type: SET_AUTH,
			payload: data
		};
};
export const authWrong = data => {
		return {
			type: SOMETHING_WRONG,
			payload: data
		};
};
export const setCourses = (decoded) => {
		return {
			type: SET_ALL_COURSES,
			payload: decoded,
		};
};
export const setUser = (decoded) => {
		return {
			type: SET_USER,
			payload: decoded,
		};
};
