import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  getNextImage, getPreviousImage, getMarsImages,
} from '../actions';

// the code for connecting to facebook and posting to instagram is adapted from here with a few edits:
// https://medium.com/geekculture/how-to-publish-content-with-the-instagram-graph-api-806ec9c56588
const Buttons = (props) => {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState('');
  const [isSharingPost, setIsSharingPost] = useState(false);

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
      window.FB.api(
        `${instagramAccountId}/media`,
        'POST',
        {
          access_token: facebookUserAccessToken,
          image_url: props.photos[props.current].img_src,
        },
        (response) => {
          resolve(response.id);
        },
      );
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
    setIsSharingPost(true);
    const facebookPages = await getFacebookPages();
    const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);
    const mediaObjectContainerId = await createMediaObjectContainer(
      instagramAccountId,
    );

    await publishMediaObjectContainer(
      instagramAccountId,
      mediaObjectContainerId,
    );

    setIsSharingPost(false);
  };

  return (
    <div className="buttons">
      <div className="photo_buttons">
        <button id="photo_previous" type="button" onClick={props.getPreviousImage}>Previous</button>
        <button id="photo_next" type="button" onClick={props.getNextImage}>Next</button>
      </div>
      <button className="post_button"
        type="button"
        onClick={
          () => {
            if (props.photos.length > 0) {
              window.FB.getLoginStatus((response) => {
                if (!response.authResponse) {
                  window.FB.login(
                    (response2) => {
                      setFacebookUserAccessToken(response2.authResponse?.accessToken);
                    },
                    {
                      // Scopes that allow us to publish content to Instagram
                      scope: 'instagram_basic,pages_show_list,instagram_content_publish',
                    },
                  );
                } else {
                  setFacebookUserAccessToken(response.authResponse.accessToken);
                }
              });
              shareInstagramPost();
            }
          }
        }
      >{isSharingPost ? 'Posting...' : 'Post to Mars Rover Instagram'}
      </button>
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
