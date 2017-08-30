/**
 * Created by  Aaron Smith on 2017/8/21.
 */
import EventEmitter from 'events';
import {call,scope} from 'chrome-call';

const chrome = window.chrome;
const serial = chrome.serial;
const callSerial = scope('serial');


var id = 0;
const type = 'serial';

var SerialDevice = {
	info: null,
	connectingsPromise: null,
	data: '',
	buffer: '',
	error: '',
	options: {},
	connection: {
		connection: null
	},
	get_devices: function () {
		return callSerial('getDevices');
	},
	connect: function (path, options) {
		return callSerial('connect', path, options);
	},
	disconnect: function (connectionId) {
		return callSerial('disconnect', connectionId);
	},
	send: function (connectionId,data) {
		return callSerial('send', connectionId,data);
	},
	setPaused: function (connectionId,paused) {
		return callSerial('setPaused', connectionId,paused);
	},
	flush:function(connectionId){
		return callSerial('flush', connectionId);
	},
	onReceive: function () {
		return callSerial('onReceive.addListener');
	},
	onReceiveError: function () {
		return callSerial('onReceiveError.addListener');
	}
};


/**
 * 根据设备路径获取串口对象
 * @param {String} path - 设备路径
 * @returns {SerialDevice|undefined}
 */
function findByDevicePath(path) {
	let foundDevice;
	this.devices.some(device => {
		if (device.info.path === path) {
			foundDevice = device;
			return true;
		}
	});
	return foundDevice;
}

/**
 * 根据连接 id 找到设备
 * @param connectionId
 * @returns {SerialDevice|undefined}
 */
function findByConnectionId(connectionId) {
	let foundDevice;
	this.devices.some(device => {
		const {connection} = device;
		if (connection && connection.connectionId === connectionId) {
			foundDevice = device;
			return true;
		}
	});
	return foundDevice;
}



export default SerialDevice;