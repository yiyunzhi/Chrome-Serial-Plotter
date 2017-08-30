/**
 * Created by  Aaron Smith on 2017/8/20.
 */
import {Line,mixins} from 'vue-chartjs'
const { reactiveProp } = mixins;
export default Line.extend({
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	},
	watch: {
		"data.labels": {deep:false,handler:function () {
			this._chart.update();
		}},
		"options": {deep:true,handler:function () {
			this.renderChart(this.data, this.options);
		}}
	}
})