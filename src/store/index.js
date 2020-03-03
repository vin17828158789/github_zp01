import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store = new Vuex.Store({
    // 存放交互数据
    state: {
        goodslist:[]
    },
    // 改变存放的交互数据
    mutations: {
        // 只有函数才能改变存放的交互数据state
        // 每个mutations都会接收一个形参state指向上边的state
        changelist(state ,newlist){
            state.goodslist = newlist
        },
        add(state,that){
            let arr=[...state.goodslist]
            arr.forEach(obj=>{
                obj.foods.forEach(v=>{
                    if(v.name==that.name){
                        v.num+=that.num
                    }
                })
            })
            state.goodslist = arr
        },
    },
    getters:{
        addData(state){
            // 排除掉商品中数量为零的商品
            for(let i=0; i<state.goodslist.length; i++){
                return state.goodslist[i].foods.filter( obj=> obj.num>0 )
            }
        },
        getgoodscarlist(state){
            let list = [] // 装商品信息
            let list_name = [] // 装商品name
            state.goodslist.forEach(obj=>{
                obj.foods.forEach(v=>{
                    if(v.num>0){
                        if(!list_name.includes(v.name)){
                            list.push(v)
                            list_name.push(v.name)
                        }
                    }
                })
            })
            return list
        }
    }
})

// 暴露出去实例
export default store