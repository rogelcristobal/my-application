import React from "react";
import { useSelector } from "react-redux";
const Home = () => {
  
  const currentUser = useSelector((state) => state.currentUser.data);
  const userDataLoading = useSelector((state) => state.currentUser.loading);


  return (
    <div className="h-full  w-full flex flex-col items-start justify-start relative">
      <div className=" h-full overflow-y-scroll pt-2 px-6 w-full">
        <div className=" w-full  view h-[120%]  mt-4">
          <div className="gap-4 w-fit grid grid-flow-col">
            <div className="view h-fit flex items-start border-dark flex-col justify-end p-4 w-52">
              <span className={`text-sm`}>total notes</span>

              {userDataLoading ? (
                  <span>loading</span>
                ) : (
                  currentUser?.totalNotes
                )}
            </div>

            <div className="view h-fit flex items-start border-dark flex-col justify-end p-4 w-52">
              <span className="text-sm">total todos</span>
              <span>
                {userDataLoading ? (
                  <span>loading</span>
                ) : (
                  currentUser?.totalTodos
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
