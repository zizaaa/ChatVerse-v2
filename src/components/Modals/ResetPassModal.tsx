import resetPass from "../resetcredentials/resetPass";
import { useRef,useState } from "react"

function ResetPassModal({ showModal, onClose }) {
    if (!showModal) return null;

    const emailRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')

    const handleResetPass =()=>{
        const emailRegex = /^.+@.+$/;
        if(!emailRef.current.value || !emailRegex.test(emailRef.current.value)){
            setErrorMessage('Invalid Email')
            return
        }

        resetPass(emailRef.current.value)
        .then((message)=>{
            if(message === 'sent'){
                setMessage(message)
            }else{
                setErrorMessage(message)
            }
        })

        
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-full overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="bg-beige relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-base font-semibold leading-6 text-white" id="modal-title">Reset password</h3>
                        <div className="mt-2 w-full">
                            {
                                message === 'sent' ?
                                <p>
                                    An email containing a password reset link has been dispatched to your inbox.
                                </p>
                                :
                                <>
                                    <input 
                                        className="w-full outline-none rounded-sm text-black px-2 py-1" 
                                        type="email" 
                                        placeholder="Email" 
                                        ref={emailRef}
                                        required
                                    />
                                    <p className=' text-center text-sm text-red-600'>
                                        {errorMessage}
                                    </p>
                                </>
                            }
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-beige px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={handleResetPass}
                        className={`${message === 'sent' ? 'hidden':''} inline-flex w-full justify-center rounded-md bg-taupe px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                    >
                        Send reset link
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={onClose} // Call the onClose function on button click
                    >
                        {
                            message === 'sent' ? 'Okay':'Cancel'
                        }
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassModal;
