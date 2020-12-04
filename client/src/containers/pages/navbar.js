import React from 'react';

  const Navbar = props =>{
	  console.error("fName",props.fname);
	  console.error("lName",props.lname);
        return(
        <>
				<nav className="navbar navbar-expand-lg navbar-dark   smallDevice" style={ { backgroundColor : "#acb6c1" }}>
				<div className="container-fluid">
					<a className="navbar-brand" href="/home"> <img style={{borderRadius: '50%',padding: '2px'}} src="https://trainings.internshala.com/static/images/logo.svg" alt="logo" width={150} height={80} className="imgSetIcon" /> <span style={ {margin: '34px'}} className="text-info font-weight-bold white-Shadow">Internshala</span> </a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" /> </button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav mr-auto text-uppercase font-weight-bold mx-5"> </ul>
						<ul className="navbar-nav ml-auto text-uppercase"> {props.isAuth == false &&
							<>
								<li className="nav-item"> <a className="nav-link btn btn-success btn-sm font-weight-bold text-white p-1 px-3 buttonLogin" href="/home/login">Login</a> </li>
								<li className="nav-item mx-3"> <a className="nav-link btn btn-primary btn-sm font-weight-bold text-white p-1 px-3 buttonRegister" href="/home/register">Register</a> </li>
								</>} {props.isAuth &&
								<>
									<li className="nav-item"> <a className="nav-link btn btn-success btn-sm font-weight-bold text-white p-1 px-3 buttonLogin" href="/home/dashboard">Dashboard</a> </li>
									<li className="nav-item mx-3"> <a className="nav-link btn btn-primary btn-sm font-weight-bold text-white p-1 px-3 buttonRegister" href="/home/register">Register Courses</a> </li>
									<li className="nav-item dropdown bg-dark font-normal">
										<a className="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fas fa-user-tie mx-2" style={{fontSize: '25px'}} /> {props.fname}  {props.lname} </a>
										<div className="dropdown-menu bg-info" aria-labelledby="navbarDropdown">
											<div className="dropdown-divider" />
											<div className="dropdown-divider" />
											<button type="button" className="dropdown-item text-white linkHover" onClick={ props.LogoutHandle}>Logout </button>
										</div>
									</li>
									</> } </ul>
					</div>
				</div>
			</nav>
        </>
    )
};


export default Navbar;
