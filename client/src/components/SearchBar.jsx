import React from "react";
import Axios from "axios";
import { LuSearch } from "react-icons/lu";
const SearchBar = () => {
  const inputRef = React.useRef(null);
  const [state, setState] = React.useState({
    hover: false,
    focus: false,
    input: "",
  });
  const hoverToggle = () => {
    setState({ ...state, hover: !state.hover, focus: !state.focus });
  };

  // React.useEffect(() => {
  //   const searchInput = async (phrase) => {
  //     try {
  //       const res = await Axios.get(
  //         `http://localhost:3001/collections/search/${phrase}`
  //       );
  //       console.log(res.data.result);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   if (state.input) {
  //     searchInput(state.input);
  //   }
  // }, [state.input]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        inputRef.current.focus();
        setState({ ...state, hover: !state.hover, focus: !state.focus });
      }
    };
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setState({ ...state, hover: false, focus: false });
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
    <div className="max-w-[23rem] w-full relative bg-transparent">
      <input
        ref={inputRef}
        type="text"
        onMouseEnter={hoverToggle}
        onMouseLeave={hoverToggle}
        placeholder="Search..."
        onChange={(e) =>
          setState({
            ...state,
            input: e.target.value,
          })
        }
        className={`input  input-ghost relative rounded-lg placeholder:text-[#a7a9ad]/70 w-full input-sm  placeholder:text-[0.785rem] h-[2.5rem] pl-11 max-w-sm focus:bg-[#1e1f23] placeholder:font-medium  cursor cursor-pointer focus:outline-none ${
          state.hover ? "bg-white" : "bg-white"
        }`}
      />
      <LuSearch
        className={`absolute   text-md top-1/2 -translate-y-1/2 ml-4 ${
          state.hover ? "text-[#a7a9ad]" : "text-[#a7a9ad]/70"
        }`}
      />

      {/* {!state.input && (
        <div className=" absolute text-[#a7a9ad]  items-center flex px-2  right-2 text-[0.7rem] top-1/2 -translate-y-1/2  gap-1">
          <kbd className="kbd kbd-xs bg-white shadow rounded p-0.5 text-[0.7rem]  text-[#a7a9ad]/70 px-1">
            ctrl
          </kbd>
          +
          <kbd className="kbd kbd-xs bg-white shadow rounded p-0.5 text-[0.7rem]  text-[#a7a9ad]/70 px-1">
            k
          </kbd>
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
