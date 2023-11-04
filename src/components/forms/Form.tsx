import { Outlet } from "react-router-dom"

function Form(){
    return(
        <div className="flex items-center justify-center w-full small:w-[60rem] h-full large:h-[35rem]  rounded-lg drop-shadow-lg bg-beige p-2">
            <Outlet/>
        </div>
    )
}

export default Form