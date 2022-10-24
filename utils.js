export const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

export const snackbarError = {
    position: 'bottom-center',
    style: {
      backgroundColor: 'red',
      borderRadius: '13px',
      color: 'white',
      fontSize: '20px',
      textAlign: 'left',
    },
    closeStyle: {
      color: 'white',
      fontSize: '16px',
    },
}
export const snackbarSuccess = {
    position: 'bottom-center',
    style: {
      backgroundColor: 'green',
      borderRadius: '13px',
      color: 'white',
      fontSize: '20px',
      textAlign: 'left',
    },
    closeStyle: {
      color: 'white',
      fontSize: '16px',
    },
}