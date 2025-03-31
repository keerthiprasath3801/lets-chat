import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
    const {messages, getMessages, isMessageLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if(isMessageLoading) {
        return (
            <div className='flex-1 flex flex-col h-full'>
                <ChatHeader/>
                <div className='flex-1 overflow-auto'>
                    <MessageSkeleton/>
                </div>
                <MessageInput/>
            </div>
        )
    }
    
    return (
        <div className='flex-1 flex flex-col h-full'>
            <ChatHeader/>
            <div className='flex-1 overflow-y-auto p-4 space-y-3'>
                {messages.length > 0 ? (
                    messages.map(message => (
                        <div 
                            key={message._id} 
                            className={`flex items-end gap-2 ${message.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}
                            ref={messageEndRef}
                        >
                            {message.senderId !== authUser._id && (
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full border">
                                        <img
                                            src={selectedUser.profilePic || "/avatar.png"}
                                            alt="profile pic"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.senderId === authUser._id 
                                    ? 'bg-primary text-primary-content rounded-tr-none' 
                                    : 'bg-base-300 rounded-tl-none'
                            }`}>
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="rounded-md mb-2 max-w-full"
                                    />
                                )}
                                <p className="break-words">{message.text}</p>
                                <div className="text-xs opacity-70 mt-1 text-right">
                                    {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </div>
                            {message.senderId === authUser._id && (
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full border">
                                        <img
                                            src={authUser.profilePic || "/avatar.png"}
                                            alt="profile pic"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">No messages yet</p>
                )}
                <div ref={messageEndRef} />
            </div>
            <MessageInput/>
        </div>
    )
}

export default ChatContainer;