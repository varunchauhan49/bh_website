var React = require("react");
var request = require("superagent");
var Header = require("./Header.jsx");
var SideBar = require("./SideBar.jsx");
var ImageGallery = require("./ImageGallery.jsx");
var SearchPage = require("./SearchPage.jsx");

var Bh_App = React.createClass({
	getInitialState:function(){
		return{
			user:'',
			collapse:true
		}
	},
	componentWillMount:function(){
		var self = this;
		request.get('/api/user')
          .set('Content-Type', 'application/json')
          .end(function (err, res) {
            if (err) {
              console.log(err);
              return;
            }
          var data = JSON.parse(res.text);
            if (self.isMounted()) {
              self.setState({
                  user:data
                });
            }
          });
	},
	handleCollapse:function(){
		this.setState({collapse:!this.state.collapse});
	},
	render:function(){
//
		return(
			<div className={(this.state.collapse)?"sidebar-collapse":"sidebar-open"}>
				<div className="hold-transition skin-blue sidebar-mini">
					<div className="wrapper">

						<Header user={this.state.user} closeCollapse={this.handleCollapse} />
						<SideBar user={this.state.user} />

						<div className="content-wrapper">
						<section className="content-header">
						  <ImageGallery />
						</section>

						<section className="content">

						</section>

						</div>

						<footer className="main-footer">
						<div className="pull-right hidden-xs">
						  <b>Version</b> 1.0
						</div>
						<strong>Copyright &copy; 2014-2016 Varun Chauhan</strong> All rights
						reserved.
						</footer>
						<div className="control-sidebar-bg">
						</div>
					</div>
				</div>
			</div>
			)
	}
});


module.exports = Bh_App;