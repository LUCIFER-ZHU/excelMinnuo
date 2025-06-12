/**
 * 将时间戳转换为格式化时间字符串
 * @param {number} timestamp - 毫秒级时间戳
 * @param {string} format - 格式化字符串 (默认 'YYYY-MM-DD HH:mm:ss')
 * @returns {string} 格式化后的时间字符串
 */
export function formatTimestamp(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
     const date = new Date(timestamp);
     const map = {
       YYYY: date.getFullYear(),
       MM: String(date.getMonth() + 1).padStart(2, '0'),
       DD: String(date.getDate()).padStart(2, '0'),
       HH: String(date.getHours()).padStart(2, '0'),
       mm: String(date.getMinutes()).padStart(2, '0'),
       ss: String(date.getSeconds()).padStart(2, '0'),
     };
   
     return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => map[match]);
}
   