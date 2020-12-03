import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserCourses } from "./auth.actions";

class Dashboard extends Component {
    constructor(props) {
        
        super();
        this.state = {
            userCourse: [],
            allCourses:[]
        };
    }
    addProduct = (e) => {
      
    };
    componentDidMount() {

        
        if (localStorage.getItem("isAuth") == null) {

        }
       else{

        this.props.getUserCourses(parseInt(localStorage.getItem("isAuth")));
       }
    }
    componentWillReceiveProps(nextProps) {

            if(this.props.auth.setUserCoursesResponseIdentifer != nextProps.auth.setUserCoursesResponseIdentifer){
            
              this.setState({userCourse:nextProps.auth.UserCourse,allCourses:nextProps.auth.allCourses})
            }
  
    }
    render() {

        return (
            <>
            <HomePageBodyComp
            userCourse = {this.state.userCourse}
           />
            </>
        );
    }
}

const HomePageBodyComp = (props) => {
   return(
    <section className="updates padding-top">
     <div className="container-fluid">
         <div className="row justify-content-center">

             <div className="col-lg-12">
                 <div className="recent-updates card">
                     <div style={{marginBottom:'0.5rem',padding:'2.75rem'}} className="card-header">
                         <h3 className="h4">STATUS</h3>
                     </div>
                     <div className="card-body no-padding">

                         <div className="item d-flex justify-content-between">
                             <div className="info d-flex">
                                 <table className="table table-bordered table-responsive TableResponsive">
                                     <thead>
                                         <tr>
                                             <th style={{paddingLeft : '220px',paddingRight : '211px' }}>
                                                 <h3>TRAININGS</h3>
                                             </th>
                                             <th style={{paddingLeft : '120px',paddingRight : '111px' }}>
                                                 <h3>START DATE</h3>
                                             </th>
                                             <th style={{paddingLeft : '120px',paddingRight : '111px' }}>
                                                 <h3>STATUS</h3>
                                             </th>
                                         </tr>
                                     </thead>
                                     {
                                     props.userCourse.map(x=>
                                     <tbody className="text-center">
                                         <tr style={{height: '120px !important', overflowY: 'scroll'}}>
                                             <td>{x.name}</td>
                                             <td>{x.date}</td>
                                             {x.is_paid == 1 &&
                                             <td className="text-center">
                                                 <button className="btn btn-danger btn-sm deletproduct px-3 font-weight-bold">Go To Traning</button>
                                             </td>
                                             }
                                             {x.is_paid == 0 &&
                                             <td className="text-center">
                                                 <button className="btn btn-danger btn-sm deletproduct px-3 font-weight-bold">Payment Panding</button>
                                             </td>
                                             }
                                             { x.is_paid == null &&
                                             <td className="text-center">
                                                 <li className="nav-item mx-3">
                                                     <a className="nav-link btn btn-primary btn-sm font-weight-bold text-white p-1 px-3 buttonRegister" href="/home/register">Register</a>
                                                 </li>
                                             </td>
                                             }
                                         </tr>


                                     </tbody>
                                     )
                                     }


                                 </table>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </section>
  )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUserCourses: (s_id) => dispatch(getUserCourses(s_id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
