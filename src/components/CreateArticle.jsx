import React from 'react';

function CreateArticle() {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-xs-12">

            <form>
              <fieldset>
                <fieldset className="form-group mb-3 mt-3">
                  <input type="text" className="form-control form-control-lg" placeholder="Article Title" style={{ fontSize: '22px' }} />
                </fieldset>
                <fieldset className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="What's this article about?" />
                </fieldset>
                <fieldset className="form-group mb-3">
                  <textarea
                    className="form-control"
                    rows="7"
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="Enter tags" />
                  <div className="tag-list">
                    <span className="tag-default tag-pill"> <i className="ion-close-round"></i></span>
                  </div>
                </fieldset>
                <div className='text-end'>
                <button className="btn btn-lg pull-xs-right btn-success mb-5" type="button">
                  Publish Article
                </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;
