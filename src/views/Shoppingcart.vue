<template>
    <div class="cart">
        <div class="top">
            <p>点餐：<span>{{count}}</span> 份</p>
            <p @click='delAll'>清空</p>
        </div>
        <div id="contant">            
            <ul class="content">
                <div v-show="v.num > 0" v-for="v in filters" :key="v.id">
                    <div>
                        <span class="name">{{v.name}}</span>
                    </div>
                    <div>
                        <span class="price">￥{{v.price}}</span>
                        <button class="a" type="button" v-show="v.num > 0" @click="btnadd(v.name,-1)">-</button>
                        <span class="num" v-show="v.num > 0">{{v.num}}</span>
                        <button class="b" type="button" @click="btnadd(v.name,1)">+</button>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
    export default {
        computed:{
            // 原数据
            goodslist(){
                return this.$store.state.goodslist
            },
            // 过滤后的数据
            filters(){
                return this.$store.getters.getgoodscarlist
            },
            // 点餐总数量
            count(){
                var count = 0
                this.$store.getters.getgoodscarlist.forEach(obj=>{
                    count += obj.num
                })
                return count
            },
        },
        mounted(){
            new Bscroll(document.getElementById('contant'),{click:true,})
            
        },
        methods:{
            // 添加
            btnadd(name,num){
                return this.$store.commit('add',{name,num})
            },
            // 清空
            delAll(){
                alert('清除')
            }
        }
    }
</script>

<style lang="less" scoped>
    .cart{
        width: 100%;
        // height: 200px;
        position: absolute;
        bottom: 0px;
        overflow-y: auto;
        .top{
            display: flex;
            justify-content: space-between;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            background: #fff;
            color: #000;
            border-bottom: 1px solid #ccc;
        }
        #contant{
            width: 100%;
            bottom: #fff;
            background: #fff;
            .content{
                div{
                    display: flex;
                    justify-content: space-between;
                    font-size: 18px;
                    padding-top: 10px;
                    .name{margin-left: 40px;}
                    .price{margin-right: 80px;}
                    .num{}
                    button{
                        font-size: 20px;
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                    }
                    .a{
                        border: 2px solid #00A0DB;
                        color: #00A0DB;
                        background: #fff;
                    }
                    .b{
                        border: 1px solid #fff;
                        color: #fff;
                        background: #00A0DB;
                        margin-right: 40px;
                    }
                }
            }
        }
    }
</style>