import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Collections = () => {
  const currentUser = useSelector((state) => state.currentUser.data);
  const currentUserDataLoadingState = useSelector(
    (state) => state.currentUser.loading
  );

  return (
    <div className="h-full overflow-y-auto  font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[3.5rem]  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center   px-8">
            <div className="flex flex-col items-start mb-6 w-full">
              <span className="text-[0.875rem] text-start capitalize text-[#7f858c]/70 font-medium">
                <p className="text-[1.4rem] text-[#eeeeee]  flex items-center gap-3  mb-5 mt-1.5 font-medium capitalize">
                  Collections
                </p>
              </span>
            </div>
          </div>
          <div className="px-8 pt-4  w-full h-full ">
            <div className=" flex gap-4 ">
              {/* content */}
              {currentUserDataLoadingState ? (
                <span>loading data...</span>
              ) : (
                [
                  { name: "todos", count: currentUser.todoCollections.length,path:'/collections/todos' },
                  { name: "notes", count: currentUser.noteCollections.length,path:'/collections/notes'},
                ].map((item, id) => (
                  <Link
                  to={item.path}
                    key={id}
                    className="h-fit w-60 bg-[#15191f]  p-[1.25rem] flex items-end rounded-lg cursor-pointer"
                  >
                    <div className="w-full capitalize flex flex-col  justify-end">
                      <span className="text-[0.925rem] font-medium">
                        {item.name}
                      </span>
                      <span className="text-[0.75rem] text-[#737373]">
                        {item?.count} files
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
