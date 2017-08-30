/**
 * Created by  Aaron Smith on 2017/8/28.
 */
import {randomColor} from 'randomcolor'
var mixin = {
	data: function () {
		return {
			colors: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000']
		}
	},
	methods: {
		get_random_color: function () {
			//return this.colors[Math.random() * this.colors.length | 0];
			return randomColor({luminosity: 'light'});
		}
	}
};
export default mixin;