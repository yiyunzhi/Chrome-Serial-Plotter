const {chrome}=window, {app}=chrome;

app.runtime.onLaunched.addListener(function(){
	app.window.create('index.html',{
		'id': 'Chrome Serial Plotter',
		'bounds': {
			'width': 1024,
			'height': 720
		}
	})
});