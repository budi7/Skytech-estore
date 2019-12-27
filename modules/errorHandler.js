/*
README

* Callling errorHandler module
errorHandler($this, {
  response : // gql response, can be null,
  global : // boolean, display error on global layout or page specific, require alertHandler modules,
  msg : // custom error message to override input error,
  debug : // your debug notes, to be showed on error
})

// template : use this copas to your code
errorHandler($this, {
  response: replace,
  global: replace,
  msg: replace
  debug: replace
})

* Retrieve handled errors
let errors = {}
errors = errorHandler($this, params)

// template : use this copas to your code
this.errors = errorHandler($this, {
  response: replace,
  global: replace,
  msg: replace,
  debug: replace
})
*/
import alertHandler from './alertHandler'

const isDebug = true

// error presets
const errorPresets = {
  noNetwork: 'Tidak dapat terhubung dengan server.',
  unknown: 'Maaf, terjadi kendala pada sistem kami saat ini. Hubungi CS kami untuk bantuan.',
  input: 'Input tidak valid.',
  data: 'Data tidak valid.',
  development: 'Maaf, saat ini permohonan anda tidak dapat diproses. Silahkan coba beberapa saat lagi, atau hubungi CS kami untuk bantuan.',
  server: 'Maaf, terjadi kendala pada server kami. Silahkan coba beberapa saat lagi.'
}

// core
const readGQLError = (gqlResponse) => {
  // const inputRegex = /input\./gi
  const translator = (val) => {
    const definition = {
      not_for_sell: 'Maaf barang untuk sementara tidak tersedia'
    }

    const tmp = val.split(':')
    switch (tmp[0]) {
      case 'confirmed': return 'Isian tidak sama dengan ' + tmp[1]
      case 'email': return 'Isian harus berupa email yang valid'
      case 'unique': return 'Isian sudah ada sebelumnya'
      case 'required': return 'Isian wajib diisi'
      case 'alpha_num': return 'Isian hanya boleh mengandung huruf dan angka'
      case 'min': return 'Isian minimal ' + tmp[1]
      case 'exists': return 'Isian telah ada sebelumnya'
      case 'invalid': return definition[tmp[1]] ? definition[tmp[1]] : 'Isian salah/tidak valid'
      case 'in': return `Isian harus salah satu dari ${tmp[1]}`
      case 'date': return 'Isian tanggal tidak benar'
      case 'lt': return `Isian harus kurang dari ${tmp[1]}`
      case 'size': return `Isian harus terdiri dari ${tmp[1]} karakter`
      case 'notfound': return 'Data tidak ditemukan'
      case 'notallowed': return 'Operasi tidak diperbolehkan'
      default: return val
    }
  }

  let formErrors = null
  formErrors = []

  for (const key in gqlResponse.graphQLErrors[0].validation) {
    if (Object.prototype.hasOwnProperty.call(gqlResponse.graphQLErrors[0].validation, key)) {
      if (!Array.isArray(formErrors[key])) {
        formErrors[key] = []
      }

      // push error to form_error
      for (let i = 0; i < gqlResponse.graphQLErrors[0].validation[key].length; i++) {
        formErrors[key].push(translator(gqlResponse.graphQLErrors[0].validation[key][i]))
      }
    }
  }
  return formErrors
}

const errorHandler = (vm, param) => {
  const gqlResponse = param.response ? param.response : null
  const isGlobal = param.global
  const customMsg = param.msg ? param.msg : null
  const debugNotes = param.debug ? param.debug : 'Not set'

  if (gqlResponse === null) {
    if (isGlobal) showGlobalError(vm, customMsg)
    return {
      msg: customMsg,
      data: null
    }
  }
  try {
    if (gqlResponse.networkError) {
      if (isGlobal) showGlobalError(vm, errorPresets.noNetwork)
      return {
        msg: errorPresets.noNetwork,
        data: { data: gqlResponse.networkError }
      }
      // return x
    } else if (gqlResponse.graphQLErrors) {
      // validation error
      if (gqlResponse.graphQLErrors[0].validation) {
        if (typeof gqlResponse.graphQLErrors[0].validation === 'string') {
          // single validation error
          if (gqlResponse.graphQLErrors[0].validation === '') {
            if (isGlobal) showGlobalError(vm, customMsg || errorPresets.input)
            return {
              msg: customMsg || errorPresets.input,
              data: null
            }
          } else {
            if (isGlobal) showGlobalError(vm, customMsg || readGQLError(gqlResponse.graphQLErrors[0].validation))
            return {
              msg: customMsg || readGQLError(gqlResponse.graphQLErrors[0].validation),
              data: null
            }
          }
        } else {
          // multiple input error
          if (isGlobal) showGlobalError(vm, customMsg || errorPresets.input)
          return {
            msg: customMsg || errorPresets.input,
            data: readGQLError(gqlResponse)
          }
        }
      } else {
        // development error
        if (isDebug) console.error('error : ' + gqlResponse.graphQLErrors[0].debugMessage + ' | ' + 'Error detail : ' + debugNotes)
        // if (isGlobal) showGlobalError(vm, errorPresets.development)
        // return {
        //   msg: errorPresets.development,
        //   data: {}
        // }

        if (isGlobal) showGlobalError(vm, errorPresets.development)
        return {
          msg: errorPresets.development,
          data: null
        }
      }
    } else {
      if (gqlResponse.length && gqlResponse[0].message === 'validation') {
        if (isGlobal) showGlobalError(vm, errorPresets.input)
        return {
          msg: errorPresets.input,
          data: readGQLError({
            graphQLErrors: [
              gqlResponse[0]
            ]
          })
        }
      }

      if (isGlobal) showGlobalError(vm, errorPresets.unknown + ' (ex-0001)')
      return {
        msg: errorPresets.unknown + ' (ex-0001)',
        data: null
      }
    }
  } catch (error) {
    console.error(error)
    if (isGlobal) showGlobalError(vm, errorPresets.unknown + ' (ex-0002)')
    return {
      msg: errorPresets.unknown + ' (ex-0002)',
      data: null
    }
  }

  function showGlobalError(vm, msg) {
    alertHandler(vm, {
      type: 'error',
      msg: msg
    })
  }
}

export default errorHandler
