import { Posts } from "./Posts";
import "./App.css";
import {
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const  App = () => {
  const queryClient = new QueryClient()
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <h1>Blog Post</h1>
      <Posts />
    </div>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
