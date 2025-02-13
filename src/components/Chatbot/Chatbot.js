import React from 'react'
import styles from "../Chatbot/Chatbot.module.css"

const Chatbot = () => {
    return (
        <section>
            <div className={styles.Chatbot_main}>
               
                <div className={styles.chatContainer}>
                    {/* Header */}
                    <div className={styles.header}>
                        <img
                            src="images/Earthanic-Logo.png"
                            alt="Profile"
                            className={styles.profileImage}
                        />
                        <div className={styles.profileInfo}>
                            <p className={styles.profileName}>AI Chatbot</p>
                            {/* <p className={styles.status}>Online</p> */}
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className={styles.chatBody}>
                        <div className={`${styles.message} ${styles.sent}`}>
                            <p>What happened last night Swaibu?</p>
                            <span className={styles.time}>2:19 PM</span>
                        </div>

                        <div className={`${styles.message} ${styles.received}`}>
                            <p>You were drunk.</p>
                            <span className={styles.time}>2:19 PM</span>
                        </div>

                        <div className={`${styles.message} ${styles.sent}`}>
                            <p>No I wasnt.</p>
                            <span className={styles.time}>2:19 PM</span>
                        </div>

                        <div className={`${styles.message} ${styles.received}`}>
                            <p>
                                Dude, you threw my hamster across the room and said PIKACHU I
                                CHOOSE YOU
                            </p>
                            <span className={styles.time}>2:19 PM</span>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Type a message..." />
                        <button><img src='images/send.png'/></button>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Chatbot