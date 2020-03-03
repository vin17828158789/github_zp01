<template>
    <div id="main">
        <div class="top">
            <div class="left">
                <p class="count">{{((user.score+user.serviceScore+user.rankRate)/data.length).toFixed(2)}}</p>
                <p class="title">综合评分</p>
                <p class="msg">高于周边商家69.2%</p>
            </div>
            <div class="right">
                <p>服务态度 
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_off@2x.png">
                    {{user.score}}
                </p>
                <p>服务态度 
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_on@2x.png">
                    <img src="../assets/imgs/star24_off@2x.png">    
                    {{user.serviceScore}}
                </p>
                <p>送达时间 <span>{{user.deliveryTime}}</span>分钟</p>
            </div>
        </div>
        <div class="bottom">
                <ul style="display:flex; text-align: center; list-style: none;">
                    <li class='bgblue' >全部({{data.length}})</li>
                    <li class='grebg' >满意({{shownot}})</li>
                    <li class='redbg' >不满意({{showok}})</li>
                </ul>
                <p class="sub"><input :type="checkbox" id="sub"><span>只看有内容的评价</span></p>
                <div class="contant" v-for="item in data" :key="item.id">
                    <div class="msg">
                        <p class="img"><img :src="item.avatar" style="width:20px;"></p>
                        <div class="msg_1">
                            <p>{{ item.username}}</p>
                            <p>
                                <img src="../assets/imgs/star24_on@2x.png">
                                <img src="../assets/imgs/star24_on@2x.png">
                                <img src="../assets/imgs/star24_on@2x.png">
                                <img src="../assets/imgs/star24_on@2x.png">
                                <img src="../assets/imgs/star24_off@2x.png">
                                <span>{{item.deliveryTime}}分钟送达</span>
                            </p>
                            <p>{{item.text}}</p>
                            <p class="recommend">
                                <span v-for="(v,i) in item.recommend" :key="i">
                                    {{ v }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import {getratings,getseller} from '../api/apis.js'
    export default {
        data(){
            return {
                data:{},
                user:{},
                checkbox:'checkbox',
            }
        },
        created(){
            getratings().then((obj)=>{
                // console.log(obj.data.data)
                this.data = obj.data.data
            })
            getseller().then((obj)=>{
                this.user = obj.data.data
            })
        },
        methods:{
            
        },
        computed:{
            shownot(){
                return this.data.filter(obj=>obj.rateType == 0).length
            },
            showok(){
                return this.data.filter(obj=>obj.rateType == 1).length
            },
        }
    }
</script>

<style lang="less" scoped>
    #main{
        display: flex;
        flex-flow: column;
        align-items: stretch;
        height: 100%;
        background: #F4F5F7;
        overflow-y:auto;
        .bgblue{background: #00A0DC;}
        .grebg{background: #CCECF7;}
        .redbg{background: #EAEBED;}
        .top{
            background: #fff;
            display: flex;
            border-bottom: 1px solid #E9E9E9;
            .left{
                text-align: center;
                // width: 200px;
                flex: 0.4;
                margin: 20px 0;
                border-right: 1px solid #E9E9E9;
                .count{
                    font-size: 35px;
                    color: #FB9602;
                }
                .title{
                    font-size: 20px;
                    font-weight: bold;
                    color: #1C242C; 
                }
                .msg{
                    color: #A7AAAE;
                }
            }
            .right{
                flex: 0.6;
                font-size: 20px;
                font-weight: bold;
                color: #1C242C; 
                padding-left: 50px;
                padding-top: 10px;
                p{
                    margin: 10px 0;
                    img{
                        margin-right: 10px;
                    }
                    img:first-child{
                        margin-left: 10px;
                    }
                }
                p:last-child{
                    span{
                        color: #A7AAAE;
                    }
                }
            }
        }
        .bottom{
            flex: 1 1 auto;
            overflow: auto;
            height: 100%;
            margin-top: 30px;
            background: #fff;
            border-top: 1px solid #EAEBED;
            ul{
                li{
                    width: 100px;
                    height: 50px;
                    line-height: 50px;
                    margin-left: 20px;
                    margin-top: 20px;
                }
            }
            .sub{
                height: 50px;
                margin-top: 20px;
                border-top: 1px solid #E9E9E9;
                border-bottom: 1px solid #E9E9E9;
                input{
                    margin-top: 10px;
                    width: 20px;
                    height: 20px;
                    margin-right: 20px;
                    margin-left: 20px;
                }
                span{}
            }
            .contant{
                margin-left: 20px;
                .msg{
                    margin-top: 20px;
                    display: flex;
                    .msg_1{
                        flex: 1;
                        margin-left: 20px;
                        .recommend{
                            // border: 1px solid #000;
                        }
                    }
                }
            }
        }
    }
</style>