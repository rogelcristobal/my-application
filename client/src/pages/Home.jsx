import React from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { currentUser, userDataLoading } = React.useContext(AuthContext);

  return (
    <div className="h-full  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll pt-6 px-10 w-full">
        <div className=" w-full  view h-[120%] p-4 mt-4">
          <div className="gap-4 w-fit grid grid-flow-col">
            <div className="view h-fit flex items-start flex-col justify-end p-4 w-52">
              <span className="text-sm">total notes</span>
              <span>
                {userDataLoading ? (
                  <span>loading</span>
                ) : (
                  currentUser.totalNotes
                )}
              </span>
            </div>

            <div className="view h-fit flex items-start flex-col justify-end p-4 w-52">
              <span className="text-sm">total todos</span>
              <span>
                {userDataLoading ? (
                  <span>loading</span>
                ) : (
                  currentUser.totalTodos
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
