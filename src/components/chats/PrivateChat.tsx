function PrivateChat(){
    return(
        <div className="bg-darkBeige h-full rounded-bl-lg flex flex-row">
            <div className="p-2 w-[13.5rem]">
                <div className="w-full">
                    <input 
                        type="text" 
                        placeholder="Find or start a conversation"
                        className="w-full p-1 rounded-sm outline-none bg-taupe placeholder:text-grayishWhite placeholder:text-sm"
                    />
                </div>
                <div className="mt-3 w-full flex flex-col gap-1 overflow-auto max-h-[28.5rem]">

                    {/* dummy user 1 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/10.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div>

                    {/* dummy user 2 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/14.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-red-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Offline</p>
                        </div>
                    </div>

                    {/* dummy user 3 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div>

                    {/* dummy user 4 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div>

                    {/* dummy user 5 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div>

                    {/* dummy user 6 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div>

                    {/* dummy user 7 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div>

                    {/* dummy user 8 */}
                    <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-beige flex-grow p-2">
                conversations
            </div>
        </div>
    )
}

export default PrivateChat