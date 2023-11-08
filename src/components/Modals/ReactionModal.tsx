import EmojiPicker from 'emoji-picker-react';

function ReactionModal(){
    return (
        <div id='emoji-modal-container'>
            <EmojiPicker 
                height={300} 
                width={300} 
                lazyLoadEmojis = {true}
                skinTonesDisabled = {true}
            />
        </div>
    );
}

export default ReactionModal