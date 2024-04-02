import React from 'react';

function ArticlePreview({ article }) {
    return (
        <div className="article-preview">
            {article.map((article, index) => (
                <div key={index} className="article-meta" >
                    <div className="row">
                        <div className="col-md-4 d-flex align-items-center gap-2">
                            <a href={`#/@${article.author.username}`} class="d-inline-block">
                                <img src={article.author.image} alt={article.author.username} className="rounded-circle img-fluid author-image mr-3" />
                            </a>
                            <div className="info">
                                <a href={`#/@${article.author.username}`} className="author">{article.author.username}</a>
                                <br />
                                <span className="date">{new Date(article.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                            </div>
                        </div>
                        <div className="col-md-7">

                        </div>
                        <div className="col-md-1 ">
                            <FavoriteBtn article={article} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <a href={`#/article/${article.slug}`} className="preview-link d-flex flex-column">
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <div className="row">
                                    <div className="col-md-4">
                                        <span className="mr-2 p-2">Read more...</span>
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="tag-list list-unstyled d-flex flex-row-reverse">
                                            {article.tagList.map((tag, index) => (
                                                <li key={index} class="tag-default " style={{marginRight:'5px'}}>{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                              

                        </div>
                    </a>
                </div>
                    </div>
                </div >
            ))
}
        </div >
    );
}

function FavoriteBtn({ article }) {
    return (
        <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i>
            <span>{article.favoritesCount}</span>
        </button>
    );
}

export default ArticlePreview;
