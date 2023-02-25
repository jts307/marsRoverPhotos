import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMarsImages } from '../actions';

class MainImage extends Component {
  componentDidMount() {
    // fetching images on page load
    this.props.getMarsImages();
  }

  renderImageOrError() {
    // showing loading when there are no images available for whatever reason.
    if (this.props.photos.length > 0) {
      const photoDate = new Date(this.props.photos[this.props.current].earth_date);
      const formattedphotoDate = `${String(photoDate.getMonth() + 1)}-${String(photoDate.getDate())}-${photoDate.getFullYear()}`;
      return (
        <div className="main_display">
          Mars Rover Photo {this.props.current + 1} - Taken yesterday: {formattedphotoDate}
          <img src={this.props.photos[this.props.current].img_src} alt="Girl in a jacket" width="500" height="600" />
        </div>
      );
    } else {
      return (
        <div className="main_display">
          Loading...
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderImageOrError()}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    current: state.marsPhotos.current,
    photos: state.marsPhotos.images,
    error: state.marsPhotos.error,
  }
);

export default withRouter(connect(mapStateToProps, { getMarsImages })(MainImage));
