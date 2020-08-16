<template>
  <!--    first-->

  <v-app id="inspire" v-if="!isLoginSucess">
    <!--        <v-navigation-drawer v-model="drawer" app>-->
    <!--            <v-layout row wrap>-->
    <!--                <v-flex align-center justify-center layout text-xs-center>-->
    <!--                    <img src="@/assets/keyan.png" width="100px" height="100px">-->
    <!--                </v-flex>-->
    <!--            </v-layout>-->
    <!--            <v-divider />-->
    <!--            <v-list dense>-->
    <!--                <v-list-item v-for="link in menus" :key="link.text2" :to="link.route" link>-->
    <!--                    <v-list-item-action>-->
    <!--                        <v-icon large color="blue darken-2">{{link.icon}}</v-icon>-->
    <!--                    </v-list-item-action>-->
    <!--                    <v-list-item-content>-->
    <!--                        <v-list-item-title>-->
    <!--                            <h4 class="font-weight-light">{{link.text1}}</h4>-->
    <!--                            <h3>{{link.text2}}</h3>-->
    <!--                        </v-list-item-title>-->
    <!--                    </v-list-item-content>-->
    <!--                </v-list-item>-->
    <!--            </v-list>-->
    <!--        </v-navigation-drawer>-->

    <v-app-bar app color="indigo" dark>
      <!--            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-toolbar-title>基于区块链和国密算法的科研数据共享平台</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid v-if="!isRegister">
        <!--                <router-view />-->
        <div id="building">
          <!--flex弹性盒子模型，justify-content：主抽 -->
          <div style="display: flex;justify-content: center;margin-top: 150px">
            <el-card style="width: 400px">
              <div slot="header" class="clearfix">
                <span>登录</span>
              </div>
              <table>
                <tr>
                  <td>用户名</td>
                  <td>
                    <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>密码</td>
                  <td>
                    <el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
                    <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
                  </td>
                </tr>
                <tr>
                  <!-- 占两行-->
                  <td colspan="2">
                    <!-- 点击事件的两种不同的写法v-on:click和 @click-->
                    <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
                    <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>

                  </td>

                </tr>
                <tr>
                  <td style="font-size: 10px;" >
                    <p   @click="goRegister" style="color: blue;">还没有注册？点击注册</p>
                  </td>
                </tr>
              </table>
            </el-card>
          </div>
        </div>
      </v-container>

      <div v-else>
        <Register >
        </Register>
        <el-button @click="goBack" >返回</el-button>
      </div>



    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 1689242311@qq.com 2020</span>
    </v-footer>
  </v-app>



  <!--    Third-->

  <v-app id="inspire" v-else>
    <v-navigation-drawer v-model="drawer" app>
      <v-layout row wrap>
        <v-flex align-center justify-center layout text-xs-center>
          <img src="@/assets/keyan.png" width="100px" height="100px">
        </v-flex>
      </v-layout>
      <v-divider />
      <v-list dense>
        <v-list-item v-for="link in menus" :key="link.text2" :to="link.route" link>
          <v-list-item-action>
            <v-icon large color="blue darken-2">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <h4 class="font-weight-light">{{link.text1}}</h4>
              <h3>{{link.text2}}</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>基于区块链和国密算法的科研数据共享平台</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 1689242311@qq.com 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Register from './views/Register'
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    isLoginSucess:false,
    isRegister:false,
    user:{
      username:'',
      password:'',
      //为了登录方便，可以直接在这里写好用户名和密码的值
    },
    menus: [
      {
        icon: "fas fa-file-alt",
        text1: "资产状态管理",
        text2: "资产状态",
        route: "/AssetStatus"
      },
      {
        icon: "fas fa-id-badge",
        text1: "资产交易管理",
        text2: "资产交易",
        route: "/AssetTrading"
      },
      {
        icon: "fas fa-dollar-sign",
        text1: "资产定价管理",
        text2: "资产定价",
        route: "/AssetPricing"
      },
      {
        icon: "fas fa-database",
        text1: "数据服务和大数据管理",
        text2: "链上数据管理",
        route: "/bigdata"
      },
    ]
  }),
  methods:{
    doLogin(){//一点击登录按钮，这个方法就会执行
      this.$axios
          .get("api/login/isloginSucess", {
            params: {
              userName:this.user.username,
              passWord:this.user.password
            },
          })
          .then(res => {
            window.console.log(res);
            if(res.data){
              alert('登录成功!');
              window.location.href="http://localhost:8080/#/AssetStatus";
              this.isLoginSucess=true;
            }else{
              alert('账号或者密码不正确!');
            }
          })
    },
    goRegister(){
      this.isRegister=true;
    },
    goBack(){
      this.isRegister=false;
    }
  },
  components:{Register}
}
</script>