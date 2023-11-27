const Todos = () => {
  return (
    <div className="h-full overflow-y-auto view font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[3.5rem]  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center   px-0">
            <div className="flex flex-col items-start mb-6 w-full">
              <span className="text-[0.875rem] text-start capitalize text-black font-medium">
                <p className="text-[1.5rem] flex items-center gap-3  mb-5 mt-1.5 font-medium capitalize">
                  <span className=" text-black">Collections</span>
                  <span className=" text-black h-fit flex">
                    &#x203A;
                  </span>
                  Todos
                </p>
              </span>
            </div>
          </div>
          <div className="px-6 pt-0  w-full h-full ">
            <div className=" flex gap-6 ">{/* content */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
  