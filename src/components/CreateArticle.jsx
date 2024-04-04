import React, { useState } from 'react';

function CreateArticle() {
  const [article, setArticle] = useState({
    title: '',
    description: '',
    content: '',
    tags: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      const tagsArray = value.split(',').map(tag => tag.trim());
      setArticle({ ...article, [name]: tagsArray });
    } else {
      setArticle({ ...article, [name]: value });
    }
  };
  

  const handlePublishArticle = () => {
    console.log(article);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group mb-3 mt-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    style={{ fontSize: '22px' }}
                    name="title"
                    value={article.title}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    value={article.description}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group mb-3">
                  <textarea
                    className="form-control"
                    rows="7"
                    placeholder="Write your article (in markdown)"
                    name="content"
                    value={article.content}
                    onChange={handleInputChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    name="tags"
                    value={article.tags.join(',')} // Join tags array to display as string
                    onChange={handleInputChange}
                  />
                  <div className="tag-list">
                    <span className="tag-default tag-pill"> <i className="ion-close-round"></i></span>
                  </div>
                </fieldset>
                <div className='text-end'>
                  <button
                    className="btn btn-lg pull-xs-right btn-success mb-5"
                    type="button"
                    onClick={handlePublishArticle}
                  >
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
