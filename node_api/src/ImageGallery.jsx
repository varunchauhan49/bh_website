var React = require("react");
var request = require("superagent");
var Gallery =require('react-photo-gallery');


const PHOTO_SET = [
  {
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630372/delhiShyamSweetsBarasbullahchowkchawribazaar31443367484.jpg',
    width:80,
    height:80,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630372/delhiShyamSweetsBarasbullahchowkchawribazaar31443367484.jpg',
    }
  },
  {
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630372/delhiShyamSweetsBarasbullahchowkchawribazaar21443367484.jpg',
    width:80,
    height:80,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630372/delhiShyamSweetsBarasbullahchowkchawribazaar21443367484.jpg',
  	}
  },
  {
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630379/delhiStandardPunjabiKhanaSector15Faridabad21443603697.jpg',
    width:80,
    height:80,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630379/delhiStandardPunjabiKhanaSector15Faridabad21443603697.jpg',
    }
  },
  {
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630381/delhiStandardPunjabiKhanaNITFaridabad51443507009.jpg',
    width:80,
    height:80,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630381/delhiStandardPunjabiKhanaNITFaridabad51443507009.jpg',
  	}
  },
  {
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630377/delhiStandardPunjabiKhanaNITFaridabad11443506932.jpg',
    width:80,
    height:80,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630377/delhiStandardPunjabiKhanaNITFaridabad11443506932.jpg',
    }
  },
  {
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630374/delhisonasweetsnehruplace41443420832.jpg',
    width:80,
    height:80,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://res.cloudinary.com/varunchauhan49/image/upload/v1467630374/delhisonasweetsnehruplace41443420832.jpg',
  	}
  }
];

var ImageGallery = React.createClass({
	render:function(){
		return(
			<div id="gallery">
				<h1>Hotel Name</h1>
				<Gallery photos={PHOTO_SET} />
			</div>
			)
	}
});


module.exports = ImageGallery;