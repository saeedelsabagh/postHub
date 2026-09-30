import { createContext, useContext, useReducer } from "react";
import api from "../API/api";

const PostContext = createContext(null);

const initialState = {
  posts: [],
  totalPages: 0,
  loading: false,
  error: "",
  search: "",
  page: 1,
  size: 6,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload.content,
        totalPages: action.payload.totalPages,
        loading: false,
        error: "",
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
        page: 1,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
}

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getPosts() {
    dispatch({
      type: "LOADING",
    });

    try {
      const response = await api.get("/posts", {
        params: {
          page: state.page,
          size: state.size,
          sortBy: "id",
          ...(state.search
            ? { title: state.search }
            : {}),
        },
      });

      const data = Array.isArray(response.data)
        ? {
            content: response.data,
            totalPages: 1,
          }
        : response.data;

      dispatch({
        type: "SET_POSTS",
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: "ERROR",
        payload:
          e.response?.data?.message ||
          "Could not load posts",
      });
    }
  }

  async function getPostById(id) {
    return (
      await api.get(`/post/${id}`)
    ).data;
  }

  // Create post with image
  async function createPost(formData) {
    return (
      await api.post("/posts", formData)
    ).data;
  }

  async function updatePost(id, post) {
    return (
      await api.put(
        `/updatePost/${id}`,
        post
      )
    ).data;
  }

  async function deletePost(id) {
    return (
      await api.delete(`/post/${id}`)
    ).data;
  }

  async function getPostsByUser(id) {
    return (
      await api.get(`/users/${id}/posts`)
    ).data;
  }

  return (
    <PostContext.Provider
      value={{
        ...state,
        dispatch,
        getPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost,
        getPostsByUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}