import { useEffect, useState } from "react";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const maxPostPage = 10;

export const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const queryClient = useQueryClient();
  // replace with useQuery
  useEffect(() => {
    if(currentPage < maxPostPage){
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey:["post",nextPage],
        queryFn: () => fetchPosts(currentPage),
        staleTime: 2000
      })
    }
  },[currentPage])
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["post",currentPage],
    queryFn: () => fetchPosts(currentPage)
  })
  
  const deleteMutation = useMutation({
     mutationFn: (postId) => deletePost(postId)
  })
  
  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId)
 })

  if(isLoading){
    return <div>Loading ...</div>
  }

  if(isError){
    return <div>Error {error.message}</div>
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {setSelectedPost(post)
              deleteMutation.reset()
              updateMutation.reset()
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled = {currentPage <= 1 ? true : false} onClick={() => {setCurrentPage(currentPage - 1)}}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled = {currentPage >= 10 ? true : false} onClick={() => {setCurrentPage(currentPage + 1)}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} deleteMutation = {deleteMutation} updateMutation = {updateMutation}/>}
    </>
  );
}
