import React, { useState } from 'react';

function Settings() {
  const [profile, setProfile] = useState({
    profilePicture: '',
    name: '',
    bio: '',
    email: '',
    newPassword: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Updated Profile:', profile);
  };

  return (
    <div className="settings-page d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mt-3 mb-3">Your Settings</h1>

            <form onSubmit={handleSubmit}>
              <fieldset className="centered-fieldset">
                <fieldset className="form-group">
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="URL of profile picture"
                    value={profile.profilePicture}
                    onChange={(e) => setProfile({ ...profile, profilePicture: e.target.value })}
                  />
                </fieldset>
                
                <fieldset className="form-group">
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Your Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control mb-3"
                    rows="8"
                    placeholder="Short bio about you"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  ></textarea>
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </fieldset> 

                <fieldset className="form-group">
                  <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="New Password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                  />
                </fieldset>

                <div className="text-end">
                  <button className="btn btn-lg btn-success">Update Settings</button>
                </div>
              </fieldset>
            </form>

            <hr/>
            <button className="btn btn-outline-danger btn-block mb-4">Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;







