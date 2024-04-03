import axios from 'axios';

// Constants
const TOKEN_KEY = "refine-auth";
const API_URL = "https://api.realworld.io/api";

// Helper function to get the token from local storage
const getToken = () => localStorage.getItem(TOKEN_KEY);

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add token to headers if it exists
    ...(getToken() && { 'Authorization': `Token ${getToken()}` }),
  },
});

// Get an article
// Get an article
export const getArticle = async (slug) => {
    if (typeof slug === 'undefined' || slug === '') {
      throw new Error('The slug is undefined or empty.');
    }
    
    try {
      const response = await api.get(`/articles/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error getting article:", error);
      throw error; // It's important to rethrow the error so that it can be handled by the calling code.
    }
  };
  
// Update an article
export const updateArticle = async (slug, articleData) => {
  try {
    const response = await api.put(`/articles/${slug}`, { article: articleData });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
  }
};

// Delete an article
export const deleteArticle = async (slug) => {
  try {
    const response = await api.delete(`/articles/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
  }
};
//Get commnet

export const getComments = async (slug) => {
  try {
    const response = await axios.get(`/articles/${slug}/comments`);
    return response.data; // Giả sử response.data chứa mảng bình luận
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error; // Throw để có thể bắt và xử lý lỗi ở nơi gọi hàm
  }
};

// Create a comment
export const createComment = async (slug, commentBody) => {
  try {
    const response = await api.post(`/articles/${slug}/comments`, { comment: { body: commentBody } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

// Delete a comment
export const deleteComment = async (slug, commentId) => {
  try {
    const response = await api.delete(`/articles/${slug}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
