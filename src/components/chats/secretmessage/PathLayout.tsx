import { Outlet } from "react-router-dom"

function PathLayout() {
    return (
        <div className="flex flex-col items-center justify-center bg-beige w-[60rem] h-[35rem] rounded-lg drop-shadow-lg gap-4">
            <Outlet/>
        </div>
    )
}

export default PathLayout