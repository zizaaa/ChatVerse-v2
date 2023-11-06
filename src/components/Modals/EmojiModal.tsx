import EmojiPicker from 'emoji-picker-react';
import { useEffect } from 'react';

function EmojiModal({setShowModal, onEmojiSelect }) {
    // const customEmojis=[
    //     {
    //         names: ['Alice', 'alice in wonderland'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png',
    //         id: 'alice'
    //     },
    //     {
    //         names: ['Dog'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/dog.png',
    //         id: 'dog'
    //     },
    //     {
    //         names: ['Hat'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/hat.png',
    //         id: 'hat'
    //     },
    //     {
    //         names: ['Kid'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/kid.png',
    //         id: 'kid'
    //     },
    //     {
    //         names: ['Mic'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/mic.png',
    //         id: 'mic'
    //     },
    //     {
    //         names: ['Moab', 'desert'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/moab.png',
    //         id: 'moab'
    //     },
    //     {
    //         names: ['Potter', 'harry', 'harry potter'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/potter.png',
    //         id: 'potter'
    //     },
    //     {
    //         names: ['Shroom', 'mushroom'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/shroom.png',
    //         id: 'shroom'
    //     },
    //     {
    //         names: ['Smily'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/smily.png',
    //         id: 'smily'
    //     },
    //     {
    //         names: ['Tabby', 'cat'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/tabby.png',
    //         id: 'tabby'
    //     },
    //     {
    //         names: ['Vest'],
    //         imgUrl:
    //             'https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/vest.png',
    //         id: 'vest'
    //     }
    // ]
    const handleEmojiSelect = (emoji) => {
        // Pass the selected emoji to the parent component
        onEmojiSelect(emoji);
        // console.log(emoji)
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

        <div className="absolute bottom-14 right-5" id='emoji-modal-container'>
            <EmojiPicker 
                height={300} 
                width={300} 
                onEmojiClick={(e)=>{handleEmojiSelect(e.emoji)}}
                lazyLoadEmojis = {true}
                skinTonesDisabled = {true}
                // customEmojis = {customEmojis}
            />
        </div>
    );
}

export default EmojiModal;
