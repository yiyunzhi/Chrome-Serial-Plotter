# Chrome Serial Monitor and Plotter

<p><b>A ChromeExtension base on Vuejs v2.x. With this Application you can access local serial devices. This Application has a SerialMonitor and Plotter that were with Vuejs implemented.</b></p>
<p align="center">
  <img src="https://github.com/yiyunzhi/Chrome-Serial-Plotter/blob/master/dist/logo.PNG" alt="Drawing" width="50"/>
</p>
<p>
The motivation to develop this program mainly by two points, the first is the development of embedded in the need for a serial debugging software, followed by the computer does not allow the installation of software restrictions. But I found that the use of Javascript real-time data acquisition is difficult. But in this program can reach about 5ms refresh time. This procedure is recommended for research purposes. For real-time applications, I do not recommend using this software instead of professional software. If anyone is interested in the technical details of this program, I am happy to be able to help.
</p>
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for ChromeExtension
npm run dev_background

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
