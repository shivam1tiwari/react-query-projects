import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi-node.vercel.app/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const InfiniteSpecies = () => {
  // TODO: get data for InfiniteScroll via React Query
  const {data, hasNextPage, fetchNextPage, isLoading, isFetching, isError, error}  = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({pageParams = initialUrl}) => fetchUrl(pageParams),
    getNextPageParam: (lastPage) => {return lastPage.next || undefined }
  })

  if(isLoading){
    return <div>Loading ...</div>
  }


  if(isError){
    return <div>Error : {error.message}</div>
  }
 
  return <InfiniteScroll 
          hasMore = {hasNextPage}
          loadMore={() => {
            if (!isFetching) {
              fetchNextPage();
            }
          }}
          >
             {data.pages.map((page) =>page.results.map((species) => (
          <Species
            key = {species.fields.name}
            name = {species.fields.name}
            language = {species.fields.language}
            averageLifespan = {species.fields.average_lifespan}
          />
        ))
      )}</InfiniteScroll>;
}
