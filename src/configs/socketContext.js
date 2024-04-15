import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BACKEND_URL } from '../utils';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ user, children }) => {
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState('')

    useEffect(() => {
        const newSocket = io(BACKEND_URL, { autoConnect: true }); // Địa chỉ server
        setSocket(newSocket);
        
        return () => newSocket.disconnect();
    }, [user]);
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};