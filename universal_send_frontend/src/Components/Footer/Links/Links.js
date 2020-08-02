import React from 'react';
import './Links.scss'

const Links = (users) => {
    const userInfo = users.props;
    return(
        <>
            <div class="links">
                <a href= {userInfo.linkedin} target="_blank" rel="noopener noreferrer" class="fa fa-linkedin"> </a>
                <a href= {userInfo.facebook} target="_blank" rel="noopener noreferrer" class="fa fa-facebook"> </a>
                <a href= {userInfo.email} target="_blank" rel="noopener noreferrer"> {userInfo.name} </a>
                <a href= {userInfo.twitter}  target="_blank" rel="noopener noreferrer" class="fa fa-twitter"> </a>
                <a href= {userInfo.github} target="_blank" rel="noopener noreferrer" class="fa fa-github"> </a>
            </div>
        </>
    );
}

export default Links;