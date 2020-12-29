import { useEffect, useState, useRef } from "react";

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        search={searchTerm}
        onChange={handleSearch}
        isFocused
      >
        <strong>Search</strong>
      </InputWithLabel>

      <hr />

      <List list={filteredStories} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  children,
  value,
  type = "text",
  onChange,
  isFocused,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        onChange={onChange}
        autoFocus={isFocused}
        value={value}
      />
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
