<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="7">
                <el-collapse v-model="accor_serial_setting" accordion>
                    <el-collapse-item name="accor_s_s">
                        <template slot="title">
                            Serial Setting
                        </template>
                        <el-row class="">
                            <el-col :span="12">
                                <el-form label-position="left" :inline="true">
                                    <el-form-item label="PORTS:" class="bm-0 c-s">
                                        <el-select size="mini" v-model="s_infos.s_current_port">
                                            <el-option
                                                    v-for="item in s_coms"
                                                    :key="item.productId"
                                                    :label="item.path+'('+item.displayName+')'"
                                                    :value="item.path">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="DATA-BITS:" class="bm-0 c-s">
                                        <el-select size="mini" v-model="s_infos.s_current_data_length">
                                            <el-option
                                                    v-for="item in s_datalength"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="STOP-BITS:" class="bm-0 c-s">
                                        <el-select size="mini" v-model="s_infos.s_current_stop_bit">
                                            <el-option
                                                    v-for="item in s_stop_bit"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="12">
                                <el-form :inline="true">
                                    <el-form-item label="BAUDRATE:" class="bm-0 c-s">
                                        <el-select size="mini" v-model="s_infos.s_current_baudrate">
                                            <el-option
                                                    v-for="item in s_baudrate"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="PARITY-BIT:" class="bm-0 c-s">
                                        <el-select size="mini" v-model="s_infos.s_current_parity_bit">
                                            <el-option
                                                    v-for="item in s_parity_bit"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="FLOW-CTRL:" class="bm-0 c-s">
                                        <el-select size="mini" v-model="s_infos.s_current_flow_ctrl">
                                            <el-option
                                                    v-for="item in s_flow_ctrl"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg bm-0" justify="center">
                            <el-col :span="24">
                                <el-button :type="s_infos.s_is_connected?'warning':'primary'" size="small"
                                           @click.stop="s_a_connect">
                                    {{s_infos.s_is_connected?'DISCONNECT':'CONNECT'}}
                                </el-button>
                                <el-button :type="s_infos.s_paused?'warning':'info'"
                                           size="small"
                                           :disabled="!s_infos.s_is_connected"
                                           @click.stop="s_a_pause_data">Pause
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
                <el-card class="box-card tm-10" :body-style="{'height':'250px'}">
                    <div slot="header" class="clear-fix bm-0" style="font-size: 10px">
                        <span>Settings</span>
                    </div>
                    <el-row style="font-size: 13px;" class="bm-5">
                        <el-col :span="24">
                            <el-checkbox v-model="s_infos.s_string_show_time" :checked="s_infos.s_string_show_time==1">
                                time visible
                            </el-checkbox>
                            <el-checkbox v-model="s_infos.s_string_show_send" :checked="s_infos.s_string_show_send==1">
                                send visible
                            </el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row style="font-size: 13px;" class="bm-5">
                        <el-col :span="24">
                            <el-input type="text" size="mini" v-model="p_data_labels" auto-complete="off">
                                <template slot="prepend">Legends:</template>
                            </el-input>
                            (use ',' to separate)
                        </el-col>
                    </el-row>
                    <el-row style="font-size: 13px;" :gutter="10" class="bm-5">
                        <el-col :span="20">
                            <el-input type="number" size="mini" v-model="p_infos.p_point_count" min="1"
                                      max="10000" auto-complete="off">
                                <template slot="prepend">Win.Length:</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row style="font-size: 13px;" :gutter="10" class="bm-5">
                        <el-col :span="20">
                            <el-input type="number" size="mini" v-model="p_infos.p_point_limit" min="1"
                                      max="100000" auto-complete="off">
                                <template slot="prepend">Max.Sample:</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row style="font-size: 13px;" class="bm-5">
                        <el-col :span="12" style="padding-top: 7px">
                            <span>smooth line:</span>
                        </el-col>
                        <el-col :span="12">
                            <el-slider
                                    v-model="p_options.elements.line.tension"
                                    :step="0.1"
                                    :max="0.5"
                            >
                            </el-slider>
                        </el-col>
                    </el-row>
                    <el-row style="font-size: 13px;">
                        <el-col :span="24">
                            <el-button type="danger" size="small" @click.stop="clear_serial_buffer">CLEAR</el-button>
                            <el-button type="danger" size="small" @click.stop="test">TEST</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="17">
                <el-tabs type="border-card" style="height: 425px" v-model="tab_active_name"
                         @tab-click="tab_handle_click">
                    <el-tab-pane label="MONITOR" name="MONITOR">
                        <!--<span slot="label">MONITOR</span>-->
                        <el-card class="box-card el-collapse-item__wrap" ref="li_container"
                                 style="font-size:13px;height: 350px;overflow-y: scroll">
                            <div :style="{'padding-bottom':cp_list_bottom_padding+'px','padding-top':cp_list_top_padding+'px'}"
                                 @scroll="onScroll(this)" class="t-monitor" @mouseup="ascii_tip(this)">
                                <div v-show="serial_string.length>0" v-for="item in serial_string" :key="item.id"
                                     class="text item t-monitor">
                                    <!--<span v-if="!s_infos.s_string_show_time">{{item.time}}</span>-->
                                    <span :class="item.type?'red--text':''">
                                    {{s_infos.s_string_show_time?item.time:""}}{{item.content}}</span>
                                </div>
                            </div>
                            <div style="opacity: 0.0;" ref="li_height_prob" class="text item">
                                probe
                            </div>

                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="PLOTTER" style="height: 425px" name="PLOTTER">
                        <el-row class="bm-0">
                            <el-col :span="24">
                                <div style="height: 310px">
                                    <line-chart :data="p_data" :options="p_options" ref="line_chart"></line-chart>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="bm-0">
                            <el-col :span="5" style="padding-top: 5px">
                                <export-image canavas_ref="line-chart"></export-image>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
                <el-card class="tm-10 ">
                    <el-row :gutter="10">
                        <el-col :span="22">
                            <el-input type="text" size="small" v-model="serial_send" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" :disabled="s_infos.btn_send_disabled||!serial_send" size="small"
                                       @click.stop="send_str">
                                {{s_infos.s_send_is_sending?'ABORT':'SEND'}}
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" class="bm-0">
                        <el-col :span="3">
                            <el-radio-group v-model="s_infos.s_current_send_type" size="mini"
                                            :disabled="s_infos.s_send_is_sending">
                                <el-radio-button v-for="item in s_send_type" :label="item.label"
                                ></el-radio-button>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8">
                            <small>POSTFIX:</small>
                            <el-radio-group v-model="s_infos.s_current_send_postfix" size="mini"
                                            :disabled="s_infos.s_send_is_sending">
                                <el-radio-button v-for="item in s_send_postfix"
                                                 :title="item.content"
                                                 :label="item.value">{{item.label}}
                                </el-radio-button>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="4">
                            <el-input type="number" :min="s_infos.s_send_min_loop_ms"
                                      size="mini"
                                      :disabled="s_infos.s_send_is_sending"
                                      @change="send_loop_ms_change"
                                      v-model="s_infos.s_current_send_loop_ms">
                                <template slot="append">ms</template>
                            </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-input type="number" :min=1
                                      size="mini"
                                      :disabled="s_infos.s_send_is_sending"
                                      v-model="s_infos.s_current_send_times">
                                <template slot="append">times</template>
                            </el-input>
                        </el-col>
                        <el-col :span="5">

                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="tm-10">
                    <el-row :gutter="10" class="bm-0">
                        <el-col :span="24" style="font-size: 13px">
                            <b>con_id:</b>{{s_infos.s_connect_id}}
                            <b>con_info:</b>{{s_infos.s_current_port}}-{{s_infos.s_current_baudrate}}-
                            {{s_infos.s_current_data_length}}-{{s_infos.s_current_parity_bit}}-{{s_infos.s_current_stop_bit}}
                            {{s_infos.s_current_flow_ctrl}}
                            <span><b>RX:</b> {{s_infos.rx_bytes}} Bytes, <b>TX:</b> {{s_infos.tx_bytes}} Bytes</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" class="bm-0">
                        <el-col :span="24" style="font-size: 13px">
                            <el-alert v-if="s_infos.s_t_con_msg.length>0"
                                      :title="s_infos.s_t_con_msg[s_infos.s_t_con_msg.length-1].msg"
                                      :type="s_infos.s_t_con_msg[s_infos.s_t_con_msg.length-1].type"
                                      :closable="false"
                                      class="tm-10"
                            >
                            </el-alert>
                        </el-col>
                        <el-card :style="{'position': 'fixed',
                             'display':obj_ascii_tip?'block':'none',
                             'left':obj_ascii_tip?obj_ascii_tip.x+10+'px':'0px',
                             'top':obj_ascii_tip?obj_ascii_tip.y+10+'px':'0px',
                             'font-size':'12px',
                             'max-width':'480px'
                             }"
                                 :body-style="{ padding: '5px' }"
                        >
                            {{obj_ascii_tip?obj_ascii_tip.text:''}}
                        </el-card>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import moment from 'moment'
    import _ from 'lodash'
    import LineChart from './components/LineChart'
    import colorMixin from './mixins/color'
    import ExportImage from './components/ExportImage.vue'
        import {createClient} from 'connect.io'
        const client = createClient();
    export default {
        name: "App",
        mixins: [colorMixin],
        data: function () {
            return {
                context_name: "Serial plotter",
                accor_serial_setting: ["accor_s_s"],
                s_coms: [],
                s_a_con: "s_c_discon",
                tab_active_name: "MONITOR",
                s_send_timer: null,
                s_datalength: [
                    {
                        label: "8",
                        value: "eight"
                    },
                    {
                        label: "7",
                        value: "seven"
                    }
                ],
                s_flow_ctrl: [
                    {
                        label: "None",
                        value: false
                    },
                    {
                        label: "CTS/RTS",
                        value: true
                    }
                ],
                s_stop_bit: [
                    {
                        label: "1",
                        value: "one"
                    },
                    {
                        label: "2",
                        value: "two"
                    }
                ],
                s_parity_bit: [
                    {
                        label: "None",
                        value: "no"
                    },
                    {
                        label: "Odd",
                        value: "odd"
                    },
                    {
                        label: "Even",
                        value: "even"
                    }
                ],
                s_baudrate: [
                    {
                        label: "1200",
                        value: 1200
                    },
                    {
                        label: "4800",
                        value: 4800
                    },
                    {
                        label: "9600",
                        value: 9600
                    },
                    {
                        label: "38400",
                        value: 38400
                    },
                    {
                        label: "115200",
                        value: 115200
                    }
                ],
                s_send_type: [
                    {
                        label: "TEXT",
                        value: "text"
                    },
                    {
                        label: "HEX",
                        value: "hex"
                    }
                ],
                s_send_postfix: [
                    {
                        label: "RAW",
                        value: "",
                        content: ""
                    },
                    {
                        label: "LF",
                        value: "\n",
                        content: "\\n"
                    },
                    {
                        label: "CR",
                        value: "\r",
                        content: "\\r"
                    },
                    {
                        label: "CRLF",
                        value: "\r\n",
                        content: "\\r\\n"
                    }
                ],
                s_infos: {
                    rx_bytes: 0,
                    tx_bytes: 0,
                    s_current_port: "None",
                    s_current_baudrate: 115200,
                    s_current_data_length: "eight",
                    s_current_parity_bit: "no",
                    s_current_stop_bit: "one",
                    s_current_flow_ctrl: false,//false
                    s_string_show_time: false,
                    s_string_show_send: false,
                    s_t_con_msg: [],
                    s_is_connected: false,
                    s_connect_id: null,
                    s_paused: false,
                    s_current_send_type: "TEXT",
                    s_current_send_postfix: "\n",
                    s_current_send_loop_ms: 0,
                    s_current_send_times: 1,
                    s_send_min_loop_ms: 10,
                    s_send_is_sending: false,
                    btn_send_disabled: false
                },
                serial_string: [],
                serial_send: null,
                obj_ascii_tip: null,
                id_count: 0,
                cp_list_height: 0,
                cp_window_cluster_start: false,
                cp_list_bottom_padding: 0,
                cp_list_top_padding: 0,
                serial_string_arr: [],
                page_line_count: 0,
                page_line_height: 0,
                container_height: 0,
                top_idx: 0,
                bottom_idx: 0,
                p_data: {
                    labels: [],
                    datasets: []
                },
                p_data_count: 0,
                p_data_labels: "var1",
                p_infos: {
                    p_slider_id: 0,
                    p_point_count: 100,
                    p_point_limit: 100000
                },
                p_options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0
                    },
                    hover: {
                        animationDuration: 0
                    },
                    responsiveAnimationDuration: 0,
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Tick(IDs)",
                                fontColor: "black"
                            },
                            ticks: {
                                autoskip: true,
                                autoSkipPadding: 30
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Value",
                                fontColor: "black"
                            }
                        }]
                    }
                }
            }
        },
        watch: {},
        computed: {},
        components: {
            "line-chart": LineChart,
            "export-image": ExportImage
        },
        methods: {
            fill_data: function (str) {
                var data_arr = [];
                for (var k = 0; k < str.length; k++) {
                    data_arr=(str[k].content.split(","));
                    //data_arr=["1","2","3"]
                    data_arr=data_arr.map(function (o) {
                        return parseInt(o);
                    });
                    //data_arr=[1,2,3]
                    //create new datasets for Chart
                    if (data_arr.length > this.p_data_count) {
                        for (var j = this.p_data_count; j < data_arr.length; j++) {
                            this.p_data.datasets.push(
                                    {
                                        label: this.p_data_labels.split(",")[j] ? this.p_data_labels.split(",")[j] : 'Var ' + (j + 1).toString(),
                                        fill: false,
                                        borderColor: this.get_random_color(),
                                        borderWidth: 1,
                                        data: [data_arr[j]]
                                    }
                            );

                        }
                        this.p_data_count = data_arr.length;
                    }

                    //1,2,3 =3 length of every line =data_arr[n].length
                    if (data_arr.length == this.p_data_count) {
                        for (var i = 0; i < data_arr.length; i++) {
                            if (this.p_data.datasets[i].data.length > this.p_infos.p_point_count) {
                                this.p_data.datasets[i].data.shift();
                            }
                            this.p_data.datasets[i].data.push(data_arr[i]);
                        }
                        if (this.p_data.labels.length > this.p_infos.p_point_count) {
                            this.p_data.labels.shift();
                        }
                       // console.log(str[k].id);
                        this.p_data.labels.push(str[k].id);
                    }
                    data_arr.length=0;
                }
            },
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            },
            tab_handle_click(){

            },
            ascii_tip(e){
                if (window.getSelection().toString().length > 0 && e.which == 1) {
                    var text = window.getSelection().toString();
                    var arr;
                    var res = "";
                    var self = this;
                    switch (this.s_infos.s_current_send_type) {
                        case "TEXT":
                            res = this.string2hex(text);
                            break;
                        case "HEX":
                            arr = text.split(" ");
                            arr.map(function (o) {
                                if (/^0x/.test(o)) {
                                    res += self.hex2a(o);
                                }
                            });
                            break;
                    }
                    this.obj_ascii_tip = {
                        x: e.clientX,
                        y: e.clientY,
                        text: res
                    };
                    res = "";

                } else {
                    this.clear_ascii_tip();
                }
            },
            clear_ascii_tip: function () {
                this.obj_ascii_tip = null;
            },
            send_loop_ms_change(){
                if (this.s_infos.s_current_send_loop_ms < this.s_infos.s_send_min_loop_ms && this.s_infos.s_current_send_loop_ms != 0) {
                    this.s_infos.btn_send_disabled = true;
                }
                else {
                    this.s_infos.btn_send_disabled = false;
                }
                //console.log(this.s_infos.s_current_send_postfix);
            },
            s_a_connect(){
                var self = this;
                if (this.s_infos.s_is_connected) {
                    client.send('s_disconnect', self.s_infos.s_connect_id, true).catch(function (result) {
                        console.log('disconnect_response', result);
                        if (result) {
                            self.s_infos.s_is_connected = false;
                            self.s_infos.s_paused = false;
                            self.s_infos.s_t_con_msg.push({
                                type: "info",
                                msg: self.s_infos.s_current_port + " was disconnected"
                            });
                        }
                    });
                }
                else {
                    var data = {
                        path: this.s_infos.s_current_port,
                        options: {
                            bufferSize: self.s_infos.s_buf_size,
                            bitrate: this.s_infos.s_current_baudrate,
                            dataBits: this.s_infos.s_current_data_length,
                            parityBit: this.s_infos.s_current_parity_bit,
                            stopBits: this.s_infos.s_current_stop_bit,
                            ctsFlowControl: this.s_infos.s_current_flow_ctrl
                        }
                    };
                    client.send('s_connect', data, true).then(function (msg) {
                        console.log('connect_response', msg);
                        if (msg.connectionId) {
                            self.s_infos.s_connect_id = msg.connectionId;
                            self.s_infos.s_is_connected = true;
                            self.s_infos.s_t_con_msg.push({
                                type: "info",
                                msg: self.s_infos.s_current_port + " was connected"
                            });
                        }
                    }, function (err) {
                        if (err.message) {
                            self.s_infos.s_t_con_msg.push({type: "error", msg: " An error occurred: " + err.message});
                        }
                    });
                }
            },
            s_a_pause_data(){
                //pause fill data
                this.s_infos.s_paused = !this.s_infos.s_paused;
                var self = this;
                client.send('s_pause', {
                    connectionId: self.s_infos.s_connect_id,
                    pause: self.s_infos.s_paused
                }, true).then(function (msg) {
                    self.s_infos.s_t_con_msg.push({type: "warning", msg: self.s_infos.s_current_port + " was paused!"});
                    console.log('set_pause_response', msg);
                }, function (err) {
                    console.log('set_pause_response error', err);
                    self.s_infos.s_t_con_msg.push({
                        type: "warning",
                        msg: " An error occurred when pause this PORT: " + err
                    });
                });
            },
            clear_serial_buffer: function () {
                this.serial_string.splice(0);
                this.serial_string_arr.splice(0);
                this.serial_send = "";
                this.s_infos.tx_bytes = 0;
                this.s_infos.rx_bytes = 0;
                this.cp_list_bottom_padding = 0;
                this.cp_list_top_padding = 0;
                this.id_count = 0;
                this.cp_window_cluster_start = 0;
                this.top_idx = -1;
                this.bottom_idx = -1;
                this.cp_list_height = 0;
                this.p_data_count = 0;
                this.p_data.labels.splice(0);
                this.p_data.datasets.length = 0;
            },
            send_str: function () {
                if (this.s_infos.s_send_is_sending) {
                    clearInterval(this.s_send_timer);
                    this.s_infos.s_send_is_sending = false;
                    this.s_infos.s_current_send_loop_ms = 0;
                    this.s_infos.s_current_send_times = 1;
                } else {
                    var str = "";
                    var self = this;
                    if (this.s_infos.s_current_send_type == "HEX") {
                        str = this.string2hex(this.serial_send + this.s_infos.s_current_send_postfix);
                    } else {
                        str = this.serial_send + this.s_infos.s_current_send_postfix;
                    }
                    var obj = [{
                        id: 's' + this.id_count,
                        type: 1,
                        time: "[" + moment().format('H:mm:ss') + ":" + moment().milliseconds() + "] ",
                        content: str
                    }];
                    if (this.s_infos.s_current_send_loop_ms >= this.s_infos.s_send_min_loop_ms) {
                        var count = this.s_infos.s_current_send_times;
                        this.s_infos.s_send_is_sending = true;
                        this.s_send_timer = setInterval(function () {
                            if (self.s_infos.s_string_show_send) {
                                self.receive_str(obj);
                            }
                            self.send_to_serial(str);
                            self.id_count++;
                            self.s_infos.tx_bytes += str.length;
                            count--;
                            if (count == 0) {
                                self.s_infos.s_send_is_sending = false;
                                self.s_infos.s_current_send_loop_ms = 0;
                                self.s_infos.s_current_send_times = 1;
                                clearInterval(self.s_send_timer);
                            }
                            console.log(self.s_infos.s_send_is_sending);
                        }, self.s_infos.s_current_send_loop_ms);
                    } else {
                        if (this.s_infos.s_string_show_send) {
                            this.receive_str(obj);
                        }
                        this.send_to_serial(str);
                        this.id_count++;
                        self.s_infos.tx_bytes += str.length;
                    }
                }
            },
            send_to_serial: function (str) {
                var self=this;
                client.send('s_send', {
                    connectionId: self.s_infos.s_connect_id,
                    send_data: str
                }, true).then(function (msg) {
                    console.log('send_response', msg);
                }, function (err) {
                    console.log('send_response error', err);
                });
            },
            receive_str: function (str) {
                //this.serial_string.splice(0, str.length);
                this.s_infos.rx_bytes += _.sum(_.map(str, function (o) {
                    if (o.type != 1) {
                        return o.length_t;
                    }
                }));
                this.serial_string = this.serial_string.concat(str);
                //console.log(this.serial_string);
                this.serial_string_arr = this.serial_string_arr.concat(str);
                this.update_cluster(str.length);
            },
            onScroll: function (e) {
                this.clear_ascii_tip();
                this.top_idx = this.serial_string_arr.length - 1 - Math.floor(e.target.scrollTop / this.page_line_height);
                if (this.top_idx - this.page_line_count < 0) {
                    this.bottom_idx = 0;
                } else {
                    this.bottom_idx = this.top_idx - this.page_line_count;
                }
                this.serial_string = _.slice(this.serial_string_arr, this.bottom_idx, this.top_idx + 1);
                if (this.bottom_idx == 0) {
                    this.cp_list_top_padding = 0;
                } else {
                    this.cp_list_top_padding = this.cp_list_height - e.target.scrollTop;
                }
                this.cp_list_bottom_padding = e.target.scrollTop;
                //console.log(this.top_idx, this.bottom_idx, this.serial_string.length);
            },
            string2hex: function (str) {
                var arr = [];
                for (var i = 0; i < str.length; i++) {
                    arr[i] = ("0x" + str.charCodeAt(i).toString(16)).slice(-4);
                }
                return arr.join(" ");
            },
            hex2a: function (hex) {
                var str = '';
                str += String.fromCharCode(parseInt(hex.substr(2, 2), 16));
                return str;
            },
            merge: function (a, b, key) {
                function x(a) {
                    a.forEach(function (b) {
                        if (!(b[key] in obj)) {
                            obj[b[key]] = obj[b[key]] || {};
                            array.push(obj[b[key]]);
                        }
                        Object.keys(b).forEach(function (k) {
                            obj[b[key]][k] = b[k];
                        });
                    });
                }

                var array = [],
                        obj = {};

                x(a);
                x(b);
                return array;
            },
            update_cluster: function (l) {
                this.cp_list_height += l * this.page_line_count;
                this.cp_list_top_padding = this.cp_list_height;
                //console.log(this.cp_list_height,this.serial_string);
            },
            test: function () {
                var self = this;
                var i = 0;
                var j = 0;
                var arr = [];
                var obj = null;
                console.log("start test");
                var t = setInterval(function () {
                    obj = {
                        id: i,
                        time: i + "-782:23:323-",
                        content: self.getRandomInt().toString() + ',' + self.getRandomInt().toString()
                    };
                    arr.push(obj);
                    i++;
                    if (i % (self.page_line_count) == 0) {
                        self.receive_str(arr);
                        self.fill_data(arr);
                        j++;
                        arr.length = 0;
                    }
                    if (j == 5) {
                        //console.log(self.p_data);
                        clearInterval(t);
                    }
                    // console.log(self.cp_list_bottom_padding,self.cp_window_cluster_start);
                }, 0)
            }

        },
        updated: function () {
            //console.log(this.$refs.li_height_prob.clientHeight);
        },
        created: function () {
            var self = this;
            client.on('s_get_devices', function (device) {
                self.s_coms = device;
            });
            client.on('s_get_devices_error', function (error) {
                console.log("client get devices error:", error);
            });
            client.on('s_get_data', function (data) {
                //if(self.tab_active_name=="MONITOR"){
                    self.receive_str(data);
                    self.fill_data(data);
                //}

            });
            client.on('s_get_data_p', function (data) {
               // if(self.tab_active_name=="PLOTTER"){
                    self.fill_data(data);
               // }

            });
            client.on('s_get_data_error', function (err) {
                console.log("client get data error:", err);
            })

        },
        mounted: function () {
            this.$refs.li_container.$el.addEventListener("scroll", this.onScroll, false);
            this.$refs.li_container.$el.addEventListener("mouseup", this.ascii_tip, false);
            var self = this;
            this.$nextTick(function () {
                this.page_line_height = this.$refs.li_height_prob.offsetHeight;
                this.container_height = this.$refs.li_container.$el.offsetHeight;
                this.page_line_count = Math.floor(this.container_height / this.page_line_height);
                client.send('s_f_info', {page_line_count: self.page_line_count});
                //console.log(this.page_line_height, this.container_height, this.page_line_count);
            });
        }
    }
</script>
<style>
    html, body {
        overflow-y: visible;
    }

    .el-row {
        margin-bottom: 20px;

    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .bm-0 {
        margin-bottom: 0 !important;
    }

    .bm-5 {
        margin-bottom: 5px !important;
    }

    .tm-0 {
        margin-top: 0 !important;
    }

    .tm-10 {
        margin-top: 10px !important;
    }

    .lm-0 {
        margin-left: 0 !important;
    }

    .rm-0 {
        margin-right: 0 !important;
    }

    .m-0 {
        margin: 0 !important;
    }

    .c-s .el-form-item__label {
        font-size: inherit !important;
        padding: 0 !important;
    }

    .red--text {
        color: #FF4949 !important;
    }

    .t-monitor {
        transform: scale(1, -1);
    }

    .csp-radio-btn-small .el-radio-button__inner {
        padding: 3px;
    }

    .csp-error {
        border-color: #ff4949;
    }
</style>