import { fetchComments } from "./api";
import "./PostDetail.css";
import { Mutation, useQuery } from "@tanstack/react-query";

export const PostDetail = ({ post, deleteMutation, updateMutation }) => {
  // replace with useQuery
  // const data = [];
  const postId = post.id;
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["comments",postId],
    queryFn: ()=>fetchComments(postId)
  })

  if(isLoading){
    return <div>Loading ...</div>
  }

  if(isError){
    return <div>Error {error.message}</div>
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={(postId) => {deleteMutation.mutate(postId)}} >Delete</button> <button onClick={(postId) => {updateMutation.mutate(postId)}} >Update title</button>
      {deleteMutation.isError ? (
        <div className="error">An error occurred:  {deleteMutation.error}</div>
          ) : null}
      {deleteMutation.isSuccess ? <div className="success"> Post Deleted!</div> : null}
      {updateMutation.isError ? (
        <div className="error">An error occurred:  {updateMutation.error}</div>
          ) : null}
      {updateMutation.isSuccess ? <div className="success"> Post Updated!</div> : null}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
