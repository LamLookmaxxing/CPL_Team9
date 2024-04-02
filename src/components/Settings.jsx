import React from 'react';

function Settings() {
  return (
    <div className="settings-page d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mt-3 mb-3">Your Settings</h1>

            <form>
              <fieldset className="centered-fieldset">
                <fieldset className="form-group">
                  <input className="form-control mb-3 " type="text" placeholder="URL of profile picture" />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control mb-3" type="text" placeholder="Your Name" style={{ fontSize: '20px'}} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control mb-3"
                    rows="8"
                    placeholder="Short bio about you"
                    style={{ fontSize: '20px' }}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control mb-3" type="email" placeholder="Email" style={{ fontSize: '20px' }} />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="New Password"
                    style={{ fontSize: '20px' }}
                  />
                </fieldset>
                <div className="text-end">
                  <button className="btn btn-lg btn-success">Update Settings</button>
                </div>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger btn-block mb-4">Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;
