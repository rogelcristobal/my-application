import React from "react";
import Axios from "axios";
import { PiMagnifyingGlass } from "react-icons/pi";
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
    <div className=" input input-ghost view w-full max-w-xs relative h-[2.35rem] bg-[#1a1f23] rounded-lg  ">
      <input
        ref={inputRef}
        type="text"
        onMouseEnter={hoverToggle}
        onMouseLeave={hoverToggle}
        placeholder="Search"
        onChange={(e) =>
          setState({
            ...state,
            input: e.target.value,
          })
        }
        className={` h-full bg-inherit placeholder:font-inter text-inherit text-sm relative placeholder:text-neutral-400/50 w-full placeholder:text-[0.8rem]  pl-7 max-w-sm  placeholder:font-normal focus:text-inherit cursor-pointer  focus:outline-none ${
          state.hover ? "" : " "
        }`}
      />
      <PiMagnifyingGlass
        className={`absolute   text-md top-1/2 -translate-y-1/2 ml-0 ${
          state.hover ? "text-[#707070]" : "text-neutral-400/60"
        }`}
      />

     
    </div>
  );
};

export default SearchBar;
