import React from 'react'
import styles from "../Navbar/Navbar.module.css"

const Navbar = () => {
    return (
        <section>
            <div className={styles.Navbar}>
                <div className={styles.logo_div} >
                    <img src='images/Earthanic-Logo.png' />
                </div>
                <div className={styles.nav}>
                    <div><p>All</p></div>
                    <div><p>Shirts</p></div>
                    <div><p>Stickers</p></div>
                    <div><p>Bathing</p></div>
                    <div><p>Candles</p></div>
                    <div><p>Soap</p></div>
                </div>
                {/* <div className={styles.cart_icon}>
                    <img src='images/Cart1.png'/>
                </div> */}
            </div>
        </section>
    )
}

export default Navbar
