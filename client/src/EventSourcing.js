import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: new Date()
        })
    }

    useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/connection');
        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [...prev, message]);
        }
    }

    return <div className='center'>
        <div>
            <div>
                <div className='form'>
                    <input value={value} type="text" onChange={(e) => setValue(e.target.value)}/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
            </div>
            <div className="messages">
                {messages.map(mess => 
                    <div className='message' key={mess.id}>
                        {mess.message}
                    </div>
                )}
            </div>
        </div>
    </div>
}

export default EventSourcing;