import EmojiPicker from 'emoji-picker-react';

function Emoji() {
    return (
        <div className='absolute right-5 bottom-14'>
            <EmojiPicker 
                height={300} 
                width={300} 
                onEmojiClick={(e)=>{console.log(e)}}
                lazyLoadEmojis = {true}
            />
        </div>
    );
}

export default Emoji