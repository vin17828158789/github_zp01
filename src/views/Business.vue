<template>
    <div id="main">
        <div class="top">
            <div class='title'>
                <h2>{{data.name}}</h2>
                <div>
                    <p class="xing">
                        <img src="../assets/imgs/star24_on@2x.png">
                        <img src="../assets/imgs/star24_on@2x.png">
                        <img src="../assets/imgs/star24_on@2x.png">
                        <img src="../assets/imgs/star24_on@2x.png">
                        <img src="../assets/imgs/star24_off@2x.png">
                        <span>({{data.ratingCount}}) 月售{{data.sellCount}}单</span>
                    </p>
                    <p class="scang"><img src="../assets/imgs/favorite.svg"> 已收藏</p>
                </div>
            </div>
            <div class="msg">
                <div class="left">
                    <p>起步价</p>
                    <p><span>{{data.minPrice}}</span>元</p>
                </div>
                <div class="mid">
                    <p>商家配送</p>
                    <p><span>{{data.deliveryPrice}}</span>元</p>
                </div>
                <div class="right">
                    <p>平均配送时间</p>
                    <p><span>{{data.deliveryTime}}分钟</span></p>
                </div>
            </div>
        </div>
        <div class="mid">
            <div class="notice">
                <h2>公告与活动</h2>
                <p class="notice">{{data.bulletin}}</p>
                <!-- <p><img src="../assets/imgs/discount_1@2x.png"> 在线支付满28减5，满50减10</p>
                <p><img src="../assets/imgs/discount_1@2x.png"> 担任精彩赛</p>
                <p><img src="../assets/imgs/discount_1@2x.png"> 清肺雪梨汤8折抢购</p>
                <p><img src="../assets/imgs/discount_1@2x.png"> 特价饮品八折抢购</p>
                <p><img src="../assets/imgs/discount_1@2x.png"> 单人特色套餐</p>
                <p><img src="../assets/imgs/discount_1@2x.png"> 该商家支持开发票，请在下单时填写好发票抬头</p>
                <p><img src="../assets/imgs/discount_1@2x.png"> 已加入‘外卖保’计划，食品安全保障</p> -->
                <p v-show="item.type != -1" v-for="item in list" :key="item.name">
                    <img src="../assets/imgs/discount_1@2x.png" style="width:12px;" v-show="item.type == 1">
                    <img src="../assets/imgs/special_1@2x.png" style="width:12px;" v-show="item.type == 2">
                    {{ item.name }}
                </p>
            </div>
        </div>
        <div class="bottom">
            <div class="top">
                <h2>商家实景</h2>
                <div class="img">实景内容</div>
            </div>
            <div class="bottom">
                <h2>商家信息</h2>
                <div v-for="item in data.infos" :key="item.id">
                    <p>{{ item }}</p>
                </div>
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
                list:[]
            }
        },
        created(){
            getseller().then((obj)=>{
                // console.log(obj.data.data)
                this.data = obj.data.data
            }),
            getgoods().then((res)=>{
                console.log(res.data.data)
                this.list = res.data.data
            })
        }
    }
</script>

<style lang="less" scoped>
    #main{
        height: 70vh;
        background: #F4F5F7;
        overflow-y:auto;
        .top{
            background: #fff;
            margin-bottom: 20px;
            .title{
                h2{
                    margin-top: 20px;
                    margin-left: 20px;
                }
                div{
                    display: flex;
                    justify-content: space-between;
                   .xing{
                        padding-top: 10px;
                        padding-left: 20px;
                        span{
                            margin-left: 10px;
                        }
                    } 
                    .scang{
                        margin-right: 20px;
                        img{
                            width: 20px;
                            vertical-align: middle;
                        }
                    }
                }
                
            }
            .msg{
                display: flex;
                justify-content: space-around;
                padding: 20px;
                margin: 20px;
                border-top: 1px solid #EAEBED;
                div{
                    width: 100px;
                    p{
                        span{
                            font-size: 28px
                        }
                    }
                }
                div:not(:last-child){
                    border-right: 1px solid #EAEBED;
                }

            }
        }
        .mid{
            background: #fff;
            margin-bottom: 20px;
            .notice{
                h2{
                    margin-left: 20px;
                }
                .notice{
                    color: red;
                    margin: 30px 0;
                }
                p{
                    font-size: 20px;
                    padding: 0 30px;
                }
                p:not(.notice){
                    border-top: 1px solid #EAEBED;
                    line-height: 60px;
                    margin: 0 20px;
                }
            }
        }
        .bottom{
            background: #fff;
            margin-bottom: 100px;
            .top{
                height: 200px;
                h2{
                    margin-left: 20px;
                }
                .img{
                    font-size: 50px;
                }
            }
            .bottom{
                h2{
                    margin-left: 20px;
                }
                div{
                    margin-left: 30px;
                    padding-top: 10px;
                    p{
                        border-top: 1px solid #F4F5F7;
                        line-height: 50px;
                        font-size: 18px;
                        text-indent: 1em;
                    }
                }
            }
        }

    }
</style>