import axios from 'axios'

export default async function downloadFile(url, fileName) {
    let res = await axios({ url, responseType: 'blob' })
    const link = document.createElement('a')
    const URL = window.URL || window.webkitURL
    link.download = fileName
    link.style.display = 'none'
    link.href = URL.createObjectURL(res.data)
    link.click()
}
