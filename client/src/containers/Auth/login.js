import React,{Component} from 'react';
import { authUserLogin ,setStore} from './auth.actions';
import {connect} from 'react-redux';
import Item from './Item';
class Login extends Component{
    constructor(props){
        super()
        this.state={
                    email:null,
                    password:null,
                    show:false,
                    message:"",
                    emailError:false,
                    passwordError:false
        }
    }
    onBlurHandler = ({target}) =>{
       
       if(target.name == "email" || target.name == "password"){
      this.props.authUserLogin({email:this.state.email,password:this.state.password});
       }
    }
    onChangeHandler = ({target}) =>{
      let {name,value} = target;
      this.setState({[name]:value,emailError:false,passwordError:false});
    }
    submitBtnHandler = ({target}) => {
              this.props.authUserLogin({email:this.state.email,password:this.state.password});
        }
        crossHandle = () => {
            this.props.history.push('/home');
            };
    componentDidMount() {
    
            window.$('#myModal').modal('show');
    }
    componentWillReceiveProps(nextProps) {
            
      if ( nextProps.auth.isAuthenticated) {
        window.$('#myModal').modal('hide');
      
       this.props.history.push('/home/dashboard');
            }
            else{ 
                      if(nextProps.auth.serverError && nextProps.auth.s_id == null){
                                if(nextProps.auth.serverError && nextProps.auth.serverError.email == true){
                                    
                                this.setState({show:true,message:nextProps.auth.serverError.message,passwordError:true});
                                }
                                else{
                                this.setState({show:true,message:nextProps.auth.serverError.message,emailError:true});
                            }
                        }
            }
    }
    render(){
        
        return (
        <>
          <LoginModel
					email={this.state.email}
					password={this.state.password}
					message = {this.state.message}
					emailError = {this.state.emailError}
					passwordError = {this.state.passwordError}
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

const LoginModel = props => {

    return (
        
        <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog modal-md">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h4 className="modal-title text-white">Login to your account    </h4>
              <button type="button" className="close text-white" data-dismiss="modal" onClick = {props.crossHandle}>×</button>
            </div>
            <form onSubmit={(e)=>{e.preventDefault();}}>
              <div className="modal-body">  
                <label htmlFor="email" className="font-weight-bold">Email:</label>
                <div className="form-group">
                  <input type="email" name="email" id="email" className="form-control " onBlur={props.onBlurHandler} value={props.email || ""} onChange={props.onChangeHandler} placeholder="Enter the email..." required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please Enter Currect Email.." />
                                </div>
                                {props.emailError &&
                                    <>
                                    <label htmlFor="email" style={{color: "red"}} className="font-weight-bold">{props.message}</label>
                                <br />
                            </>
                        }
                <label htmlFor="Password" className="font-weight-bold">Password:</label>
                <div className="form-group">
                  <input type="Password" name="password" onBlur={props.onBlurHandler} value={props.password || ""} onChange={props.onChangeHandler} id="Password" className="form-control " placeholder="Enter Password...... " title="Please Enter Currect Password.." required />
                                </div>
                                {props.passwordError && props.password &&
                                    <>
                                    <label htmlFor="email" style={{color: "red"}} className="font-weight-bold">{props.message}</label>
                                    <br />
                            </>}
                <div className="form-group text-right">
                  <button type="submit" onClick={props.submitBtnHandler} name="login" className="btn btn-success btn-sm font-weight-bold px-3">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state => {
  console.error("Store State===>",state);
  return{user:state.auth.user,auth: state.auth}
}
const mapDispatchToProps = dispatch => {
  return {
    authUserLogin:(userData)=>dispatch(authUserLogin(userData)),
    setStore:() => dispatch(setStore())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
