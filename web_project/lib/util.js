async function handleAsyncReq(url, body) {  
    let res = await fetch(url, body);
    return ((res.ok == false) ? false : await res.json());
}

export {
    handleAsyncReq
}

