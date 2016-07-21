var React = require("react");

var Header = React.createClass({
	getInitialState:function(){
		return{
			dropdown:false
		}
	},
	handleClick:function(){
		this.props.closeCollapse();
	},
	render:function(){
		return(
				<header className="main-header">
				    <a href="/" className="logo">
				      <span className="logo-mini"><b>A</b>LT</span>
				      <span className="logo-lg"><b>Admin</b>LTE</span>
				    </a>

				    <nav className="navbar navbar-static-top">
				      <a href="#" onClick={this.handleClick} className="sidebar-toggle" data-toggle="offcanvas" role="button">
				        <span className="sr-only">Toggle navigation</span>
				      </a>
				      <div className="navbar-custom-menu">
				        <ul className="nav navbar-nav">
				          <li className={(this.state.dropdown)?"dropdown user user-menu open":"dropdown user user-menu"}>
				            <a href="#" onClick={()=> this.setState({dropdown:!this.state.dropdown})} className="dropdown-toggle" data-toggle="dropdown">
				              <img src={(this.props.user)?this.props.user.picture:'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50'} className="user-image" alt="User Image" />
				              <span className="hidden-xs">{(this.props.user)?this.props.user.name:'Login'}</span>
				            </a>
				            <ul className="dropdown-menu">
				              <li className="user-header">
				                <img src={(this.props.user)?this.props.user.picture_big:'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=200'} className="img-circle" alt="User Image" />
				                <p>
				                  {(this.props.user)?this.props.user.name:'Login'}
				                  <small>Member since Nov. 2012</small>
				                </p>
				              </li>
				              {(this.props.user)?
				              <li className="user-footer">
				                <div className="pull-left">
				                  <a href="#" className="btn btn-default btn-flat">Profile</a>
				                </div>
				                <div className="pull-right">
				                  <a href="#" className="btn btn-default btn-flat">Sign out</a>
				                </div>
				              </li>
				              :
				              <li className="user-footer">
				                <div className="profile-center">
				                  <a href="/login" className="btn btn-default btn-flat">Login</a>
				                </div>
				              </li>
				          		}
				            </ul>
				          </li>
				        </ul>
				      </div>

				    </nav>
			  </header>
			)
	}
});

module.exports = Header;