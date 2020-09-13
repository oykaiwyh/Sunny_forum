import axios from '@/util/axios/axiosrequest'
import qs from 'qs'
import store from '@/store'

// 获取文章中的评论列表
const getComents = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/comments?' + qs.stringify(params), headers)
}

// 发表评论
const addComment = (data) => axios.post('/comments/reply', {
  ...data
})

// 更新评论
const updateComment = (data) => axios.post('/comments/update', {
  ...data
})

// 采纳最佳评论
const setCommentBest = (data) => axios.get('/comments/accept?' + qs.stringify(data))

// 点赞
const setHands = (data) => axios.get('/comments/hands?' + qs.stringify(data))


export {
  getComents,
  addComment,
  updateComment,
  setCommentBest,
  setHands
}
