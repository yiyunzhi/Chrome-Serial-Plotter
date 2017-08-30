/**
 * Created by  Aaron Smith on 2017/8/21.
 */
import SerialDevice from './serial';
import {createServer} from 'connect.io'
import moment from 'moment'


const chrome = window.chrome;
const serial = chrome.serial;
const server = new createServer();
var r_buf = '';
var obj;
var s_buffer = [];
var s_update_timer;
var byte = '';
var receive_timeout=false;
var decoder = new TextDecoder();
var chunk_line = 5;
var id = 0;
var s_receive_timer=new Timer(function(){
	receive_timeout=true;
},100);

server.on('connect', function (client) {
	setInterval(function () {
		SerialDevice.get_devices().then(function (devices) {
			//console.log("server get devices:",devices);
			server.send('s_get_devices', devices);
			//resolve();
		}, function (error) {
			//console.log("server get devices error:",error);
			server.send('s_get_devices_error', error);
			//reject(error);
		});
	}, 1000);
	client.on('s_f_info', function (data, resolve, reject) {
		chunk_line = data.page_line_count;
		console.log('chunk_line', chunk_line);
		//resolve();
	});
	client.on('s_connect', function (data, resolve, reject) {
		clr_buf();
		var path = data.path;
		var options = data.options;
		options.bufferSize = 8192;
		SerialDevice.connect(path, options).then(function (con_info) {
			SerialDevice.flush(con_info.connectionId).then(function (flush_res) {
				resolve(con_info);
				s_update_timer = setInterval(function () {
					if (s_buffer.length >= chunk_line||(receive_timeout&&s_buffer.length >0)) {
						server.send('s_get_data', s_buffer.splice(0, chunk_line));
						receive_timeout=false;
						//clearTimeout(s_receive_timer);
						//s_receive_timer.restart();
						console.log(receive_timeout);
					}
				}, 0);
			}, function (e) {
				reject(e);
			});
		}, function (e) {
			console.log(e);
			reject(e);
		})
	});
	client.on('s_disconnect', function (data, resolve, reject) {
		clr_buf();
		SerialDevice.disconnect(data).then(function (result) {
			SerialDevice.flush(data).then(function (flush_res) {
				clearInterval(s_update_timer);
				s_receive_timer.cancel();
				resolve(result & flush_res);
			}, function (e) {
				reject(e);
			});

		}, function (e) {
			console.log("srv_disconnect:", e);
			reject(e);
		})
	});
	client.on('s_send', function (data, resolve, reject) {
		var connectionId = data.connectionId;
		var send_data = str2ab(data.send_data);
		clr_buf();
		console.log("send_data",connectionId,send_data);
		SerialDevice.send(connectionId, send_data).then(function (send_info) {
			resolve(send_info);
		}, function (e) {
			console.log(e);
			reject(e);
		})
	});
	client.on('s_pause', function (data, resolve, reject) {
		var connectionId = data.connectionId;
		var pause = data.pause;
		clr_buf();
		SerialDevice.setPaused(connectionId, pause).then(function (pause_info) {
			resolve(pause_info);
		}, function (e) {
			console.log(e);
			reject(e);
		})
	});
	serial.onReceive.addListener(function (obj) {
		byte = decoder.decode(obj.data);
		console.log(byte);
		if (byte.slice(-1) == '\n') {
			r_buf += byte;
			var arr_buf = r_buf.split(/\r?\n/);
			var arr=arr_buf.filter(function (o) {
				return o.trim()
			});
			//console.log(arr);
			if (arr.length > 1) {
				for(var a of arr){
					obj={
						id: id,
						time: '[' + moment().format('H:mm:ss') + ":" + moment().milliseconds() + '] ',
						length_t: a.length,
						content: a
					};
					s_buffer.push(obj);
					//server.send('s_get_data_p', obj);
					id++;
				}
			}else{
				obj={
					id: id,
					time: '[' + moment().format('H:mm:ss') + ":" + moment().milliseconds() + '] ',
					length_t: arr[0].length,
					content: arr[0]
				};
				s_buffer.push(obj);
				//server.send('s_get_data_p', obj);
				id++;
			}
			r_buf = '';
		} else {
			r_buf += byte;
			//console.log("--");
			//console.log(r_buf);
		}
		s_receive_timer.restart();
	});
	serial.onReceiveError.addListener(function (obj) {
		//console.log(ab2str(obj.data));
		server.send('s_get_data_error', obj);
	});

});
function clr_buf() {
	r_buf = '';
	byte = '';
}
function is_char(str) {
	return /^\w+$/.test(str);
}
function check_char(str) {
	return /^[\w+,]*$/.test(str);
}
function is_numeric(str) {
	return /^\d+$/.test(str);
}
function ab2str(buf) {
	try {
		return String.fromCharCode.apply(null, new Uint8Array(buf));
	}
	catch (e) {
		console.warn('Error occurred while parse Serial data：', e, buf);
		return '';
	}
}
function str2ab(str) {
	var buf = new ArrayBuffer(str.length);
	var bufView = new Uint8Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}
function Timer(fn, countdown) {
	var ident;

	function cancel() {
		clearTimeout(ident);
	}
	function restart() {
		clearTimeout(ident);
		ident = setTimeout(fn, countdown);
	}
	function start(){
		ident = setTimeout(fn, countdown);
	}
	return { cancel: cancel,restart: restart ,start:start};
}