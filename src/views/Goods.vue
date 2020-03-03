<template>
    <div class="goods">
        <div id="left">
            <ul class="content">
                <p @click="btn(i)" :class="{titleLeft: true, active : i == curSelected}" v-for="(v,i) in goodslist" :key="i">
                    <img src="../assets/imgs/discount_1@2x.png" style="width:12px;" v-show="v.type == 1">
                    <img src="../assets/imgs/special_1@2x.png" style="width:12px;" v-show="v.type == 2">
                    {{ v.name }}
                </p>
            </ul>
        </div>
        <div id="right">
            <ul class="content">
                <div :id="i" class="msgRight" v-for="(obj,i) in goodslist" :key="i">
                    <p class="title">{{ obj.name }}</p>
                    <div class="contant" v-for="(v,i) in obj.foods" :key="i">
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
                                    <button class="a" type="button" v-show="v.num > 0" @click="btnadd(v.name,-1)">-</button>
                                    <p v-show="v.num > 0">{{v.num}}</p>
                                    <button class="b" type="button" @click="btnadd(v.name,1)">+</button>
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
                curSelected:0, // 当前索引
            }
        },
        created(){
            getgoods().then((res)=>{
                this.$store.commit('changelist',res.data.data)
            })
        },
        mounted(){
            // 在mounted中拿DOM节点
            // 左侧滚动板
            new Bscroll(document.getElementById('left'),{
                click:true,
            })

            // 右侧滚动板
            this.right = new Bscroll(document.getElementById('right'),{
                probeType:3,
            })
            
            //滚动获取高度事件  .contant 是右边内容容器 高度100px
            this.right.on('scroll', coor => {
                var y = Math.abs(coor.y)
                // console.log(y)
                this.getheight.forEach(obj=>{
                    // console.log(obj)
                    if(y>=obj.min && y<obj.max){
                        this.curSelected = obj.i
                        return
                    }
                })
            })
        },
        computed:{
            getheight(){
                let arr = []
                var total = 0
                this.$store.state.goodslist.forEach((obj,i)=>{
                    var divheight = document.getElementById(i).offsetHeight
                    arr.push({min:total ,max:total+=divheight ,i})
                })
                return arr
            },
            // 原数据
            goodslist(){
                return this.$store.state.goodslist
            },
        },
        methods:{
            // 添加
            btnadd(name,num){
                return this.$store.commit('add',{name,num})
            },
            btn(i){
                this.curSelected = i
                this.right.scrollToElement(document.getElementById(i) ,600)
            },
        },
    }
</script>

<style lang="less" scoped>
    .goods{
        flex: 1 1 auto;
        overflow: auto;
        height: 70vh;
        display: flex;
        #left{
            width: 90px;
            height: 90%;
            background: #F4F5F7;
            overflow-y:auto;
            .titleLeft{
                display: flex;
                align-items: center;
                padding-left: 10px;
                width: 90px;
                height: 50px;
                border: 1px solid #fff;
            }
            .active{
                background: #fff;
            }
        }
        #right{
            flex: 1;
            height: 100%;
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
                    height: 100px;
                    .msgimg{
                        margin-left: 10px;
                    }
                    .msg_1{
                        flex: 1;
                        // height: 100px;
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