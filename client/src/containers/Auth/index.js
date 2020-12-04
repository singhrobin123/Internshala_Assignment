import React,{Component} from 'react';
import { authUserLogin ,setStore} from './auth.actions';
import {connect} from 'react-redux';
import Navbar from '../pages/navbar';
import Login from './login';
import Register from './register';
import { getAllCourses,logoutUser} from "./auth.actions";
import SweetAlert from 'sweetalert-react';
import Dashboard from './Dashboard';
import Item from './Item';


class Auth extends Component{
    constructor(props){
        super()
        this.state={
			
			isAuth : false,
            fname : null,
            lname:null,
			show:false               
        }
    }                    
    LogoutHandle = (e) =>{

    e.preventDefault();
    this.props.logoutUser();
}
  componentDidMount() {

       if (localStorage.getItem("isAuth") != null) {
                             let s_id = localStorage.getItem("isAuth");
                             this.setState({isAuth:true,fname:localStorage.getItem("fname"),lname:localStorage.getItem("lname")});
             }
    
        }
    componentWillReceiveProps(nextProps) {
            if(this.props.auth.logoutResponseIdentifer != nextProps.auth.logoutResponseIdentifer){
                this.setState({isAuth:false});
                this.props.history.push('/home');
                            }
    
            if (localStorage.getItem("isAuth") != null) {
                                let s_id = localStorage.getItem("isAuth");
                                this.setState({isAuth:true,fname:localStorage.getItem("fname"),lname:localStorage.getItem("lname")});
                }


}
    render(){
        return(  
                  <>
                
                    <Navbar
                     fname = {this.state.fname}
                     lname = {this.state.lname}
                    isAuth = {this.state.isAuth}
                    LogoutHandle = {this.LogoutHandle}
                    />
                         {this.props.location.pathname=="/home/login" && <Login history={this.props.history} />}
                         {this.props.location.pathname=="/home/register" && <Register history={this.props.history} />}
                         {this.props.location.pathname=="/home/dashboard" && <Dashboard history={this.props.history} />}
                         {this.props.location.pathname=="/home" && <Item history={this.props.history} />}
                   </>
        )
    }
}

const mapStateToProps = state => {
    return{user:state.auth.user,auth: state.auth}
  }
  const mapDispatchToProps = dispatch => {
    return {
        authUserLogin:(userData)=>dispatch(authUserLogin(userData)),
        getAllCourses:() => dispatch(getAllCourses()),
        logoutUser:() => dispatch(logoutUser()),
        getAllLoginUserCourses:(s_id) => dispatch(getAllLoginUserCourses(s_id))
        

    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Auth);
