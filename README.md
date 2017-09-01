# Chrome Serial Monitor and Plotter
# Chrome 串口打印及绘图扩展程序

<p><b>A ChromeExtension base on Vuejs v2.x. With this Application you can access local serial devices. This Application has a SerialMonitor and Plotter that were with Vuejs implemented.</b></p>
<p><b>基于Vuejs v2.x开发的Chrome扩展程序，借助这个扩展可以很方便的访问本地串口设备。程序有使用Vuejs实现的串口监视和绘图功能。</b></p>
<p align="center">
  <img src="https://github.com/yiyunzhi/Chrome-Serial-Plotter/blob/master/dist/logo.PNG" alt="Drawing" width="50"/>
</p>
<p>
The motivation to develop this program mainly by two points, the first is the development of embedded in the need for a serial debugging software, followed by the computer does not allow the installation of software restrictions. But I found that the use of Javascript real-time data acquisition is difficult. But in this program can reach about 5ms refresh time. This procedure is recommended for research purposes. For real-time applications, I do not recommend using this software instead of professional software. If anyone is interested in the technical details of this program, I am happy to be able to help.
</p>
<p>
开发这个程序的动机主要由两点。首先在嵌入式开发中经常需要使用串口调试软件。其次是实验室电脑不允许安装软件。但是使用Javascript来实现实时数据监视和绘制是比较难的。但是这个程序中最高可以达到5ms的刷新时间。这个程序建议用于研究目的。对于实时性应用我不建议使用这个扩展程序代替专业软件。如果有朋友对这个扩展程序的技术细节感兴趣，我很乐意提供帮助。
</p>
<p>Acceptable data format is:"120,240,360..." that with comma separated.</p>
<p>接收的数据格式是“120，240,360...”，数据之间使用逗号分隔。</p>
<p align="center">
  <img src="https://github.com/yiyunzhi/Chrome-Serial-Plotter/blob/master/dist/plotter.PNG" alt="Drawing" width="600"/>
</p>
<p align="center">
  <img src="https://github.com/yiyunzhi/Chrome-Serial-Plotter/blob/master/dist/ascii-tip.PNG" alt="Drawing" width="600"/>
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
