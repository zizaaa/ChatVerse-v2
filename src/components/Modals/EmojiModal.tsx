import EmojiPicker from 'emoji-picker-react';
import { useEffect } from 'react';

function EmojiModal({setShowModal, onEmojiSelect }) {

    const handleEmojiSelect = (emoji) => {
        onEmojiSelect(emoji);
    };

    // Add an event listener to the document to detect clicks outside the modal
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('#emoji-modal-container') && !e.target.closest('#emojiButton')) {
                setShowModal(false); // Close the modal when clicking outside
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (

        <div id='emoji-modal-container'>
            <EmojiPicker 
                height={300} 
                width={300} 
                onEmojiClick={(e)=>{handleEmojiSelect(e.emoji)}}
                lazyLoadEmojis = {true}
                skinTonesDisabled = {true}
            />
        </div>
    );
}

export default EmojiModal;
