

const Settings = () => {
  return (
       <div className="h-full overflow-y-auto font-inter w-full flex flex-col items-end justify-start relative">
      <div className=" h-full  pt-[3.5rem] px-6  w-full">
        <div className=" container mx-auto   h-[150%]  ">
          <div className="flex items-center  px-5">
            <div className="flex flex-col  w-full">
              <span className="text-[0.8rem]  text-[#686868]/70  font-normal">
                  <span className="capitalize ">Settings</span>
                <p className="text-[1.5rem] text-[#e8e8e8]  mt-1.5 font-medium ">
                  {/* {" "}
                  Welcome back, {isLoaded && user.firstName} */}
                  General settings
                </p>
              </span>
            </div>

            
          </div>
          <div className="px-5 pt-5 h-full">
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
