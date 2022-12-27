import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LongPulling = () => {
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
        try {
            const {data}  = await axios.get("http://localhost:5000/get-messages");
            console.log(true);
            setMessages(prev => [data, ...prev]);
            await subscribe();
        } catch (e) {
            setTimeout(() => {
                subscribe();
            }, 5000);
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

export default LongPulling;