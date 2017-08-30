<template>
    <el-card class="grey lighten-4 scroll-y" id="scroll-target" light ref="li_container" height="360px"
    >

                    <span v-if="!sm_show_time">{{item.time}}</span>
                                            <span class="red--text" v-if="item.type==def_serial_string_src.send">
                                                {{item.content}} {{item.id}}
                                            </span>
                                            <span v-if="item.type==def_serial_string_src.receive">{{item.content}}
                                            </span>
                </li>
                <li style="opacity: 0.0" ref="li_height_prob">
                    <span v-if="!sm_show_time">{{current_serial_string.time}}</span>
                                            <span class="red--text"
                                                  v-if="current_serial_string.type==def_serial_string_src.send">
                                                {{current_serial_string.content}} {{current_serial_string.id}}
                                            </span>
                                            <span v-if="current_serial_string.type==def_serial_string_src.receive">{{current_serial_string.content}}
                                            </span>
                </li>

    </el-card>
</template>

<script>
    export default {
        name: 'Monitor',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
