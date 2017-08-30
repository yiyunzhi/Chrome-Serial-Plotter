chrome.app.runtime.onLaunched.addListener(function () {
	var options = {
		'id': 'Chrome Serial Plotter',
		'bounds': {
			'width': 1024,
			'height': 768
		}
	};
	chrome.app.window.create('index.html', (options));
});
var port_serial_b= chrome.runtime.connect({name: "csp_b_port"});
var serial=chrome.serial;

var serial_con_opt=chrome.serial.ConnectionOptions;
var serial_con_info=chrome.serial.ConnectionsInfo;

serial.onReceive.addListener(function (info) {
   console.log(info);
	//port_serial_b.postMessage({request:"b_rev_data",data:info});

});
serial.onReceiveError.addListener(function (info) {
	console.log("receive_error", info);
	//port_serial_b.postMessage({data:info});
});
serial.getDevices(function(ports){
	console.log("ports:",ports);
});

function serial_connect(device,options){
	serial.connect(device,options,function(con_info){
		//serial_con_info=con_info
		console.log(con_info);
	});
}

chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (msg) {
		switch (port.name) {
			case "csp_f_port":
				switch (msg.f_request) {
					case "f_req_serial_info":
						port.postMessage({b_dest:msg.f_request,b_response: serial_con_info});
						break;
					case "f_req_write_data":
						//send_next(connect_info.socketId,msg.f_cmd);
						break;
					case "f_req_connect_serial":
						serial_connect(msg.device,msg.serial_opt);
						break;
				}
				break;
		}
	});
});
function ab2str_decoder(buf) {
	return new TextDecoder("utf-8").decode(buf);
}
function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function str2ab(str) {
	var buf = new ArrayBuffer(str.length);
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}