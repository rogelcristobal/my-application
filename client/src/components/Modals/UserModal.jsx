
import PropTypes from 'prop-types'
const UserModal = ({state}) => {
  return (
    <div onClick={(e)=>{
        e.stopPropagation()
       
    }} className={`bg-[#212121] rounded-lg drop-shadow absolute top-14 right-0 transition-all duration-100 ease-in-out ${state?'h-32 w-72':'h-0 w-0'}`}>

    </div>
  );
}

UserModal.propTypes={
    state: PropTypes.bool,
}

export default UserModal;
