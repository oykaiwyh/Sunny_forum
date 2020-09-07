import faces from '@/assets/js/face'


const escapeHtml = (val = '') => {
  if (!val) return ''

  let result = val
  //替换表情
  //   let face = /\sface\[\W{1,}]/g
  let face = /face\[\W{1,}]/g //去掉了对空格的匹配，对应index里的自定义face也要取消空格
  if (face.test(result)) {
    let group = result.match(face)
    console.log('group', group);
    group.map(item => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }

  //图片的替换
  const img = /img\[\S+\]/g
  if (img.test(result)) {
    let group = result.match(img)

    group.map(item => {
      // 重要事项：ECMAscript 没有对该方法进行标准化，因此反对使用它 substr。
      //   result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
      result = result.replace(item, `<img src="${item.slice(4, item.length - 1)}">`)
    })
  }
  //链接替换 a(链接)[标题]
  const link = /\sa\(\S+\]/g
  if (link.test(result)) {
    const group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    group.map((item) => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }

  // 引用替换
  result = result.replace(/\[quote\]/g, '<div class="layui-elem-quote">')
  result = result.replace(/\[\/quote\]/g, '</div>')

  // 代码块替换
  const code = /(\[\/?pre(.+?)[^\]]*\])|\[[^\]]*\]/g
  if (code.test(result)) {
    const group = result.match(code)
    group.map((item) => {
      result = result.replace(item, htmlEncode(item))
    })
    result = result.replace(/\[pre\]/g, '<pre>')
    result = result.replace(/\[\/pre\]/g, '</pre>')
  }

  // hr替换
  result = result.replace(/\[hr\]/g, '<hr>')

  // 回车换行的替换
  result = result.replace(/\r\n/g, '<br>')
  result = result.replace(/\n/g, '<br>')

  return result

}

export {
  escapeHtml
}
