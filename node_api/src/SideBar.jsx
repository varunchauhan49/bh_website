var React = require("react");

var SideBar = React.createClass({
	render:function(){
		return(
				<aside className="main-sidebar">
				    <section className="sidebar">
				      <div className="user-panel">
					        <div className="pull-left image">
					          <img src={(this.props.user)?this.props.user.picture:'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50'} className="img-circle" alt="User Image" />
					        </div>
					        {(this.props.user)?
					        <div className="pull-left info">
					          <p>{(this.props.user)?this.props.user.name:'Login'}</p>
					          <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
					        </div>:
					        <div className="pull-left info">
				                <a href="/login" style={{"fontSize":"16px"}}>Login</a>
					        </div>
					    	}
				      </div>
				      <ul className="sidebar-menu">
				        <li className="header">MAIN NAVIGATION</li>
				        <li className="active treeview">
				          <a href="#">
				            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
				            <span className="pull-right-container">
				              <i className="fa fa-angle-left pull-right"></i>
				            </span>
				          </a>
				          <ul className="treeview-menu">
				            <li><a href="index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
				            <li className="active"><a href="index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
				          </ul>
				        </li>
				        <li className="header">LABELS</li>
				        <li><a href="#"><i className="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
				        <li><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
				        <li><a href="#"><i className="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
				      </ul>
				    </section>
			  	</aside>
			)
	}
});

module.exports = SideBar;