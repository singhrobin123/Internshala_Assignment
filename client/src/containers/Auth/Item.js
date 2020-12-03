import React, { Component } from "react";
import "../../include/css/main.css";
import { connect } from "react-redux";
import { getAllCourses} from "./auth.actions";

class Item extends Component {
    constructor(props) {
        
        super();
        this.state = {
            courses: [],
            isAuth: null,
        };
    }
  
    componentDidMount() {
        if (localStorage.getItem("isAuth") != null) {;
            this.setState({isAuth:true});
            this.props.getAllCourses();    
   }
      else{
        this.props.getAllCourses();
      }    
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.setAllCoursesResponseIdentifer != nextProps.setAllCoursesResponseIdentifer){

            this.setState({courses:nextProps.data})
       }
        
    }
    render() {
        return (
            <>
            <HomePageBodyComp 
            courses={this.state.courses}
            />
            </>
        );
    }
}

const HomePageBodyComp = (props) => {
    return (
        <div className="container" style={{marginTop:'10%'}}>
            <div className="row">

            <div className="col-lg-3">
            <h1 className="my-4 font-mono textfood">Internshala</h1>

            <div className="list-group list">
                <a className="list-group-item">
               <b> Register Here For Training Courses</b>
                </a>
            </div>
            
            <div className="list-group list selected">
            <a href="/home/register"  className="list-group-item selected" style={{ backgroundColor:"#adb2b7",textAlign:"center" }} >

                  Register
    
               </a>
            
            </div>
        </div>

                <div className="col-lg-9">
                
                    <div className="row">
                        {props.courses && (
                            <>
                                {" "}
                                {props.courses.map((book) => (
                                    <div className="col-lg-4 col-md-6 mb-4">
                                        <div className="card h-100">
                                            <a href="/home/register">
                                                <img className="card-img-top productImg" src="https://trainings.internshala.com/static/images/home/digital-marketing.jpg" alt="product image" />
                                            </a>
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    <a href="/home/register" style={{ fontSize: "18px" }}>
                                                        {book.name}
                                                    </a>
                                                    <span className="ml-4 uppercase badge badge-pill badge-success" style={{ fontSize: "12px", textTransform: "uppercase" }}>
                                                        {book.name}
                                                    </span>
                                                </h4>
                                                
                                                <p className="card-text more">{book.name}</p>
                                            </div>
                                            <div className="card-footer">
                                                <form action method="POST">
                                                    <small className="text-muted">
                                                        <span className="fa fa-star checked" />
                                                        <span className="fa fa-star checked" />
                                                        <span className="fa fa-star checked" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                    </small>
                                                
                                                
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        <div className="row mt-2 mb-5 justify-content-center">
                            <div className="col-md-12 mb-5 text-right">
                                <nav aria-label="Page navigation" className="page">
                                    <ul className="pagination pageCenter">
                                      
                                        <li className="page-item">
                                            <a className="page-link" href="/home/register"></a>
                                        </li>
                                      
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log("Store State===>", state);
    return {auth: state.auth, user: state.auth.user,authResponseIdentifer:state.auth.authResponseIdentifer,setAllCoursesResponseIdentifer:state.auth.setAllCoursesResponseIdentifer, data: state.auth.allCourses, userCartId: state.auth.userCartId, registerResponseIdentifier: state.auth.registerResponseIdentifier};
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllCourses:() => dispatch(getAllCourses())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);
