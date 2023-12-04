import { FaChevronLeft } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

function SuccessMessage() {
    const navigate = useNavigate();

    const handleNavigate =()=>{
        navigate(-1);
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-md drop-shadow-md p-2 gap-6 h-72 relative bg-taupe">
            <button 
                onClick={handleNavigate}
                className="absolute top-3 left-2 text-xl"
            >
                <FaChevronLeft/>
            </button>
            <img 
                src='/icon/sent.png'
                className="h-24"
            />
            <h1 className="text-2xl">Sent!</h1>

            <Link to='/form/register' className="bg-beige py-3 w-96 rounded-full drop-shadow-md text-xl text-center">
                Create your account!
            </Link>
        </div>
    )
}

export default SuccessMessage