import React from 'react';
import './Footer.scss';
import Links from './Links/Links.js';
import data from './creators.json';

const Footer = () => {
    return(
        <>
        <div class="footer-container">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <footer>
                <b>Contact Us</b>
                <Links props = {data.creators[0]}/>
                <Links props = {data.creators[1]}/>
            </footer>
        </div>
        </>
    );
}

export default Footer;