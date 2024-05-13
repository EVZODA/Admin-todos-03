import { getCookie, hasCookie, setCookie } from "cookies-next"


export const getCookies = ():{[id:string]:number} => {

    if (hasCookie('cart')){
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart
    }

    return {}
}

export const addProductToCart = (id:string) => {
    const cookieCart = getCookies()

    if (cookieCart[id]) {
        cookieCart[id] = cookieCart[id] + 1
    } else {
        cookieCart[id]= 1
    }

    setCookie('cart', JSON.stringify(cookieCart))
}

export const deleteProductToCart = (id:string) => {
    const cookieCart = getCookies()
   
    if (cookieCart[id]) {
        delete cookieCart[id]
        setCookie('cart', JSON.stringify(cookieCart))
    } else {
        return 
    }

}

export const removeSingleItemFromCart = (id:string) => {
    const cookieCart = getCookies()

    if (cookieCart[id] && cookieCart[id]!=1) {
        cookieCart[id] = cookieCart[id] - 1
        setCookie('cart', JSON.stringify(cookieCart))
        return
    } 

    if (cookieCart[id]===1) {
        delete cookieCart[id]
        setCookie('cart', JSON.stringify(cookieCart))
        return
    } 

   
}