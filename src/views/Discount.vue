<template>
    <div id="main">
        <div class="title">
            <h2>{{data.name}}</h2>
            <img src="../assets/imgs/star24_on@2x.png">
            <img src="../assets/imgs/star24_on@2x.png">
            <img src="../assets/imgs/star24_on@2x.png">
            <img src="../assets/imgs/star24_on@2x.png">
            <img src="../assets/imgs/star24_off@2x.png">
        </div>
        <div class="discount">
            <h3>优惠信息</h3>
            <div class="list">
                <p v-show="item.type != -1" v-for="item in list" :key="item.name">
                    <img src="../assets/imgs/discount_1@2x.png" style="width:12px;" v-show="item.type == 1">
                    <img src="../assets/imgs/special_1@2x.png" style="width:12px;" v-show="item.type == 2">
                    {{ item.name }}
                </p>
            </div>
        </div>
        <div class="notice">
            <h3>商家公告</h3>
            <p>{{data.bulletin}}</p>
        </div>
        <div class="btn">
            <img src="../assets/imgs/close.svg" style="width:20px;">
        </div>
    </div>
</template>

<script>
import {getseller,getgoods} from '../api/apis.js'
    export default {
        data(){
            return {
                data:[],
                list:[],
            }
        },
        created(){
            getseller().then((obj)=>{
                console.log(obj.data.data)
                this.data = obj.data.data
            }),
            getgoods().then((res)=>{
                console.log(res.data.data)
                this.list = res.data.data
            })
        },
        methods:{
        }
    }
</script>

<style lang="less" scoped>
    #main{
        .title{
            text-align: center;
            margin-top: 30px;
            margin-bottom: 60px;
            h2{
                margin-bottom: 20px;
            }
            img{
                margin: 0 20px;
            }
        }
        .discount{
            border-top: 1px solid #000;
            margin: 0 60px;
            padding-top: 40px;
            margin-bottom: 20px;
            display: flex;
            flex-flow: column;
            align-items: center;
            h3{
                // width: 100px;
                font-size: 20px;
                text-align: center;
                background: #fff;
            }
            .list{
                display: flex;
                
                p{
                    margin-left: 20px;
                    line-height: 30px;
                }
            }
        }
        .notice{
            border-top: 1px solid #000;
            margin: 0 60px;
            padding-top: 40px;
            display: flex;
            flex-flow: column;
            align-items: center;
            h3{
                width: 300px;
                font-size: 20px;
                text-align: center;
                background: #fff;
            }
            p{
                padding: 20px;
            }
        }
        .btn{
            text-align: center;
        }
    }
</style>