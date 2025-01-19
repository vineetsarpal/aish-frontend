import aishImg from "./assets/Aish1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function ChatBubble ({ message }) {
    console.log(message)
    return(
        <>
            <div className={`chat-msg-container ${message.type}-msg-container`}>
                {message.type === 'ai' && <img src={aishImg} className={`${message.type}-icon`} />}
                <div className={`chat-bubble ${message.type}`}>
                    {message.content}
                </div>
                {message.type === 'user' && <FontAwesomeIcon icon={faCircleUser} className={`${message.type}-icon`} />}
            </div>
        </>
    )
}