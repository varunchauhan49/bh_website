var React = require("react");
var request = require("superagent");
var {Link} =require('react-router');


var SearchPage = React.createClass({
	render:function(){
		return(
			<div id="SearchPage">
				<div id="search">
          <div style={{"display": "inline-block"}}>
            <span className="inputCityIcon">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </span>
            <input type="text" className="inputCity" />
             <span className="inputCityIconLast">
              <i className="fa fa-sort-desc" aria-hidden="true"></i>
            </span>
          </div>
          <div style={{"display": "inline-block","marginLeft":"1vw"}}>
            <span className="inputExtraIcon">
              <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <input type="text" className="inputExtra" />
          </div>
          <input type="button" className="btn searchBtn" value="Search" />
        </div>
        <div id="cat">
          <ul className="rig columns-4">
            <li>
              <img src="http://res.cloudinary.com/varunchauhan49/image/upload/v1467630372/delhiShyamSweetsBarasbullahchowkchawribazaar31443367484.jpg" />
              <Link to={{ pathname: '/results', query: { "showAge": true ,"india":"country"} }} activeClassName="active"><h3>Click Image</h3></Link>
            </li>
            <li>
              <img src="http://res.cloudinary.com/varunchauhan49/image/upload/v1467630372/delhiShyamSweetsBarasbullahchowkchawribazaar21443367484.jpg" />
              <h3>Image Title</h3>
            </li>
            <li>
              <img src="http://res.cloudinary.com/varunchauhan49/image/upload/v1467630379/delhiStandardPunjabiKhanaSector15Faridabad21443603697.jpg" />
              <h3>Image Title</h3>
            </li>
            <li>
              <img src="http://res.cloudinary.com/varunchauhan49/image/upload/v1467630381/delhiStandardPunjabiKhanaNITFaridabad51443507009.jpg" />
              <h3>Image Title</h3>
            </li>
            <li>
              <img src="http://res.cloudinary.com/varunchauhan49/image/upload/v1467630377/delhiStandardPunjabiKhanaNITFaridabad11443506932.jpg" />
              <h3>Image Title</h3>
            </li>
            <li>
              <img src="http://res.cloudinary.com/varunchauhan49/image/upload/v1467630374/delhisonasweetsnehruplace41443420832.jpg" />
              <h3>Image Title</h3>
            </li>
          </ul>
        </div>
			</div>
			)
	}
});


module.exports = SearchPage;