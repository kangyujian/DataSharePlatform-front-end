<template>
<div id="bigdata">
    <v-container grid-list-xl fluid>
        <v-tabs>
            <v-tab>
                <v-icon left>fas fa-file-alt</v-icon>
                【链上数据】资产状态管理
            </v-tab>
            <v-tab>
                <v-icon left>fas fa-dollar-sign</v-icon>
                【链上数据】资产定价管理
            </v-tab>
            <v-tab>
                <v-icon left>fas fa-id-badge</v-icon>
                【链上数据】资产交易管理
            </v-tab>
            <v-tab-item>
                <table class="el-table el-table--fit el-table--border table-detail">

                    <thead>
                    <th>
                        数据编号
                    </th>
                    <th>
                        数据拥有单位
                    </th>
                    <th>
                        数据上链时间
                    </th>
                    <th>
                        数据资产的主题
                    </th>
                    <th>
                        数据资产的大小
                    </th>
                    <th>
                        区块版本号
                    </th>
                    <th>
                        数据记录在区块中的编号
                    </th>
                    <th>
                        数据上链
                    </th>
                    </thead>
                    <tbody>
                    <tr v-for="item in  netcons" :key="item.id">
                        <td v-text="item.id"></td>
                        <td v-text="item.owner"></td>
                        <td v-text="item.datastarttime"></td>
                        <td v-text="item.datatheme"></td>
                        <td v-text="item.datasize"></td>
                        <td v-text="item.blockversion"></td>
                        <td v-text="item.datainbloackid"></td>
                        <!--                            <td v-text="item.isonline"></td>-->
                        <td>
                            <el-switch
                                    v-model="item.isonline"
                                    on-color="#00A854"
                                    on-text="启动"
                                    on-value="1"
                                    off-color="#F04134"
                                    off-text="禁止"
                                    off-value="0"

                            >
                            </el-switch>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </v-tab-item>
            <v-tab-item>
                <table class="el-table el-table--fit el-table--border table-detail">
                    <thead>
                    <th>
                        数据编号
                    </th>
                    <th>
                        数据检查单位
                    </th>
                    <th>
                        数据定价的时间
                    </th>
                    <th>
                        数据资产的大小
                    </th>
                    <th>
                        数据资产的价值
                    </th>
                    <th>
                        数据上链
                    </th>
                    </thead>
                    <tbody>
                    <tr v-for="item in etaxes" :key="item.id">
                        <td v-text="item.id"></td>
                        <td v-text="item.datacheacker"></td>
                        <td v-text="item.datapricedecidetime.slice(0,10)"></td>
                        <td v-text="item.datasize"></td>
                        <td v-text="item.datavalue"></td>
                        <!--                            <td v-text="item.isonline"></td>-->
                        <td>
                            <el-switch
                                    v-model="item.isonline"
                                    on-color="#00A854"
                                    on-text="启动"
                                    on-value="1"
                                    off-color="#F04134"
                                    off-text="禁止"
                                    off-value="0"
                                    @change="changeSwitch(item.isonline,item.id)"
                            >
                            </el-switch>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </v-tab-item>
            <v-tab-item>
                <table class="el-table el-table--fit el-table--border table-detail">
                    <thead>
                    <th>
                        数据编号
                    </th>
                    <th>
                        数据拥有单位
                    </th>
                    <th>
                        数据使用单位
                    </th>
                    <th>
                        数据交易的时间
                    </th>
                    <th>
                        数据资产的主题
                    </th>
                    <th>
                        数据资产的价值
                    </th>
                    <th>
                        数据资产的大小
                    </th>
                    <th>
                        数据上链
                    </th>
                    </thead>
                    <tbody>
                    <tr v-for="item in ebooks" :key="item.id">
                        <td v-text="item.id"></td>
                        <td v-text="item.owner"></td>
                        <td v-text="item.users"></td>
                        <td v-text="item.tradetime"></td>
                        <td v-text="item.datatheme"></td>
                        <td v-text="item.datavalue"></td>
                        <td v-text="item.datasize"></td>
                        <!--                            <td v-text="item.isonline"></td>-->
                        <td>
                            <el-switch
                                    v-model="item.isonline"
                                    on-color="#00A854"
                                    on-text="启动"
                                    on-value="1"
                                    off-color="#F04134"
                                    off-text="禁止"
                                    off-value="0"
                            >
                            </el-switch>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </v-tab-item>
        </v-tabs>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            showdialog: false,
            netconsearch: '',
            etaxsearch: '',
            ebooksearch: '',
            hdnetcon: [{
                    text: '数据编号',
                    align: 'left',
                    sortable: false,
                    value: 'netconid',
                },
                {
                    text: '数据拥有单位',
                    align: 'center',
                    value: 'applya'
                },
                {
                    text: '数据上链的时间',
                    align: 'center',
                    value: 'applyb'
                },
                {
                    text: '数据资产的主题',
                    align: 'center',
                    value: 'addr'
                },
                {
                    text: '数据资产的大小',
                    align: 'center',
                    value: 'area'
                },
                {
                    text: '区块版本号',
                    align: 'center',
                    value: 'balance'
                },
            ],
            hdetax: [{
                    text: '数据编号',
                    align: 'left',
                    sortable: false,
                    value: 'taxid',
                },
                {
                    text: '数据检查单位',
                    align: 'center',
                    value: 'taxer'
                },
                {
                    text: '数据定价的时间',
                    align: 'center',
                    value: 'area'
                },
                {
                    text: '数据资产的大小',
                    align: 'center',
                    value: 'tax'
                },
            ],
            hdebook: [{
                    text: '数据编号',
                    align: 'left',
                    sortable: false,
                    value: 'bookid',
                },
                {
                    text: '数据拥有单位',
                    align: 'center',
                    value: 'owner'
                },
                {
                    text: '数据使用单位',
                    align: 'center',
                    value: 'addr'
                },
                {
                    text: '数据交易的时间',
                    align: 'center',
                    value: 'area'
                },
            ],
            netcons: [],
            etaxes: [],
            ebooks: [],
        };
    },
    mounted() {
        this.refreshNetconList()
        this.refreshEtaxList()
        this.refreshEbookList()
    },
    methods: {
        refreshNetconList() {
            this.$axios
                .get("/api/assetStatus/findAll", {
                    params: {},
                })
                .then(res => {
                    if(res.data.length===0){
                        this.netcons=[]
                    }else {
                        this.netcons=res.data;
                        window.console.log(res.data);
                    }
                })

        },
        refreshEtaxList() {
            this.$axios
                .get("api/assetPricing/findAll", {
                    params: {},
                })
                .then(res => {
                    if(res.data.length===0){
                        this.etaxes=[];
                    }else{

                        // window.console.log(res.data);
                        //get data
                        // let ans=[];
                        // for (let i=0;i<res.data.length;i++){
                        //     let tmp=[];
                        //     let item=res.data[i];
                        //     tmp.push(item["id"]);
                        //     tmp.push(item['datacheacker']);
                        //     tmp.push(item['datapricedecidetime']);
                        //     tmp.push(item['datasize']);
                        //     tmp.push(item['datavalue']);
                        //     tmp.push(item['isonline']);
                        //     ans.push(tmp);
                        //
                        // }
                        // this.items=ans;
                        // window.console.log(ans);
                        this.etaxes=res.data;

                    }

                })
        },
        refreshEbookList() {
            this.$axios
                .get("/api/assetTrading/findAll", {
                    params: {},
                })
                .then(res => {
                    if(res.data.length===0){
                        this.ebooks=[]
                    }else {
                        this.ebooks=res.data;
                        window.console.log(res.data);
                    }
                })

        },
    }
};
</script>
