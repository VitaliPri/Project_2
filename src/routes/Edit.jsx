import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editPost, fetchPost } from "../state/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(editPost({ id, title, content })).then(() => {
        if (title && content) {
          navigate("/");
        }
      });
    },
    [dispatch, title, content, navigate, id]
  );

  useEffect(() => {
    dispatch(fetchPost(id)).then((post) => {
      setTitle(post.payload.title);
      setContent(post.payload.content);
    });
  }, [dispatch, id]);

  return (
    <div className="mt-6 m-auto bg-zinc-700/40 p-10 w-5/6">
      <form action="/edit" onSubmit={handleSubmit}>
        <h1 className="mb-10 text-center font-bold text-4xl text-white uppercase">
          Edit Post
        </h1>
        <input
          className="rounded bg-zinc-800 outline-none py-2 px-4 text-white placeholder:text-slate-400 w-full"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="rounded bg-zinc-800 outline-none py-2 px-4 text-white placeholder:text-slate-400 w-full my-6 h-64"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-slate-600 py-4 px-6 text-xl text-slate-100 rounded w-64 m-auto block"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
