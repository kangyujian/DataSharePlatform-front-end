<template>
<div id="netcon">
    <v-container grid-list-xl fluid>
        <v-card class="mx-auto" max-width="100%">
            <v-card>
                <v-card-title class="grey lighten-4">资产状态管理
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" label="按内容查询" single-line hide-details></v-text-field>
                    <v-btn icon @click="refreshNetconList">
                        <v-icon>fas fa-sync-alt</v-icon>
                    </v-btn>
                    <v-btn icon @click="onCreate">
                        <v-icon>fas fa-plus</v-icon>
                    </v-btn>
                </v-card-title>
<!--                <v-data-table :headers="headers" :items="items" class="elevation-1" :search="search">-->
<!--                    <template v-slot:item.NetconID="{ item }">-->
<!--                        <v-chip :color="getColorByCC(item.IsCCed)">{{ item.NetconID }}</v-chip>-->
<!--                    </template>-->
<!--                    <template v-slot:item.action="{ item }">-->
<!--                        <v-btn color="success" :disabled="!getDisToCC(item.IsCCed)" @click="onToCC(item.ID,item.NetconID,item.ApplyA,item.ApplyB,item.Addr,item.Area,item.Balance)">上链</v-btn>-->
<!--                        <v-btn color="info" :disabled="getDisToCC(item.IsCCed)" @click="queryCC(item.NetconID)">查链</v-btn>-->
<!--                    </template>-->
<!--                </v-data-table>-->

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
                    <tr v-for="item in items" :key="item.id">
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

            </v-card>
        </v-card>
        <v-dialog v-model="showdialog" width="800">
            <v-card fill-height>
                <v-card-title class="title grey lighten-2" primary-title>{{getDialogTitle(dialogtype)}}</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="netcon.id" :hidden="true" />
                            <v-text-field v-model="netcon.netconid" label="数据编号" placeholder="" :rules="[rules.required]" :autofocus=true :readonly="getReadonly()" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="netcon.applya" label="数据拥有单位" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="netcon.applyb" label="数据上链时间" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="netcon.addr" label="数据资产主题" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="netcon.area" label="数据资产大小" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="netcon.balance" label="区块版本号" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions justify-right>
                    <v-btn color="primary" rounded @click="toCC()" :disabled="!showToCC">上链</v-btn>
                    <v-btn color="primary" rounded @click="saveNew()" :disabled="!showSave">保存</v-btn>
                    <v-btn color="warning" rounded @click="netcon='';showdialog = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="sb.show" :color="sb.color" :timeout="sb.timeout" :top="true">{{sb.text}}</v-snackbar>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            showdialog: false,
            showSave: false,
            showToCC: false,
            dialogtype: 1,
            netcon: {},
            search: '',
            sb: { //snakebar
                show: false,
                color: "",
                text: "",
                timeout: 3000,
            },
            headers: [{
                    text: '数据编号',
                    align: 'left',
                    sortable: false,
                    value: 'CreateDT',
                },
                {
                    text: '数据拥有单位',
                    align: 'left',
                    sortable: false,
                    value: 'NetconID',
                },
                {
                    text: '数据上链的时间',
                    align: 'center',
                    value: 'ApplyA'
                },
                {
                    text: '数据资产的主题',
                    align: 'center',
                    value: 'ApplyB'
                },
                {
                    text: '数据资产的大小',
                    align: 'center',
                    value: 'Addr'
                },
                {
                    text: '区块版本号',
                    align: 'center',
                    value: 'Area'
                },
                {
                    text: '数据记录在区块中的编号',
                    align: 'center',
                    value: 'Balance'
                },
                {
                    text: '数据上链',
                    align: 'center',
                    sortable: false,
                    value: 'action'
                },
            ],
            items: [],
            rules: {
                required: value => !!value || '请输入',
                counter: value => value.length <= 20 || '最多20个字符',
            },
        };
    },
    mounted() {
        this.refreshNetconList()
    },
    methods: {
        refreshNetconList() {
            this.$axios
                .get("/api/assetStatus/findAll", {
                    params: {},
                })
                .then(res => {
                   if(res.data.length===0){
                       this.items=[]
                   }else {
                       this.items=res.data;
                       window.console.log(res.data);
                   }
                })

        },
        saveNew() {
            let data = {
                netconid: this.netcon.netconid,
                applya: this.netcon.applya,
                applyb: this.netcon.applyb,
                addr: this.netcon.addr,
                area: this.netcon.area,
                balance: this.netcon.balance,
            }
            this.$axios
                .post("/api/netcon/create", this.$qs.stringify(data))
                .then(res => {
                    if (res.data.Code == 0) {
                        this.refreshNetconList()
                        this.showdialog = false
                        this.netcon = {}
                        this.sb.color = "success"
                        this.sb.text = "操作成功!"
                        this.sb.show = true
                    } else {
                        this.sb.color = "error"
                        this.sb.text = "操作失败：" + res.data.Status
                        // this.sb.show = true
                    }
                })
        },
        getColorByCC(cc) {
            if (cc > 0)
                return "green";
            return "warning";
        },
        getDisToCC(code) {
            if (code > 0)
                return false;
            return true;
        },
        getDialogTitle(dtype) {
            switch (dtype) {
                case 1:
                    return '新增资产状态'
                case 2:
                    return '资产状态上链'
                case 3:
                    return '资产状态查询'
            }
        },
        onCreate() {
            this.dialogtype = 1
            this.showSave = true
            this.showToCC = false
            this.netcon = {}
            this.showdialog = true
        },
        onToCC(uuid, netconid, applya, applyb, addr, area, balance) {
            this.dialogtype = 2
            this.showSave = false
            this.showToCC = true
            this.netcon.uuid = uuid
            this.netcon.netconid = netconid
            this.netcon.applya = applya
            this.netcon.applyb = applyb
            this.netcon.addr = addr
            this.netcon.area = area
            this.netcon.balance = balance
            this.showdialog = true
        },
        toCC() {
            let data = {
                uuid: this.netcon.uuid,
                netconid: this.netcon.netconid,
                applya: this.netcon.applya,
                applyb: this.netcon.applyb,
                addr: this.netcon.addr,
                area: this.netcon.area,
                balance: this.netcon.balance,
            }
            this.$axios
                .post("/api/netcon/tocc", this.$qs.stringify(data))
                .then(res => {
                    if (res.data.Code == 0) {
                        this.showdialog = false
                        this.netcon = {}
                        this.sb.color = "success"
                        this.sb.text = "操作成功,网签合同已上链！"
                        this.refreshNetconList()
                        this.sb.show = true
                    } else {
                        this.sb.color = "error"
                        this.sb.text = "操作失败：" + res.data.Status
                        this.sb.show = true
                    }
                })
        },
        queryCC(netconid) {
            this.showdialog = true
            this.$axios
                .get("/api/cc/netcon/querybynetconid?netconid=" + netconid)
                .then(res => {
                    if (res.data.Code == 0) {
                        this.showSave = false
                        this.showToCC = false
                        this.dialogtype = 3
                        this.netcon = res.data.Status[0]
                    } else {
                        this.showdialog = false
                        this.sb.color = "error"
                        this.sb.text = "查询链上合同失败：" + res.data.Status
                        this.sb.show = true
                    }
                })
        },
        getReadonly() {
            switch (this.dialogtype) {
                case 1:
                    return false
                case 2:
                    return true
                case 3:
                    return true
            }
        },
    }
};
</script>
