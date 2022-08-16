import React from 'react';

import API from './backend';
import Base from './Base';

const Home = () => {

    console.log(API);
    return (
        <Base title="Home Page" className="text-xl p-2" description="Welcome to T-shirt Store">
           <h1 className=" text-2xl"> hello from home</h1>
        </Base>
    )
}

export default Home;
