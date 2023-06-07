import React from "react";

import { LuSearch } from "react-icons/lu";
const SearchBar = () => {
  const inputRef = React.useRef(null);
  const [state, setState] = React.useState({
    hover: false,
    focus:false,
    input: "",
  });
  const hoverToggle = () => {
    setState({ ...state, hover: !state.hover,focus:!state.focus });
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        inputRef.current.focus();
        setState({ ...state, hover: !state.hover ,focus:!state.focus});
      }
    };
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setState({ ...state, hover: false ,focus:false});
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [inputRef]);
  return (
    <div className="max-w-[24rem] w-full relative ">
      <input
        ref={inputRef}
        type="text"
        onMouseEnter={hoverToggle}
        onMouseLeave={hoverToggle}
        placeholder="Search document here"
        onChange={(e) =>
          setState({
            ...state,
            input: e.target.value,
          })
        }
        className={`input  input-ghost relative placeholder:text-[#a7a9ad]/70 w-full input-sm  placeholder:text-[0.785rem] h-11 pl-11 max-w-sm focus:bg-[#1e1f23] placeholder:font-medium border-dark cursor cursor-pointer focus:outline-none ${
          state.hover ? "bg-[#1e1f23] " : ""
        }`}
      />
      <LuSearch
        className={`absolute   text-md top-1/2 -translate-y-1/2 ml-4 ${
          state.hover ? "text-[#a7a9ad]" : "text-[#a7a9ad]/70"
        }`}
      />

      {!state.hover&& !state.input&&(
        <div class=" absolute text-[#a7a9ad] badge  flex px-2  right-4 text-[0.7rem] top-1/2 -translate-y-1/2 badge-sm bg-[#26272e]/60">
          Ctrl + k
        </div>
      )}
    </div>
  );
};

export default SearchBar;
