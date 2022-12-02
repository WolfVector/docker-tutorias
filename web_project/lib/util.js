import Swal from 'sweetalert2'

function alertMessage(title, icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })

    Toast.fire({
        title,
        icon,
    })
}

async function handleAsyncReq(url, body) {  
    let res = await fetch(url, body);
    return ((res.ok == false) ? false : await res.json());
}

export {
    handleAsyncReq,
    alertMessage
}

