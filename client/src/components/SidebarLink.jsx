import React from 'react';

const SidebarLink = ({item,id, initialTrue,sidebarState}) => {
    const [hoverState,setHOverState] = React.useState(false)
    const hoverToggle=()=>{
        setHOverState(!hoverState)
    }
  return (
     <button onMouseEnter={hoverToggle} onMouseLeave={hoverToggle} key={id} className={`flex items-center gap-3.5 rounded-lg  text-[0.75rem] text-left   ${initialTrue? 'text-[#2c84fb] bg-neutral-100/50 ': 'text-[#a8adb7]'} ${sidebarState?' w-9 h-9 justify-center':' px-3 py-2.5'} flex-shrink-0   whitespace-nowrap  relative capitalize font-medium mb-1 w-full`}>
            <span className='text-[1rem]'>{item.icon}</span> {!sidebarState&&item.title}
        <div className={`${initialTrue? 'h-[80%]': 'h-0'} ${sidebarState?'-right-[1.1rem]':'-right-6'} transition-all duration-75 w-[4px] rounded-l-xl absolute  top-1/2 -translate-y-1/2 bg-[#2c84fb]`}></div>
    </button>
  );
}

export default SidebarLink;
