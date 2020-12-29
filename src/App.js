import { useEffect, useState } from "react";

const useSemiPersistentState = (key, initialState = "") => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => localStorage.setItem(key, value), [key, value]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={filteredStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} value={search} />
    </>
  );
};

const List = ({ list }) =>
  list.map((item) => <Item key={item.objectID} {...item} />);

const Item = ({ url, title, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);

export default App;
