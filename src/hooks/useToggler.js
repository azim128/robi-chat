import { useState } from "react"

const useToggler = () => {
  const [toggle,setToggle] = useState(false)
  const handleChangeToggler=()=>{
    setToggle(!toggle)
  }
  return {
    toggle,
    handleChangeToggler
  }
}

export default useToggler