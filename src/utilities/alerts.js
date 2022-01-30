import Swal from "sweetalert2";

export default class Alerts {
    static showSuccessToast(text,title='') {
        Swal.fire({
            title,
            html: `<span style="color:#fff">${text}</span>`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            padding: '0 10px',
            iconColor: '#fff',
            timerProgressBar: true,
            background: '#64ac5e',
            icon: 'success',
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }

    static showErrorToast(text, title='') {
        let errors;
        if (text.response.data.errors || text.response.data.data) {
            errors = '<ul class="m-0 p-0">';
            const errorsData = text.response.data.errors ? text.response.data.errors : text.response.data.data;
            let errorsArr = Object.values(errorsData);
            errorsArr = errorsArr.flat();
            errorsArr.forEach(error => errors += `<li>${error}</li>`);
            errors += '</ul>';
        }

        if (!title && text.response.data.message) {
            title = `<span style="color:#fff;line-height:14px">${text.response.data.message}`;
        }

        let errorsHtml;

        if (errors) {
            title += `<br><small style="color:#fff">${errors}</small>`;
        }
        title += '</span>';

        Swal.fire({
            title,
            html: errorsHtml,
            toast: true,
            icon: 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            padding: '0 10px',
            iconColor: '#fff',
            timerProgressBar: true,
            background: '#7d0f0f',
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }
}