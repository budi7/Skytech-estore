/*
Required: nuxtToast

Callling alertHandler module

alertHandler($this, {
  msg : // custom message,
  type : // error, info, success
})
*/

const alertHandler = (vm, param) => {
  const tipe = param.type || 'success'

  vm.$toast.show(param.msg, {
    duration: 3000,
    fullWidth: true,
    fitToScreen: true,
    type: tipe
  })
}

export default alertHandler
