import React from 'react';

const Message = ({chat, user}) => (
    <li className={`chat ${user === chat.username ? "right" : "left"}`}>
        {<img src={chat.img} alt={`${chat.username}'s profile pic`} />}
        {chat.content}
    </li>
);

export default Message;