<template>
    <div id="main">
        <div class="top">
            <div class="t-top" :style="{background:'url('+data.avatar+') no-repeat 100% 100% '}">
                <div class="Headimg">
                    <img :src="data.avatar" style="width:60px;">
                </div>
                <div class="msg">
                    <p><img src="../assets/imgs/brand@2x.png">{{data.name}}</p>
                    <p>{{data.description}}/{{data.deliveryTime}}分钟送达</p>
                    <p><img src="../assets/imgs/decrease_1@2x.png">{{data.supports ? data.supports[0].description : ''}},满50减10</p>
                    <!-- {{data.supports ? data.supports[0].description : ''}} -->
                </div>
                <div class="count">
                    <p>{{data.ratingCount}}个></p>
                </div>
            </div>
            <div class="t-bottom">
                <p><img src="../assets/imgs/bulletin@2x.png">{{data.bulletin}}</p>
            </div>
        </div>
        <div class="header">
            <router-link to='/goods' exact>商品</router-link>
            <router-link to='/evaluate' exact>评价</router-link>
            <router-link to='/business' exact>商家</router-link>
        </div>
        <router-view/>
        <div class="bottom">
            <div class="left">
                <div class="left_1" @click='btn'>
                    <img src="../assets/imgs/shopping_cart.svg" style="width:50px;">
                </div>
                <div class="mid">
                    <p class="totle">{{totle}}</p>
                    <p class="msg">另需配送费￥{{data.deliveryPrice}}元</p>
                </div>
            </div>
           
            <div class="right">
                ￥{{data.minPrice}}起送
            </div>
        </div>
    </div>
</template>

<script>
import {getseller,getgoods} from '../api/apis.js'
    export default {
        data(){
            return {
                data:{},
                price:[],
                totle:0,
            }
        },
        created(){
            getseller().then( res => {
                // console.log(res.data.data)
                this.data = res.data.data;
            })
            getgoods().then((res)=>{
                // console.log(res.data.data)
                this.price = res.data.data
            })
        },
        methods:{
            btn(item){
                console.log(item)
            },
            add(){
                return this.price.forEach((value)=>{
                    this.totle += value.foods.price;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    #main{
        display: flex;
        flex-flow: column;
        align-items: stretch;
        height: 100%;
        .top{
            color: #FDFEFF;
            background: rgba(0, 0, 0, 0.2);
            flex: 0 1 auto;
            .t-top{
                display: flex;
                position: relative;
                .Headimg{
                    margin:30px 20px 20px 20px;
                }
                .msg{
                    p:first-child{
                        color: white;
                        font-size: 16px;
                        margin-top: 30px;
                        font-weight: bold;
                        text-align: center;
                        img{
                            width: 30px;
                            margin-right: 5px;
                            vertical-align: middle;
                        }
                    }
                    p:last-child{
                        font-size: 12px;
                        img{
                            width: 14px;
                            margin-right: 5px;
                            vertical-align: middle;
                        }
                    }
                }
                .count{
                    position: absolute;
                    right: 0;
                    bottom: 25px;
                    p{
                        width: 50px;
                        font-size: 12px;
                        text-align: center;
                        background: rgba(0, 0, 0, 0.2);
                        padding: 3px;
                        border-radius: 20px;
                        margin-right: 10px;
                    }
                }
            }
            .t-bottom{
                p{
                    background: rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    line-height: 40px;
                    img{
                        height: 14px;
                        margin-right: 5px;
                        margin-left: 20px;
                    }
                }
            }
        }
        .header{
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            border: 1px solid #E7E7E7;
            a{
                color: #4A535A;
            }
            .router-link-active{
                color: #EF2A2D; 
            }
        }
        .bottom{
            width: 100%;
            height: 10vh;
            background: #141c27;
            line-height: 10vh;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            .left{
                display: flex;
                .left_1{
                    width: 80px;
                    height: 80px;
                    background: #2B343D;
                    border-radius: 50%;
                    border: 4px solid #141c27;
                    margin-left: 20px;
                    margin-top: -15px;
                    z-index: 1;
                    text-align: center;
                    img{
                        vertical-align: middle;
                    }
                }
                .mid{
                    display: flex;
                    .totle{
                        color: #939498;
                        font-size: 24px;
                        margin-right: 10px;
                    }
                    .msg{
                        padding-left: 10px;
                        font-size: 18px;
                        margin-right: 10px;
                        border-left: 3px solid #2B343D;
                    }
                }
            }
            .right{
                width: 200px;
                background: #2B343D;
                color: #939498;
                font-size: 24px;
                text-align: center;
            }
        }
    }
</style>