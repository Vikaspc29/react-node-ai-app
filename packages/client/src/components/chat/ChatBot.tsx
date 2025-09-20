import axios from 'axios';
import React, { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import ChatMessages from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';

type ChatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTypying, setIsBotTypying] = useState(false);
   const [error, setError] = useState('');
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [
            ...prev,
            {
               content: prompt,
               role: 'user',
            },
         ]);

         setIsBotTypying(true);
         setError('');

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });

         setMessages((prev) => [
            ...prev,
            {
               content: data.message,
               role: 'bot',
            },
         ]);
      } catch (err) {
         console.error(err);
         setError('Something went wrong. please try again!');
      } finally {
         setIsBotTypying(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            <ChatMessages messages={messages} />

            {isBotTypying && <TypingIndicator />}

            {error && <p className="text-red-500">{error}</p>}
         </div>

         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
