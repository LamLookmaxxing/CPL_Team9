import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserInfo() {
  const [profileData, setProfileData] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('https://api.realworld.io/api/profiles/Maksim%20Esteban');
        setProfileData(response.data.profile);
        setFollowing(response.data.profile.following);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchProfile();
  }, []);

  const handleFollowToggle = () => {
    // Simulating follow/unfollow action
    setFollowing(!following);
  };


  return (
    <div className="profile-page">
      {profileData ? (
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1" style={{ backgroundColor: '#f0f0f0', padding: '20px', paddingTop: '40px' }}>
                <img
                  src={profileData.image}
                  className="user-img"
                  alt="User"
                  style={{
                    width: '90px', // Adjust the size as needed
                    height: '90px', // Adjust the size as needed
                    borderRadius: '50%', // Makes the image circular
                    border: '1px solid purple' // Optional border
                  }}
                />
                <h4 style={{ paddingTop: '10px' }}>
                  <strong>{profileData.username}</strong>
                </h4>
                <p>{profileData.bio}</p>
                <div className="col-xs-12 col-md-6 offset-md-6" style={{ textAlign: 'right' }}>
                  <button
                    onClick={handleFollowToggle}
                    className={`btn btn-sm ${following ? 'btn-secondary' : 'btn-primary'}`}
                    style={{color: '#000', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    {following ? `+ Unfollow ${profileData.username}` : `+ Follow ${profileData.username}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Hardcoded article previews */}
      <div className="container" style={{paddingTop: '40px'}}>
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link active" href="">My Articles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Favorited Articles</a>
                </li>
              </ul>
            </div>

            {/* Hardcoded article preview 1 */}
            <div className="article-preview">
              <div className="article-meta">
                <a href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg" alt="Author" /></a>
                <div className="info">
                  <a href="/profile/eric-simons" className="author">Eric Simons</a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 29
                </button>
              </div>
              <a href="/article/how-to-buil-webapps-that-scale" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">realworld</li>
                  <li className="tag-default tag-pill tag-outline">implementations</li>
                </ul>
              </a>
            </div>

            {/* Hardcoded article preview 2 */}
            <div className="article-preview">
              <div className="article-meta">
                <a href="/profile/albert-pai"><img src="http://i.imgur.com/N4VcUeJ.jpg" alt="Author" /></a>
                <div className="info">
                  <a href="/profile/albert-pai" className="author">Albert Pai</a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 32
                </button>
              </div>
              <a href="/article/the-song-you" className="preview-link">
                <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </a>
            </div>

            {/* Pagination */}
            <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="">2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
