import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import './App.css';
import Message from './Message.js';

var _uname = "User";
var start_chat = true;

class Chatroom extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            chats: [{
                username: "Oscar",
                content: <p>{"Hi !"}</p>,
                img: "bot.png",
            },
            {
                username: "Oscar",
                content: <p>{"My name is Oscar!"}</p>,
                img: "bot.png",
            },
            {
                username: "Oscar",
                content: <p>{"What's your name?"}</p>,
                img: "bot.png",
            }]
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        var _sentText = ReactDOM.findDOMNode(this.refs.msg).value;
        this.setState({
            chats: this.state.chats.concat([{
                username: _uname,
                content: <p>{_sentText}</p>,
                img: "duck.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
            if (start_chat) {
                var rpl = "Hi " + _sentText;
                this.setState({
                    chats: this.state.chats.concat([{
                        username: "Oscar",
                        content: <p>{rpl}</p>,
                        img: "bot.png",
                    },
                    {
                        username: "Oscar",
                        content: <p>{"I answer your queries about movies."}</p>,
                        img: "bot.png",
                    },
                    {
                        username: "Oscar",
                        content: <p>{"Use '!axiom' to add an axiom."}</p>,
                        img: "bot.png",
                    },
                    {
                        username: "Oscar",
                        content: <p>{"Supported axioms are Declaration, Assertion, Sub, Equivalent, Disjoint, Domain and Range related axioms."}</p>,
                        img: "bot.png",
                    },
                    {
                        username: "Oscar",
                        content: <p>{"Use '!check' to check the consistency of the knowledge base."}</p>,
                        img: "bot.png",
                    },
                    {
                        username: "Oscar",
                        content: <p>{"I am still learning English and would prefer if you speak OWL. I will still try to understand and answer your queries!"}</p>,
                        img: "bot.png",
                    }])
                });
                start_chat = false;
            }
            else {
                // Add question.
                var qry = 'http://192.168.59.107:8080/api?query=' + _sentText;
                axios.get(qry)
                    .then(response => {
                        this.setState({
                            chats: this.state.chats.concat([{
                                username: "Oscar",
                                content: <p>{response.data}</p>,
                                img: "bot.png",
                            }])
                        });
                    })
                    .catch(error => {
                        this.setState({
                            chats: this.state.chats.concat([{
                                username: "Oscar",
                                content: <p>{"mY bRaIn Is TuRnEd OfF !!! bEeEp BoOoP !!"}</p>,
                                img: "bot.png",
                            }])
                        });
                    })
            }
        });
    }

    render() {
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Oscar</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={_uname} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chatroom;