import React, { useState, useEffect } from "react";
import style from "./Articles.module.css";
import { useAuth } from "../application/Authen";
import { Link } from "react-router-dom";
import { handleFavoriteRender } from "../../utils/utils";

import ArticlesTag from "./ArticlesTag";
import GlobalFeed from "./GlobalFeed";
import YourFeed from "./YourFeed";

const Articles = () => {
  const { isLoggedIn } = useAuth();
  const [tags, setTags] = useState([]);
  const [isloadTag, setIsLoadTag] = useState(true);
  const [tagSelect, setTagSelect] = useState(null);
  const [isPage, setIsPage] = useState("globalfeed");

  useEffect(() => {
    const apiUrl = "https://api.realworld.io/api/tags";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
        setIsLoadTag(false);
      });
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsPage(storedToken ? "yourfeed" : "globalfeed");
  }, [isLoggedIn]);

  const handleClickTags = (tag) => {
    setTagSelect(tag);
    setIsPage("tagfeed");
  };

  const handleToPage = (page) => {
    setIsPage(page);
  };

  const handleFavorite = (favorite, slug, index) => {
    handleFavoriteRender(favorite, slug, index);
  };

  return (
    <div className={style.container}>
        <div className="banner bg-success py-5">
        <div className="container text-center">
          <h1 className="logo-font text-white fs-1">conduit</h1>
          <p className="text-white fs-4">A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container mt-4">
        
        <div className="row">
          
          <div className="col-md-9">
            <div className={style.titleGlobal}>
              {isLoggedIn && (
                <Link
                  to="/"
                  className={isPage === "yourfeed" ? style.aActive : ""}
                  onClick={() => handleToPage("yourfeed")}
                >
                  Your feed
                </Link>
              )}
              <Link
                to="/"
                className={isPage === "globalfeed" ? style.aActive : ""}
                onClick={() => handleToPage("globalfeed")}
              >
                Global Feed
              </Link>
              {tagSelect !== null && (
                <Link
                  to="/"
                  className={isPage === "tagfeed" ? style.aActive : ""}
                  onClick={() => handleToPage("tagfeed")}
                >
                  #{tagSelect}
                </Link>
              )}
            </div>
            <div className={isPage === "tagfeed" ? null : style.disable}>
              <ArticlesTag tag={tagSelect}></ArticlesTag>
            </div>
            <div className={isPage === "globalfeed" ? null : style.disable}>
              <GlobalFeed></GlobalFeed>
            </div>
            <div className={isPage === "yourfeed" ? null : style.disable}>
              <YourFeed></YourFeed>
            </div>
          </div>
          <div className="col-md-3">
            <div className={style.tags}>
              <div className={style.titleTag}>
                <p>Popular Tags</p>
              </div>
              {isloadTag ? (
                <p>Loading...</p>
              ) : (
                <div className={style.listTag}>
                  {tags.tags.map((tag, index) => (
                    <a
                      key={index}
                      className={tag === tagSelect ? style.tagSelected : null}
                      onClick={() => handleClickTags(tag)}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
