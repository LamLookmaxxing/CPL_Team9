import React from 'react';
import '../Articles/Article.css'
function ArticlePreview({ article }) {
    return (
        <div className="article-preview border-top" >
                <div  className="article-meta mt-4" >
                    <div className="row">
                        <div className="col-md-4 d-flex align-items-center gap-2">
                            <a href={`#/@${article.author.username}`} class="d-inline-block">
                                <img src={article.author.image} alt={article.author.username} className="rounded-circle img-fluid author-image mr-3" />
                            </a>
                            <div className="info">
                                <a href={`#/@${article.author.username}`} className="author text-success">{article.author.username}</a>
                                <br />
                                <span className="date text-muted">
                                    {article && article.createdAt && (
                                        <small>
                                            {new Date(article.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
                                        </small>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="col-md-8 ">
                            <div className=' d-flex flex-row-reverse'>
                                <FavoriteBtn article={article} />
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <a href={`#/article/${article.slug}`} className="preview-link  ">
                                <h5>{article.title}</h5>
                                <p className=' text-black-50'>{article.description}</p>
                                <div className="row">
                                    <div className="col text-black-50">
                                        <span className="mr-2 p-2">Read more...</span>
                                    </div>
                                        <ul className="tag-list list-unstyled d-flex flex-row justify-content-end col    text-black-50">
                                            {article.tagList.map((tag, index) => (
                                              <li key={index} className="tag-default px-2" style={{ marginRight: '5px', border: '1px solid gray', borderRadius: '10px', fontSize: 'smaller' }}>
                                              {tag}
                                            </li>
                                            

                                            ))}
                                        </ul>
                                    </div>


                                
                            </a>
                        </div>
                    </div>
                </div >
      
        </div >
    );
}

function FavoriteBtn({ article }) {
    return (
        <button className="btn btn-sm btn-outline-success">
            <i className="ion-heart"></i>
            <span>{article.favoritesCount}</span>
        </button>
    );
}

export default ArticlePreview;
