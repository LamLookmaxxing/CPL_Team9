import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddArticle.css";

const CreateArticles = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const tags = tagList.split(",").map((tag) => tag.trim());

    const articleData = {
      article: {
        title,
        description,
        body,
        tagList: tags,
      },
    };

    try {
      const response = await axios.post(
        "https://api.realworld.io/api/articles",
        articleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      window.alert("Article created successfully!");
      setErrorMessage("");

      setTitle("");
      setDescription("");
      setBody("");
      setTagList("");

      console.log("Article created:", response.data.article);

      navigate("/");
    } catch (error) {
      setErrorMessage("Error creating article. Please try again.");
      console.error("Error creating article:", error);
    }
  };

  return (
    <div className="container-create-article mt-5 ">
      <h2 style={{textAlign: "center", marginBottom: "30px"}}>Create Article</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3 col-md-8 offset-md-2 col-xs-12">
          <input
            type="text"
            className="form-control"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 col-md-8 offset-md-2 col-xs-12">
          <input
            type="text"
            className="form-control"
            placeholder="What is the article about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 col-md-8 offset-md-2 col-xs-12">
          <textarea
            className="form-control"
            placeholder="Write your article"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3 col-md-8 offset-md-2 col-xs-12">
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags"
            value={tagList}
            onChange={(e) => setTagList(e.target.value)}
          />
        </div>

        <div className="mb-3 col-md-8 offset-md-2 col-xs-12">
          <button
            type="submit"
            className="btn btn-success"
            style={{ float: "right" }}
          >
            Create Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticles;
