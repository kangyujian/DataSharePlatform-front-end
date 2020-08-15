<template>
<div id="netcon">
    <v-container grid-list-xl fluid>
        <v-card class="mx-auto" max-width="100%">
            <v-divider></v-divider>
            <v-card>
                <v-card-title class="grey lighten-4">资产定价管理
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" label="按内容查询" single-line hide-details></v-text-field>
                    <v-btn icon @click="refreshTaxList">
                        <v-icon>fas fa-sync-alt</v-icon>
                    </v-btn>
                    <v-btn icon @click="onCreate">
                        <v-icon>fas fa-plus</v-icon>
                    </v-btn>
                </v-card-title>
<!--                &lt;!&ndash;  展示数据表&ndash;&gt;-->
<!--                <v-data-table :headers="headers" :items="items" class="elevation-1" :search="search">-->
<!--                    <template v-slot:item.id="{ item }">-->
<!--                        <v-chip :color="getColorByCC(item.IsCCed)">{{ item.TaxID }}</v-chip>-->
<!--                    </template>-->
<!--                    <template v-slot:item.action="{ item }">-->
<!--                        <v-btn color="success" :disabled="!getDisToCC(item.IsCCed)" @click="onToCC(item.ID,item.TaxID,item.Taxer,item.Area,item.Tax)">上链</v-btn>-->
<!--                        <v-btn color="info" :disabled="getDisToCC(item.IsCCed)" @click="queryCC(item.TaxID)">查链</v-btn>-->
<!--                    </template>-->
<!--                </v-data-table>-->


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
                        <tr v-for="(item,index) in items" :key="item.id">
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
                                    @change="changeSwitch(item.isonline,item.id,index)"
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
                            <v-text-field v-model="etax.id" :hidden="true" />
                            <v-text-field v-model="etax.taxid" label="数据编号" placeholder="" :rules="[rules.required]" :autofocus=true :readonly="getReadonly()" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="etax.taxer" label="数据检查单位" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="etax.area" label="数据定价的时间" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="etax.tax" label="数据资产的大小" placeholder="" :rules="[rules.required]" :readonly="getReadonly()" />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions justify-right>
                    <v-btn color="primary" rounded @click="toCC()" :disabled="!showToCC">上链</v-btn>
                    <v-btn color="primary" rounded @click="saveNew()" :disabled="!showSave">保存</v-btn>
                    <v-btn color="warning" rounded @click="etax='';showdialog = false">关闭</v-btn>
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
            etax: {},
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
                    text: '数据检查单位',
                    align: 'left',
                    sortable: false,
                    value: 'TaxID',
                },
                {
                    text: '数据定价的时间',
                    align: 'center',
                    value: 'Taxer'
                },
                {
                    text: '数据资产的大小',
                    align: 'center',
                    value: 'Area'
                },
                {
                    text: '数据资产的价值',
                    align: 'center',
                    value: 'Tax'
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
        this.refreshTaxList()
    },
    methods: {
        refreshTaxList() {
            this.$axios
                .get("api/assetPricing/findAll", {
                    params: {},
                })
                .then(res => {
                    if(res.data.length===0){
                        this.items=[];
                    }else{

                        this.items=res.data;
                        window.console.log(res.data);

                    }

                })
        },
        saveNew() {
            let data = {
                taxid: this.etax.taxid,
                taxer: this.etax.taxer,
                area: this.etax.area,
                tax: this.etax.tax,
            }
            this.$axios
                .post("/api/estatetax/create", this.$qs.stringify(data))
                .then(res => {
                    if (res.data.Code == 0) {
                        this.refreshTaxList()
                        this.showdialog = false
                        this.etax = {}
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
                    return '新增资产定价'
                case 2:
                    return '资产定价上链'
                case 3:
                    return '资产定价查询'
            }
        },
        onCreate() {
            this.dialogtype = 1
            this.showSave = true
            this.showToCC = false
            this.etax = {}
            this.showdialog = true
        },
        onToCC(uuid, taxid, taxer, area, tax) {
            this.dialogtype = 2
            this.showSave = false
            this.showToCC = true
            this.etax.uuid = uuid
            this.etax.taxid = taxid
            this.etax.taxer = taxer
            this.etax.area = area
            this.etax.tax = tax
            this.showdialog = true
        },
        toCC() {
            let data = {
                uuid: this.etax.uuid,
                taxid: this.etax.taxid,
                taxer: this.etax.taxer,
                area: this.etax.area,
                tax: this.etax.tax,
            }
            this.$axios
                .post("/api/estatetax/tocc", this.$qs.stringify(data))
                .then(res => {
                    if (res.data.Code == 0) {
                        this.showdialog = false
                        this.etax = {}
                        this.sb.color = "success"
                        this.sb.text = "操作成功,纳税凭证已上链！"
                        this.refreshTaxList()
                        this.sb.show = true
                    } else {
                        this.sb.color = "error"
                        this.sb.text = "操作失败：" + res.data.Status
                        this.sb.show = true
                    }
                })
        },
        queryCC(taxid) {
            this.showdialog = true
            this.$axios
                .get("/api/cc/estatetax/querybytaxid?taxid=" + taxid)
                .then(res => {
                    if (res.data.Code == 0) {
                        this.showSave = false
                        this.showToCC = false
                        this.dialogtype = 3
                        this.etax = res.data.Status[0]
                    } else {
                        this.showdialog = false
                        this.sb.color = "error"
                        this.sb.text = "查询链上纳税凭证失败：" + res.data.Status
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
        changeSwitch(flag,id,index){


            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }


            window.console.log(flag,id,index);
            this.$axios
                .get("api/assetPricing/update", {
                    params: {
                                     datacheacker: this.items[index].datacheacker,
                                     datapricedecidetime: (new Date(this.items[index].datapricedecidetime)).Format('yyyy-MM-dd hh:mm:ss').toString(),
                                     datasize: this.items[index].datasize,
                                     datavalue: this.items[index].datavalue,
                                     id: id,
                                     isonline: flag

                    },
                })
                .then(res => {

                    if(res.data){
                        window.console.log('Sucess!');
                    }else{
                        window.console.log('fail!');
                    }
                })

        }
    }
};
</script>
