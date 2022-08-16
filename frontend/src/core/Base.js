import React from 'react'
import Menu from './Menu';
// #16191f
const Base = ({
    title = "my title",
    description = "my description",
    className,
    children
}) => {
    return (
        <>
            <div className="h-screen w-screen text-white bg-[#1d212a]">
                <Menu />

                <div className="w-full flex justify-center pt-10 " >

                    <div className="flex items-center flex-col gap-3">
                        <h2 className="text-4xl"> {title}</h2>
                        <p className="text-gray-300">{description}</p>
                    </div>

                </div>

                <div className="flex w-full justify-center mt-10">
                
                    <div className={className}> {children} </div>

                    <div>
                </div>



                </div>
            </div>
        </>
    )
}

export default Base;
