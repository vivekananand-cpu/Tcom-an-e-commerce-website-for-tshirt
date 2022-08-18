import API from "../../core/backend";

import axios from 'axios';

export const createCatagory = (userId, token, catagory) => {

    return fetch(`${API}/catagory/create/${userId}`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body:JSON.stringify(catagory)


    })
    .then(res=>res.json)
    .catch(err=>console.log(err))
};


export const getAllCatagories = () =>{

    return fetch(`${API}/catagories`).then(res=>res.json()).catch(err=>console.log(err));
}




//products calls


//create product

export const createProduct =(userId,token,product) =>{
    
    return fetch(`${API}/product/create/${userId}`,{

        method:"POST",

        headers:{

            Authorization :`Bearer ${token}`
        },

        body:product
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}


export const getAllProducts = () =>{

return fetch(`${API}/products`).then(res=>res.json()).catch(err=>console.log(err));

}

//delete a product


export const deleteProduct =(productId,userId,token) =>{

return fetch(`${API}/product/${productId}/${userId}`,{

    method:"DELETE",
    headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
    }
    
})

.then(res=>res.json())

.catch(err=>console.log(err))

};


//get a product


export const getProduct = (productId) =>{

    return fetch(`${API}/product/${productId}`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

//update a product


export const updateProduct =(userId,token,productId,product) =>{

return fetch(`${API}/product/${productId}/${userId}`,{
    method:"PUT",
    headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
    },
    body:{
        product
    }
})

.then(res=>res.json())

.catch(err=>console.log(err));

};
