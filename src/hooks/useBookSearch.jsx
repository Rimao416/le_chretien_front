import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber) {
  const [Myloading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [Mybooks, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setBooks([]);
  }, [query]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res)
        // setBooks((prevBooks) => {
        //   return [
        //     ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)]),
        //   ];
        // });
        console.log("ifosjflsjdflsdmjfkqlmjsml")
        console.log(Mybooks)
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { Myloading, error, Mybooks, hasMore };
}
