<template>
    <div class="goods">
        <div id="left">
            <ul class="content">
                <p @click="btn(i)" :class="{titleLeft: true, active : i == curSelected}" v-for="(v,i) in data" :key="i">
                    <img src="../assets/imgs/discount_1@2x.png" style="width:12px;" v-show="v.type == 1">
                    <img src="../assets/imgs/special_1@2x.png" style="width:12px;" v-show="v.type == 2">
                    {{ v.name }}
                </p>
            </ul>
        </div>
        <div id="right">
            <ul class="content">
                <div :id="i" class="msgRight" v-for="(V,i) in data" :key="i">
                    <p class="title">{{ V.name }}</p>
                    <div class="contant" v-for="(v,i) in V.foods" :key="i">
                        <div class="msgimg">
                            <img :src="v.image" style="width:120px;">
                        </div>
                        <div class="msg_1">
                            <h3>{{ v.name }}</h3>
                            <p>{{ v.description }}</p>
                            <p>
                                <span>月售{{v.sellCount}}份</span>
                                <span>好评率{{v.rating}}%</span>
                            </p>
                            <div class="price">
                                <!-- <span>￥{{v.oldPrice}}</span> -->
                                <span class="price">￥{{v.price}}</span>
                                <div class="numadd">
                                    <button class="a" type="button" disab @click="btncount(i,-1)">-</button>
                                    <p>{{v ? v.num : 1}}</p>
                                    <button class="b" type="button" @click="btncount(i,1)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
            
        </div>
    </div>
</template>

<script>
import {getgoods} from '../api/apis.js'
import Bscroll from 'better-scroll' //引入滚动插件 固定需要把要滚动的容器装在<ul class='content'></ul>
    export default {
        data(){
            return {
                data:[],
                disab:'',
                curSelected:0, // 当前索引
            }
        },
        created(){
            getgoods().then((res)=>{
                console.log(res.data.data)
                this.data = res.data.data
            })
        },
        mounted(){
            // 在mounted中拿DOM节点
            console.log(document.querySelector('.msgRight'))
            // 左侧滚动板
            new Bscroll(document.getElementById('left'),{
                click:true,
            })

            // 右侧滚动板
            this.right = new Bscroll(document.getElementById('right'))
        },
        methods:{
            btncount(i,n){
                console.log(i,n)
            },
            btn(i){
                this.curSelected = i
                this.right.scrollToElement(document.getElementById(i) ,600)
            }
        },
    }
</script>

<style lang="less" scoped>
    .goods{
        flex: 1 1 auto;
        overflow: auto;
        // height: 70vh;
        display: flex;
        #left{
            // padding-top: 20px;
            width: 90px;
            height: 100%;
            background: #F4F5F7;
            overflow-y:auto;
            .titleLeft{
                display: flex;
                align-items: center;
                padding-left: 10px;
                width: 90px;
                height: 60px;
                border: 1px solid #fff;
            }
            .active{
                background: #fff;
            }
        }
        #right{
            flex: 1;
            background-color: #fff;
            overflow-y:auto;
            .msgRight{
                .title{
                    margin-bottom: 20px;
                    line-height: 30px;
                    padding-left: 10px;
                    background: #F4F5F7;
                    border-left: 2px solid rgba(0, 0, 0, 0.1);
                    padding: 5px 0 5px 20px;
                }
                .contant{
                    display: flex;
                    .msgimg{
                        margin-left: 10px;
                    }
                    .msg_1{
                        flex: 1;
                        height: 150px;
                        padding-left: 10px;
                        position: relative;
                        .price{
                            display: flex;
                            text-align: center;
                            line-height: 30px;
                            justify-content: space-between;
                            bottom: 0;
                            .price{
                                color: red;
                            }
                            .numadd{
                                display: flex;
                                p{
                                    width: 30px;
                                    text-align: center;
                                }
                                button{
                                    font-size: 30px;
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>