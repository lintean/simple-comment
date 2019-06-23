<template>
	<a-card :title="item.title" :bordered="false" style="box-shadow: 0 0 10px rgba(0, 0, 0, .2); width: 100%;">
		<a-comment :author="item.author" avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
			<template slot="actions">
				<span v-for="(action, index) in actions" :key="index" style="align-content: right;" @click="startAction(index)">{{index == 3? action + "(" + item.comment_num + ")" : action}}</span>
			</template>
			<p slot="content">{{item.content}}</p>
			<a-tooltip slot="datetime" :title="item.date">
				<span>{{item.date}}</span>
			</a-tooltip>

			<a-divider v-if="showCm" />
			<a-comment v-if="showCm" v-for="(cmItem, index) in comment" :key="index" :author="cmItem.author" avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
				<p slot="content">{{cmItem.content}}</p>
				<a-tooltip slot="datetime" :title="cmItem.date">
					<span>{{cmItem.date}}</span>
				</a-tooltip>
			</a-comment>

		</a-comment>

	</a-card>
</template>
<script>
	import moment from 'moment'
	import * as Api from '../api/api'

	export default {
		name: 'UserCMT',
		props: [
			'item'
		],
		data() {
			return {
				actions: ['修改', '删除', '评论', '展开'],
				comment: [{
					author: 'Han Solo',
					avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
					content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
					date: "",
					title: "一个很有风格的标题",
				}],
				showCm: false,
				avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			}
		},
		methods: {
			startAction(index) {
				switch (index) {
					case 0:
						{
							this.$emit("setBV", this.item);
							break;
						}
					case 1:
						{
							this.$emit("setDV", this.item.blogid);
							break;
						}
					case 2:
						{
							this.$emit("setCV", this.item.blogid)
							break;
						}
					case 3:
						{
							if (typeof(this.item.comment_num) == "number" && this.item.comment_num > 0) {
								var _this = this;
								Api.AllComments(this.item.blogid).then(
									res => {
										if (res.data.code === 0) {
											_this.comment = res.data.data.data;
											_this.showCm = true;
										}
										else{
											alert(res.data.msg);
										}
									}).catch(err => {
									alert("retry");
								});
							}
							break;
						}

				}

			}
		}
	}
</script>
