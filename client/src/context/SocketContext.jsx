import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { userInfo } = useAppStore();

    useEffect(() => {
      if(userInfo){
        const newSocket = io(HOST, {
            withCredentials: true,
            query: { userId: userInfo.id },
        });

        newSocket.on("connect", () => {
            console.log("Connected to socket server");
        });
       
        const handleRecieveMessage = (message) => {
            const {selectedChatData, selectedChatType, addMessage, addContactsInDMContacts} = useAppStore.getState();

            if(selectedChatType !== undefined && (selectedChatData._id === message.sender._id  || selectedChatData._id === message.recipient._id )){
                console.log("message rec.", message);
                addMessage(message);
            }
            addContactsInDMContacts(message);
        };

        const handleRecieveChannelMessage = (message) => {
            const {selectedChatData, selectedChatType, addMessage, addChannelInChannelList} = useAppStore.getState();

            if(selectedChatType !== undefined && selectedChatData._id === message.channelId){
                console.log("message rec.", message);
                addMessage(message);
            }
            addChannelInChannelList(message);

        };

        
        newSocket.on("recieveMessage", handleRecieveMessage);
        newSocket.on("recieve-channel-message", handleRecieveChannelMessage);

        setSocket(newSocket); 
        
        return () => {
            newSocket.disconnect();
        };
      }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};