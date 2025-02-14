import React, { useState, useEffect } from "react";
import styles from "../Chatbot/Chatbot.module.css";

const Chatbot = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                const mobileView = window.innerWidth <= 767;
                setIsMobile(mobileView);
                if (!mobileView) setIsChatOpen(true);
                else setIsChatOpen(false);
            };

            handleResize(); // Initialize state based on current width
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <section>
            <div className={styles.Chatbot_main}>
                {isMobile && !isChatOpen ? (
                    <div className={styles.chatIcon} onClick={toggleChat}>
                        <img src="images/Chat.png" alt="Chat" />
                    </div>
                ) : (
                    <div className={`${styles.chatContainer} ${isChatOpen ? styles.slideUp : styles.slideDown}`}>
                        {/* Header */}
                        <div className={styles.header} >
                            <img
                                src="images/favicon.png"
                                alt="Profile"
                                className={styles.profileImage}
                            />
                            <div className={styles.profileInfo}>
                                <p className={styles.profileName}>Product Consultant</p>
                               
                            </div>
                            <div className={styles.closeButton} onClick={toggleChat}>
                                X
                            </div>
                        </div>

                        {/* Chat Messages */}
                        {isChatOpen && (
                            <>
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
                                        <p>No I am</p>
                                        <span className={styles.time}>2:19 PM</span>
                                    </div>
                                    <div className={`${styles.message} ${styles.received}`}>
                                        <p>
                                            Dude, you threw my hamster 
                                        </p>
                                        <span className={styles.time}>2:19 PM</span>
                                    </div>
                                </div>
                                {/* Message Input */}
                                <div className={styles.inputContainer}>
                                    <input type="text" placeholder="Type a message..." />
                                    <button>
                                        <img className={styles.sendIcon} src="images/SendI.png" alt="Send" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Chatbot;
