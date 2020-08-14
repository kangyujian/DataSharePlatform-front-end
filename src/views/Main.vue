<template>
    <v-app id="inspire">
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
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            menus: [
                {
                    icon: "fas fa-file-alt",
                    text1: "资产状态管理",
                    text2: "资产状态",
                    route: "/AssetStatus"
                },
                {
                    icon: "fas fa-dollar-sign",
                    text1: "资产定价管理",
                    text2: "资产定价",
                    route: "/AssetTrading"
                },
                {
                    icon: "fas fa-id-badge",
                    text1: "资产交易管理",
                    text2: "资产交易",
                    route: "/AssetPricing"
                },
                {
                    icon: "fas fa-database",
                    text1: "数据服务和大数据管理",
                    text2: "链上数据管理",
                    route: "/bigdata"
                },
            ],
        }),
    }
</script>
