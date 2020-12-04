import React, { Component } from "react";
import "../../include/css/main.css";
import { authUserRegister,setStore } from "./auth.actions";
import { connect } from "react-redux";
import { getAllCourses} from "./auth.actions";
import Item from "./Item";

class Register extends Component {
    constructor(props) {
        super();
        this.state = {
			isAuth : false,
			email: null,
			password: null,
			first_name:null,
			last_name:null,
			select_courses : null,
			select_batch : null,
			student_id : null,
			objective_learning:"Gain a new skill",
			courses : null,
            batch: [],
			data:null ,
			message:"",
			emailError:false,
			courseError:false          
        };
	}
	
	onBlurHandler = ({target}) =>{

		console.error("called blur",target.name);
		if(target.name == "email"  || target.name == "select_courses"){
		if(localStorage.getItem("isAuth") == null){
			this.props.authUserRegister({ email:this.state.email,password: this.state.password, first_name: this.state.first_name, last_name:this.state.last_name,select_batch:this.state.select_batch,objective_learning:this.state.objective_learning,select_courses:this.state.select_courses,flag : 1});
		}
	  else{
		this.props.authUserRegister({ s_id:parseInt(localStorage.getItem("isAuth")),select_courses:parseInt(this.state.select_courses),select_batch:parseInt(this.state.select_batch),objective_learning:this.state.objective_learning,flag : 0});
	  }

	}
	}
    onChangeHandler = ({ target }) => {
        
        let { name, value } = target;
        this.setState({ [name]: value,courseError:false,emailError:false});
    };
    onChangeHandlerCourse = ({ target }) => {
      
		let { name, value } = target;
		let ans = [];
		this.state.courses.map(x=>{
			if(x.course_id == value){
               x.batch.map(y=>ans.push({id:y.batch_id,date:y.date}))
			}
		})
        this.setState({ [name]: value ,batch:ans,courseError:false,emailError:false});
	};
    submitBtnHandler = ({ target }) => {
    
	  if(localStorage.getItem("isAuth") == null){
			this.props.authUserRegister({ email:this.state.email,password: this.state.password, first_name: this.state.first_name, last_name:this.state.last_name,select_batch:this.state.select_batch,objective_learning:this.state.objective_learning,select_courses:this.state.select_courses,flag : 1});
		}
	  else{
		this.props.authUserRegister({ s_id:parseInt(localStorage.getItem("isAuth")),select_courses:parseInt(this.state.select_courses),select_batch:parseInt(this.state.select_batch),objective_learning:this.state.objective_learning,flag : 0});
	  }
	};
	crossHandle = () => {
		this.props.history.push('/home');
		};
	

    componentDidMount() {
		if (localStorage.getItem("isAuth") != null) {
			let s_id = localStorage.getItem("isAuth");
			this.setState({isAuth:true});
			this.props.getAllCourses();
}
      else{
            this.props.getAllCourses();
         }
  }
    componentWillReceiveProps(nextProps) {

		if(this.props.setAllCoursesResponseIdentifer != nextProps.setAllCoursesResponseIdentifer){
			 window.$("#myModal1").modal("show");
			 this.setState({courses:nextProps.data})
		}
		if(this.props.authResponseIdentifer != nextProps.authResponseIdentifer){
			window.$("#myModal1").modal("hide");
			this.props.history.push('/home/dashboard');
	   }

    	else{ 	
			  if(nextProps.auth.serverError){ 
				
						if(nextProps.auth.serverError.Course == false){
						
						this.setState({message:nextProps.auth.errorMessage,courseError:true});
						}
						if(nextProps.auth.serverError.email == false){
						
							this.setState({message:nextProps.auth.errorMessage,emailError:true});
						}
				
				}
	}
	}


    render() {
		
        return (
			<>
			<RegisterCustomerForm
				    isAuth = {this.state.isAuth}
					email={this.state.email}
					password={this.state.password}
				    first_name={this.state.first_name}
					last_name={this.state.last_name}
					select_courses ={this.state.select_courses}
                    select_batch ={this.state.select_batch}
                    objective_learning={this.state.objective_learning}
                    courses={this.state.courses}
					batch={this.state.batch}
					message = {this.state.message}
					emailError = {this.state.emailError}
					courseError = {this.state.courseError}
					onChangeHandlerCourse={this.onChangeHandlerCourse}
					onChangeHandler={this.onChangeHandler}
					submitBtnHandler={this.submitBtnHandler}
					crossHandle = {this.crossHandle}
					onBlurHandler = {this.onBlurHandler}
				/>
				<Item />
            </>
        );
    }
}

const RegisterCustomerForm = (props) => {
	return (
		<div id="myModal1" className="modal fade" role="dialog">
			<div className="modal-dialog modal-md"> {/* Modal content*/}
				<div className="modal-content">
					<div className="modal-header bg-info">
						<h4 className="modal-title text-white">Customer Register</h4>
						<button type="button" className="close text-white" data-dismiss="modal" onClick={ props.crossHandle}> × </button>
					</div>
					<form onSubmit={(e)=>{e.preventDefault();}}>
						<div className="modal-body">
							<div className="row">
								<div className="col-md-12"> { props.isAuth == false &&
									<>
										<label htmlFor className="font-weight-bold"> Email: </label>
										<div className="form-group">
											<input type="email" className="form-control" onBlur={props.onBlurHandler} name="email" value={props.email || ""} onChange={props.onChangeHandler} placeholder="Enter the Email.." required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please Enter Currect Email.." /> </div> {props.emailError &&
										<>
											<label htmlFor="email" style={{color: "red"}} className="font-weight-bold">{props.message}</label>
											<br />
											</> }
											<label htmlFor className="font-weight-bold"> Password: </label>
											<div className="form-group">
												<input type="password" name="password" value={props.password || ""} onChange={props.onChangeHandler} className="form-control" placeholder="Enter the Password.." required="required" /> </div>
											<label htmlFor className="font-weight-bold"> First Name: </label>
											<div className="form-group">
												<input type="text" name="first_name" value={props.first_name || ""} onChange={props.onChangeHandler} className="form-control" placeholder="Enter the First Name.." required="required" autofocus /> </div>
											<label htmlFor className="font-weight-bold"> Last Name: </label>
											<div className="form-group">
												<input type="text" name="last_name" value={props.last_name || ""} onChange={props.onChangeHandler} className="form-control" placeholder="Enter the Last Name.." required="required" autofocus /> </div>
											</> }
											<label htmlFor className="font-weight-bold">Select Course:</label>
											<div className="form-group">
												<select name="select_courses" className="form-control" onBlur={props.onBlurHandler} value={props.select_courses || ""} onChange={props.onChangeHandlerCourse} required>
													<option value>Select Course..</option> {props.courses && props.courses.map((x)=>(
													<option value={x.course_id}>{x.name}</option> )) } </select>
											</div> {props.courseError &&
											<>
												<label htmlFor="email" style={{color: "red"}} className="font-weight-bold">{props.message}</label>
												<br />
												</> }
												<label htmlFor className="font-weight-bold">Select Batch:</label>
												<div className="form-group">
													<select name="select_batch" className="form-control" value={props.select_batch || ""} onChange={props.onChangeHandler} required>
														<option value>Select Batch..</option> {props.batch.map(x=>(
														<option value={x.id}>{x.date}</option> )) } </select>
												</div>
												<label htmlFor className="font-weight-bold">Objective of Learning:</label>
												<div className="form-group">
													<select name="objective_learning" className="form-control" value={props.objective_learning || ""} onChange={props.onChangeHandler} required>
														<option value>Objective of Learning..</option>
														<option value="Gain a new skill">Gain a new skill</option>
														<option value="Build my own Project">Build my own Project</option>\
														<option value="Get an internship/job in future">Get an internship/job in future </option>
														<option value="Get a certificate">Get a certificate </option>
														<option value="Fulfil college requirnment">Fulfil college requirnment </option>
													</select>
												</div>
								</div>
							</div>
							<div className="form-group text-right">
								<button type="submit" onClick={props.submitBtnHandler} name="Customer" className="btn btn-success font-weight-bold p-1 px-3"> Register </button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
    );
};

const mapStateToProps = (state) => {
    console.error("Store State===>", state);
    return {auth: state.auth, user: state.auth.user,authResponseIdentifer:state.auth.authResponseIdentifer,setAllCoursesResponseIdentifer:state.auth.setAllCoursesResponseIdentifer, data: state.auth.allCourses, userCartId: state.auth.userCartId, registerResponseIdentifier: state.auth.registerResponseIdentifier};
};
const mapDispatchToProps = (dispatch) => {
    return {
		authUserRegister: (userData) => dispatch(authUserRegister(userData)),
      getAllCourses:() => dispatch(getAllCourses()),
        setStore:() => dispatch(setStore())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
