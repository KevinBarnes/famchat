import React, { useEffect, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listMessages } from './graphql/queries';
import logo from './logo.svg';
import './App.css';



function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    API
      .graphql(graphqlOperation(listMessages))
      .then((response) => {
        const items = response.data?.listMessages?.items;
        
        if (items) {
          setMessages(items);
        }
      });
  }, []);
  
  // Placeholder function for handling changes to our chat bar
  const handleChange = () => {};
  
  // Placeholder function for handling the form submission
  const handleSubmit = () => {};
  
  return (
    <div className="container">
      <div className="messages">
        <div className="messages-scroller">
        {messages.map((message) => {
            const baseClass = message.author === 'Kevin' ? 'message me' : 'message';
            return (<div
              key={message.id}
              className={message.body.includes('?') ? `questionMsg ${baseClass}` : baseClass}>{message.body}</div>
          )})}
        </div>
      </div>
      <div className="chat-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="messageBody"
            placeholder="Type your message here"
            onChange={handleChange}
            value={''}
          />
        </form>
      </div>
    </div>
  );
};

export default App;