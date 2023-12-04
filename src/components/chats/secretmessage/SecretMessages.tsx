import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTrash, FaCopy  } from "react-icons/fa6";
import logedInUser from "../../../firebase/data/user/logedInUser";
import userUID from "../../cookies/userUID";

function SecretMessages() {
    const env = import.meta.env;
    const uri = env.VITE_REACT_SERVER_URL;
    const currentDomain = window.location.origin;
    const [secretConvoUrl, setSecretConvoUrl] = useState();
    const textToCopyRef = useRef(null);

    const [range, setRange] = useState({ from: 0, to: 1 });
    const [secretMessageData, setSecretMessageData] = useState();

    useEffect(() => {
        const handleDatas = async () => {
            const user = await logedInUser(userUID());
            setSecretConvoUrl(user.secretMessageID)
            const { data } = await axios.get(
                `${uri}/api/getSecretMessage?id=${user.secretMessageID}&from=${range.from}&to=${range.to}`,
                {
                    headers: {
                        'authorization': `Bearer ${user.accessTOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSecretMessageData(data);
        };

        handleDatas();
    }, [range]);

    const handleRangeChange = (increment) => {
        setRange((prevRange) => ({
            from: Math.max(0, prevRange.from + increment),
            to: Math.min(secretMessageData?.dataLength || 1, prevRange.to + increment),
        }));
    };

    const handlePrevBtn = () => handleRangeChange(-1);
    const handleNextBtn = () => handleRangeChange(1);

    const handleDelete = async () => {
        const loggedInUser = await logedInUser(userUID());
        await axios.put(`${uri}/api/deleteMessage`, {
            id: loggedInUser.secretMessageID,
            toDeleteID: secretMessageData?.data[0]?.messageID,
        }, {
            headers: {
                'authorization': `Bearer ${loggedInUser.accessTOKEN}`,
                'Content-Type': 'application/json',
            },
        })
        .then(()=>{
            setRange({from:0,to:1})
        })
    };

    const handleCopyClick = () => {
        // Select the text in the p element
        const range = document.createRange();
        range.selectNode(textToCopyRef.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    
        // Execute the copy command
        document.execCommand('copy');
    
        // Clear the selection
        window.getSelection().removeAllRanges();
    
        // Optionally, provide some feedback to the user (e.g., display a tooltip)
        console.log('Text copied to clipboard');
    };

    return (
        <section className="bg-darkBeige h-full rounded-bl-lg flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row items-center justify-center gap-2">
                <button
                    onClick={handlePrevBtn}
                    className="text-xl drop-shadow-md"
                    disabled={range.from === 0}
                >
                    <FaChevronLeft />
                </button>
                <div className="bg-beige drop-shadow-md w-96 h-60 rounded-md p-2 flex items-center justify-center text-center flex-wrap relative">
                    <button className="absolute top-2 right-2 text-taupe drop-shadow-md" onClick={handleDelete}>
                        {
                            secretMessageData?.data[0]?.message? <FaTrash />:null
                        }
                    </button>
                    <p className="break-all">
                        {
                            secretMessageData?.data[0]?.message?
                            secretMessageData.data[0].message
                            :
                            'No Messages'
                        }
                    </p>
                </div>
                <button
                    onClick={handleNextBtn}
                    className="text-xl drop-shadow-md"
                    disabled={range.to === secretMessageData?.dataLength}
                >
                    <FaChevronRight />
                </button>
            </div>
            <div className="h-8 bg-beige flex items-center rounded-md">
                <p className="flex-grow px-2" ref={textToCopyRef}>
                    {
                        `${currentDomain}/send-secret-message/${secretConvoUrl}`
                    }
                </p>
                <button 
                    onClick={handleCopyClick}
                    className="bg-taupe h-full w-8 flex items-center justify-center rounded-e-md"
                >
                    <FaCopy />
                </button>
            </div>
        </section>
    );
}

export default SecretMessages;
