<template>
    <div class="personcenter">
        <div class="personcentercont">
            <div class="userinfo">
                <el-row :gutter="20">
                    <el-form  label-width="80px" :model="userinfo">
                        <el-col :span="12">
                            <el-form-item label="用户名" size="small">
                                <el-input disabled v-model="userinfo.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="昵称" size="small">
                                <el-input disabled v-model="userinfo.nickname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="地址" size="small">
                                <el-input disabled v-model="userinfo.address"></el-input>                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-button type="primary" size="small" @click="changeInfo">修改信息</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </div>
            <div class="buyinfo">
                <el-tabs type="border-card">
                    <el-tab-pane label="购物车">
                        <el-table
                        ref="multipleTable"
                        :data="buycar"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column prop="bookname" label="书籍名称">
                                <template slot-scope="scope">
                                    {{ scope.row.bookname }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="书籍价格">
                                <template slot-scope="scope">
                                    {{ scope.row.price }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="buynum" label="书籍数量">
                                <template slot-scope="scope">
                                    {{ scope.row.buynum }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row)">购买</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">清除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="buyall">
                            <el-button
                            size="small"
                            type="primary"
                            @click="buyAll()">购买</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的收藏">
                        <el-table
                        :data="collection"
                        style="width: 100%">
                            <el-table-column prop="bookname" label="书籍名称">
                                <template slot-scope="scope">
                                    {{ scope.row.bookname }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="书籍价格">
                                <template slot-scope="scope">
                                    {{ scope.row.price }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="buynum" label="书籍数量">
                                <template slot-scope="scope">
                                    {{ scope.row.buynum }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="购买记录">
                        <el-table
                        :data="buyrecord"
                        style="width: 100%">
                            <el-table-column prop="bookname" label="书籍名称">
                                <template slot-scope="scope">
                                    {{ scope.row.bookname }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="书籍价格">
                                <template slot-scope="scope">
                                    {{ scope.row.price }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="buynum" label="书籍数量">
                                <template slot-scope="scope">
                                    {{ scope.row.buynum }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- 修改用户信息弹窗 -->
            <el-dialog
            title="上架"
            :visible.sync="dialogVisible"
            width="30%">
                <el-form :model="userinfo" :rules="rules" ref="userinfo" label-width="100px">
                    <el-form-item prop="user" label="用户名">
                        <el-input placeholder="请输入用户名" disabled v-model="userinfo.username" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="nickname" label="昵称">
                        <el-input placeholder="请输入昵称" v-model="userinfo.nickname" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pwd" label="密码">
                        <el-input type="password" placeholder="请输入密码" v-model="userinfo.pwd" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pwdagain" label="确认密码">
                        <el-input type="password" placeholder="请再次输入密码" v-model="userinfo.pwdagain" clearable>
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="changeCancel">取 消</el-button>
                    <el-button type="primary" @click="changeOk">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import getCurrentCityName from "../../assets/js/Address.js";
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userinfo.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userinfo: {
                username: '',
                nickname: '',
                pwd: '',
                address: ''
            },
            buycar: [],
            collection: [],
            buyrecord: [],
            multipleSelection: [],
            dialogVisible: false,
            rules: {
                user: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
                pwdagain: [
                    { validator: validatePass, required: true, trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        // 获取用户信息
        getUser() {
            axios({
                url: "/api/userSearch.php",
                method: "POST",
                data: Qs.stringify({
                    username: this.$store.state.currentUser
                })
            }).then(resp => {
                this.userinfo.username = resp.data[0].username;
                this.userinfo.nickname = resp.data[0].nickname;
                // this.userinfo.pwd = resp.data[0].password;
            })
        },
        // 打开修改用户信息弹窗
        changeInfo() {
            this.dialogVisible = true;
        },
        // 取消修改用户信息
        changeCancel() {
            this.dialogVisible = false;
        },
        // 确认修改用户信息
        changeOk() {
            axios({
                url: "/api/userUpdate.php",
                method: "POST",
                data: Qs.stringify({
                    username: this.$store.state.currentUser,
                    nickname: this.userinfo.nickname,
                    password: this.userinfo.pwd
                })
            }).then(resp => {
                if (resp.data == 'suc') {
                    this.$message('修改成功');
                    this.dialogVisible = false;
                }
            })
        },
        // 购买商品
        handleEdit(row) {

        },
        // 清除商品
        handleDelete(row) {

        },
        // 购买全部
        buyAll() {
            console.log(this.multipleSelection);
        },
        // 选择要购买的商品
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        },
        // 购物车
        buycarSearch() {
            axios({
                url: "/api/buycarSearch.php",
                method: "POST",
                data: Qs.stringify({
                    username: this.$store.state.currentUser,
                    buystatus: 1
                })
            }).then(resp => {
                this.buycar = resp.data;
            })
        },
        // 收藏夹
        collectionSearch() {
            axios({
                url: "/api/buycarSearch.php",
                method: "POST",
                data: Qs.stringify({
                    username: this.$store.state.currentUser,
                    buystatus: 2
                })
            }).then(resp => {
                this.collection = resp.data;
            })
        },
        // 购买记录
        buyrecordSearch() {
            axios({
                url: "/api/buycarSearch.php",
                method: "POST",
                data: Qs.stringify({
                    username: this.$store.state.currentUser,
                    buystatus: 3
                })
            }).then(resp => {
                this.buyrecord = resp.data;
            })
        },
        getCurrentCity() {
            getCurrentCityName().then((city) => {
              console.log(city);  //顺利的话能在控制台打印出当前城市
            })
        },

        addressDetail(){ //获取地理位置 
            var self = this; 
            //全局的this在方法中不能使用，需要重新定义一下
            var geolocation = new BMap.Geolocation(); 
            //调用百度地图api 中的获取当前位置接口
            geolocation.getCurrentPosition(function(r){ if(this.getStatus() == BMAP_STATUS_SUCCESS){ 
                //获取当前位置经纬度
                var myGeo = new BMap.Geocoder();
                myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){ 
                    if (result){
                    //根据当前位置经纬度解析成地址
                        // self.ADDRESS_DETAIL(result.addressComponents.district+result.addressComponents.street); //在vuex中存入区、街道地址信息。其他地方需要使用直接调用
                        self.geohash = result.point.lat+","+result.point.lng;
                        self.latitude = result.point.lat; self.longitude = result.point.lng;
                        self.userinfo.address = result.addressComponents.province+result.addressComponents.city+result.addressComponents.district+result.addressComponents.street
                    }
                });
                } 
            });
        },
        
    },
    mounted() {
        this.buycarSearch();
        this.collectionSearch();
        this.getUser();

        // 百度地图API功能
         this.addressDetail();
        // this.getCurrentCity();
    }
}
</script>

<style lang="less" scoped>
.personcenter{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .personcentercont{
        width: 1200px;
        min-width: 1200px;
        .userinfo{
            padding-top: 20px;
            padding-right: 26px;
            border: 1px solid #e0e1e4;
        }
        .buyinfo{
            margin-top: 10px;
        }
        .buyall{
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
        }
    }
}
</style>
