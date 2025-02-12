import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi-node.vercel.app/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const InfinitePeople = () => {
  // Fetch data with React Query's useInfiniteQuery
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({pageParams = initialUrl}) => fetchUrl(pageParams),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });
  console.log(data, "hhh")
  if(isLoading){
    return <div className="loading">Loading...</div>
  }

  if(isError){
    console.log(error.message)
    return <div className="error">Error : {error.message}</div>
  }
  
  return (
    <InfiniteScroll
    hasMore={hasNextPage}
    loadMore={() => {
      if (!isFetching) {
        fetchNextPage();
      }
    }}
    >
      {data.pages.map((page) =>page.results.map((person) => (
          <Person
            key={person.fields.name}
            name={person.fields.name}
            hairColor={person.fields.hair_color}
            eyeColor={person.fields.eye_color}
          />
        ))
      )}
    </InfiniteScroll>
  );
  
};
