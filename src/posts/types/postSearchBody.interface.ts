interface PostSearchBody {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}
