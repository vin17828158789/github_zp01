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
        <!-- <transition name="slide-fade"> -->
            <div class="cat">
                <transition name="slide-fade">
                    <div v-if="show" id="box">
                        <Shoppingcart></Shoppingcart>
                    </div>
                </transition>
            </div>
        <!-- </transition> -->
        <div class="bottom">
            <div class="left">
                <div class="left_1" @click='show = !show'>
                    <img v-show="totle != 0" src="../assets/imgs/on.png">
                    <img v-show="totle == 0" src="../assets/imgs/off.png">
                </div>
                <div class="mid">
                    <p class="totle">￥{{totle}}</p>
                    <p class="msg">另需配送费￥{{data.deliveryPrice}}元</p>
                </div>
            </div>
           
            <div v-show="totle == 0" class="right" style="background:#2B343D;">
                ￥{{data.minPrice}}起送
            </div>
            <div v-show="totle != 0" class="right" >
                立即结算
            </div>
        </div>
    </div>
</template>

<script>
import Shoppingcart from './Shoppingcart'
import {getseller,getgoods} from '../api/apis.js'
    export default {
        components: {
            Shoppingcart,
        },
        data(){
            return {
                show: false,
                data:{},
            }
        },
        created(){
            // 获取商家信息
            getseller().then( res => {
                // console.log(res.data.data)
                this.data = res.data.data;
            })
            // 获取商品数据
            getgoods().then((res)=>{
                // console.log(res.data.data)
                this.$store.commit('changelist',res.data.data)
            })
        },
        computed:{
            // 点餐总价
            totle(){
                let totles = 0
                this.$store.getters.getgoodscarlist.forEach(obj=>{
                    totles += obj.price*obj.num
                })
                return totles
            }
        },
        methods:{
            
        },
        mounted(){
            // console.log(this.price)
        }
    }
</script>

<style lang="less" scoped>
    #main{
        display: flex;
        flex-flow: column;
        // align-items: stretch;
        height: 100%;
        position: relative;
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
            height: 60px;
            background: #141c27;
            line-height: 10vh;
            display: flex;
            color: #fff;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            z-index: 2;
            .left{
                display: flex;
                .left_1{
                    width: 80px;
                    height: 80px;
                    background: #141c27;
                    border-radius: 50%;
                    border: 4px solid #515151;
                    margin-left: 20px;
                    margin-top: -15px;
                    z-index: 1;
                    display: flex;
                    text-align: center;
                    img{
                        position: relative; 
                        margin:0 auto;
                        align-items: center;
                        width: 50px;
                    }
                }
                .mid{
                    display: flex;
                    .totle{
                        width: 80px;
                        font-size: 24px;
                        margin-left: 10px;
                        margin-right: 20px;
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
                background: #f64;
                font-size: 24px;
                text-align: center;
            }
        }
        .cat{
            width: 100%;
            position: fixed;
            z-index: 1;
            bottom: 60px;
            position: relative;
            #box{
                height: 100%;
                width: 100%;
                position: fixed;
                bottom: 60px;
                background: rgba(0, 0, 0, 0.2);
            }
        }
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
    transition: all .8s ease;
    }
    .slide-fade-leave-active {
    transition: all .8s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(100px);
    opacity: 0;
    }
</style>