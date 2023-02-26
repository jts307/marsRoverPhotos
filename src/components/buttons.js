import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';
import {
  getNextImage, getPreviousImage, getMarsImages,
} from '../actions';

// the code for connecting to facebook and posting to instagram is adapted from here with a few edits:
// https://medium.com/geekculture/how-to-publish-content-with-the-instagram-graph-api-806ec9c56588
const Buttons = (props) => {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState('');
  const [enableInstagramButton, setenableInstagramButton] = useState(true);

  // get access to the facebook page tied to the instagram account
  const getFacebookPages = () => {
    return new Promise((resolve) => {
      window.FB.api(
        'me/accounts',
        { access_token: facebookUserAccessToken },
        (response) => {
          resolve(response.data);
        },
      );
    });
  };

  // use the facebook page to access the instagram account
  const getInstagramAccountId = (facebookPageId) => {
    return new Promise((resolve) => {
      window.FB.api(
        facebookPageId,
        {
          access_token: facebookUserAccessToken,
          fields: 'instagram_business_account',
        },
        (response) => {
          resolve(response.instagram_business_account.id);
        },
      );
    });
  };

  // create a media object that will be posted to instagram
  const createMediaObjectContainer = (instagramAccountId) => {
    return new Promise((resolve) => {
      // async axios call to change Mars Rover Image into
      // an aspect ratio that is acceptable for Instagram.
      axios.get('https://mars-rover-instagram.herokuapp.com/api/convertImage', { params: { imagePath: props.photos[props.current].img_src } })
        .then((response) => {
          let { convertedImage } = response.data;
          convertedImage += '.jpg';

          window.FB.api(
            `${instagramAccountId}/media`,
            'POST',
            {
              access_token: facebookUserAccessToken,
              media_url: convertedImage,
              image_url: convertedImage,
              media_type: 'IMAGE',
            },
            (response2) => {
              resolve(response2.id);
            },
          );
        });
    }).catch((error) => {
      console.log(error);
    });
  };

  // post created media object to instagram
  const publishMediaObjectContainer = (
    instagramAccountId,
    mediaObjectContainerId,
  ) => {
    return new Promise((resolve) => {
      window.FB.api(
        `${instagramAccountId}/media_publish`,
        'POST',
        {
          access_token: facebookUserAccessToken,
          creation_id: mediaObjectContainerId,
        },
        (response) => {
          resolve(response.id);
        },
      );
    });
  };

  const shareInstagramPost = async () => {
    const facebookPages = await getFacebookPages();
    const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);
    const mediaObjectContainerId = await createMediaObjectContainer(
      instagramAccountId,
    );

    await publishMediaObjectContainer(
      instagramAccountId,
      mediaObjectContainerId,
    );
  };

  return (
    <div className="buttons">
      <div className="photo_buttons">
        <button id="photo_previous" type="button" onClick={props.getPreviousImage}>Previous</button>
        <button id="photo_next"
          type="button"
          onClick={props.getNextImage}
        >Next
        </button>
      </div>
      <button className="post_button"
        disabled={!enableInstagramButton}
        type="button"
        onClick={
          () => {
            setenableInstagramButton(false);
            if (props.photos.length > 0) {
              // loggining user in if they are not already
              window.FB.getLoginStatus((response) => {
                if (!response.authResponse) {
                  window.FB.login(
                    (response2) => {
                      setFacebookUserAccessToken(response2.authResponse?.accessToken);
                      shareInstagramPost();
                    },
                    {
                      // Scopes that allow us to publish content to Instagram
                      scope: 'instagram_basic,pages_show_list,instagram_content_publish',
                    },
                  );
                } else {
                  setFacebookUserAccessToken(response.authResponse.accessToken);
                  shareInstagramPost();
                }
              });
            }
            setenableInstagramButton(true);
          }
        }
      >Post to Mars Rover Instagram <SocialIcon network="instagram" fgColor="rgb(193, 68, 14)" bgColor="rgb(240, 231, 231)" />
      </button>
      <p style={{ display: enableInstagramButton ? 'none' : 'block', textAlign: 'center' }}>Posted!</p>
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    current: state.marsPhotos.current,
    photos: state.marsPhotos.images,
    error: state.marsPhotos.error,
  }
);

export default withRouter(connect(mapStateToProps, {
  getNextImage, getPreviousImage, getMarsImages,
})(Buttons));
