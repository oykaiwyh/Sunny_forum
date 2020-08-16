import axios from 'axios'
const getCode = async () => {
  let result = ''
  try {
    result = await axios.get('/getCaptcha')
    if (result.status) {
      return result.data
    }
  } catch (error) {
    console.log('getCaptcha error', error);
  }
  return result
}
const reset = async (options) => {
  console.log(options);

  let result = ''
  try {
    result = await axios.post('/reset', {
      ...options
    })
    if (result.status) {
      return result.data
    }
  } catch (error) {
    console.log('reset error', error);
  }
  return result
}
export {
  getCode,
  reset
}
