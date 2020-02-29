import axios from 'axios'

var req = axios.create({
    baseURL: 'http://192.168.137.1:3000', // 默认地址
    timeout: 7000, // 超时提醒
})
// 商品
export function getgoods(){
    return req.get('/api/goods')
}
// 评论
export function getratings(){
    return req.get('/api/ratings')
}
// 商家
export function getseller(){
    return req.get('/api/seller')
}