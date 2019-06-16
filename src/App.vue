<template>
	<div id="app">
		<a-layout id="components-layout-demo-fixed">
			<a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
				<div class="logo" />
				<a-menu theme="dark" mode="horizontal" :defaultSelectedKeys="['1']" style="line-height: 64px; display: inline-block"
				 @click="menuClick">
					<a-menu-item key="1">博客首页</a-menu-item>
					<a-menu-item key="2">用户页面</a-menu-item>
				</a-menu>
				<div style="float: right;" v-if="!isLogin">
					<a-button ghost style="margin-right: 10px;" @click="loginData.visible = true">登陆</a-button>
					<a-button ghost @click="registerData.visible = true">注册</a-button>
				</div>
				<div style="float: right;" v-if="isLogin">
					<a-button ghost style="margin-right: 10px;">{{userOnline}}</a-button>
					<a-button ghost @click="logout">注销</a-button>
				</div>
			</a-layout-header>

			<a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
				<div style="background: #fff; padding: 15px; min-height: 380px;">
					<div v-if="isHome" style="display: flex; justify-content: center;">
						<section class="comment_cnt">
							<a-list class="comment-list" itemLayout="horizontal" :dataSource="blogs" :split="false">
								<a-list-item slot="renderItem" slot-scope="item, index" style="padding: 20px;">
									<simple-comment :item="item" @setCV="setCV"></simple-comment>
								</a-list-item>
							</a-list>
						</section>

						<section class="ranking_rnt">
							<a-list :header="`博客排行榜`" itemLayout="horizontal" :dataSource="rank" style="box-shadow: 0 0 10px rgba(0, 0, 0, .2); border: none; text-align: center; font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-top: 20px;">
								<a-list-item slot="renderItem" slot-scope="rankItem, index" style="text-align: left; font-size: 14px; font-weight: normal; padding-bottom: 12px">
									<a-card style="width: 100%; position: relative; border:none;" bodyStyle="padding:10px; height: 50px;">
										<h2 style="display: inline-block; position: absolute; color: red; left: 10%;">{{index + 1 + "."}}</h2>
										<span style="display: inline-block; position: absolute; left: 25%; height: 30px; line-height: 30px;">{{rankItem.title}}</span>
									</a-card>
								</a-list-item>
							</a-list>
						</section>
					</div>

					<div v-if="!isHome">
						<section class="comment_cnt" style="margin: 0 auto;">
							<el-button type="primary" @click="blogData.visible = true; blogData.isNew = true;" style="margin: 0 auto; display: block;">新建博客</el-button>
							<a-list class="comment-list" itemLayout="horizontal" :dataSource="userBlogs" :split="false">
								<a-list-item slot="renderItem" slot-scope="item, index" style="padding: 20px;">
									<user-comment :item="item" @setBV="setBV" @setDV="setDV" @setCV="setCV"></user-comment>
								</a-list-item>
							</a-list>
						</section>
					</div>
				</div>
			</a-layout-content>
			<a-layout-footer :style="{ textAlign: 'center' }">
				Ant Design Vue ©2019 Created by Li
			</a-layout-footer>
		</a-layout>

		<el-dialog title="登陆" :visible.sync="loginData.visible" width="400px" style="text-align: left;">
			<el-form label-position="right" label-width="80px" style="margin-right: 50px; margin-top: 30px" :model="loginData"
			 :rules="loginData.rules">
				<el-form-item label="账户" prop="user">
					<el-input v-model="loginData.user"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="loginData.pwd"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="loginData.visible = false">取 消</el-button>
				<el-button type="primary" @click="login">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="注册" :visible.sync="registerData.visible" width="400px" style="text-align: left;">
			<el-form label-position="right" label-width="80px" style="margin-right: 50px; margin-top: 30px" :model="registerData"
			 :rules="registerData.rules">
				<el-form-item label="账户" prop="user">
					<el-input v-model="registerData.user"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="registerData.pwd"></el-input>
				</el-form-item>
				<el-form-item label="确认" prop="pwdRp">
					<el-input v-model="registerData.pwdRp"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="registerData.visible = false">取 消</el-button>
				<el-button type="primary" @click="register">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="博客" :visible.sync="blogData.visible" width="500px" style="text-align: left;">
			<el-form label-position="right" label-width="80px" style="margin-right: 50px; margin-top: 30px" :model="blogData">
				<el-form-item label="标题" prop="title">
					<el-input v-model="blogData.title"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="blogData.content" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="blogData.visible = false">取 消</el-button>
				<el-button type="primary" @click="blog">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="评论" :visible.sync="commentData.visible" width="500px" style="text-align: left;">
			<el-form label-position="right" label-width="80px" style="margin-right: 50px; margin-top: 30px" :model="commentData">
				<el-form-item label="内容" prop="content">
					<el-input v-model="commentData.content" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="commentData.visible = false">取 消</el-button>
				<el-button type="primary" @click="addComment">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="删除博客" :visible.sync="deleteBlogData.visible" width="500px" style="text-align: left;">
			<span>确定删除这条博客吗？</span>
			<div slot="footer" class="dialog-footer">
				<el-button @click="deleteBlogData.visible = false">取 消</el-button>
				<el-button type="primary" @click="deleteBlog">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import moment from 'moment'
	import SimpleCMT from './components/SimpleCMT.vue'
	import UserCMT from './components/UserCMT.vue'
	import * as Api from './api/api'

	export default {
		name: 'app',
		components: {
			'simple-comment': SimpleCMT,
			'user-comment': UserCMT
		},
		data() {
			return {
				blogs: [{
						author: 'Han Solo',
						content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
						datetime: "",
						title: "一个很有风格的标题",
						blogid: "1",
						date: "",
						comment_num: 100
					},
					{
						author: 'Han Solo',
						content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
						datetime: "",
						title: "非常吸引人的一个标题",
						blogid: "2",
						date: "",
						comment_num: 100
					},
				],
				userBlogs: [{
						author: 'Han Solo',
						content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
						datetime: moment().subtract(1, 'days'),
						title: "一个很有风格的标题"
					},
					{
						author: 'Han Solo',
						content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
						datetime: moment().subtract(2, 'days'),
						title: "非常吸引人的一个标题",
					},
				],
				moment,
				rank: [{
						rank: 1,
						title: "一个很有风格的标题"
					},
					{
						rank: 2,
						title: "非常吸引人的一个标题"
					}
				],
				// 状态参数
				isLogin: false,
				userOnline: "lintean",
				isHome: true,
				queryStatus: 0,
				loginData: {
					visible: false,
					user: "",
					pwd: "",
					rules: {
						user: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}],
						pwd: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						}]
					}
				},
				registerData: {
					visible: false,
					user: "",
					pwd: "",
					pwdRp: "",
					rules: {
						user: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}],
						userName: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}],
						pwd: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						}],
						pwdRp: [{
							required: true,
							message: '请确认密码',
							trigger: 'blur'
						}]
					}
				},
				blogData: {
					visible: false,
					isNew: false,
					title: "",
					content: "",
					blogid: "",
					author: "",
					comment_num: ""
				},
				commentData: {
					visible: false,
					content: "",
					blogid: "456",
				},
				deleteBlogData: {
					visible: false,
					blogid: ""
				}
			}
		},
		mounted: function() {
			var _this = this;
			Api.getUser().then(
				res => {
					if (res.data.code === 0) {
						_this.userOnline = res.data.userName;
						_this.isLogin = true;
					} else {
						_this.isLogin = false;
					}

				}).catch(err => {
				console.log(err)
			});
			this.reset();
		},
		methods: {
			menuClick(event) {
				if (event.key == "1") this.isHome = true;
				else {
					if (this.isLogin == true) this.isHome = false;
					else this.loginData.visible = true;
				}
			},
			login() {
				var _this = this;
				Api.Login(this.loginData.user, this.loginData.pwd).then(
					res => {
						if (res.data.code === 0) {
							_this.userOnline = this.loginData.user;
							_this.isLogin = true;

							this.loginData.visible = false;
						}
					}).catch(err => {
					console.log(err)
				});
			},
			register() {
				var _this = this;
				Api.Register(this.registerData.user, this.registerData.pwd).then(
					res => {
						if (res.data.code === 0) {
							_this.userOnline = this.registerData.user;
							_this.isLogin = true;

							this.registerData.visible = false;
						}
					}).catch(err => {
					console.log(err)
				});
			},
			logout() {
				var _this = this;
				Api.Logout().then(
					res => {
						if (res.data.code === 0) {
							_this.isLogin = false;
						}
					}).catch(err => {
					console.log(err)
				});
			},
			blog() {
				var _this = this;
				if (this.blogData.isNew) {
					// 新增博客
					Api.AddBlog(this.userOnline, this.blogData.title, this.blogData.content, 0, new Date()).then(
						res => {
							if (res.data.code === 0) {
								_this.reset();
								_this.blogData.visible = false;
							}
						}).catch(err => {
						console.log(err)
					});
				} else {
					// 修改博客
					var blog = this.blogData;
					Api.ChangeBlog(blog.blogid, blog.author, blog.title, blog.content, blog.comment_num, blog.date).then(
						res => {
							if (res.data.code === 0) {
								_this.reset();
								_this.blogData.visible = false;
							}
						}).catch(err => {
						console.log(err)
					});
				}
			},
			deleteBlog() {
				var _this = this;
				Api.DeleteBlog(this.deleteBlogData.blogid).then(
					res => {
						if (res.data.code === 0) {
							_this.reset();
							_this.deleteBlogData.visible = false;
						}
					}).catch(err => {
					console.log(err)
				});
			},
			addComment() {
				// 新增评论
				var _this = this;
				Api.AddComment(this.commentData.blogid, this.commentData.author, this.commentData.content).then(
					res => {
						if (res.data.code === 0) {
							_this.reset();
							_this.commentData.visible = false;
						}
					}).catch(err => {
					console.log(err)
				});

			},
			reset() {
				// 初始化（3个查询）
				this.queryStatus = 0;
				this.queryAllBlogs();
				this.queryUserBlogs();
				this.queryRank();
			},
			setCV(blogid) {
				this.commentData.blogid = blogid;
				this.commentData.visible = true;
			},
			setBV(item) {
				this.blogData.blogid = item.blogid;
				this.blogData.author = item.author;
				this.blogData.title = item.title;
				this.blogData.content = item.content;
				this.blogData.comment_num = item.comment_num;
				this.blogData.visible = true;
				this.blogData.isNew = false;
			},
			setDV(blogid) {
				this.deleteBlogData.blogid = blogid;
				this.deleteBlogData.visible = true;
			},
			queryAllBlogs() {
				var _this = this;
				Api.AllBlogs().then(
					res => {
						if (res.data.code === 0) {
							_this.blogs = res.data.data.data;
						}
					}).catch(err => {
					console.log(err)
				});
			},
			queryUserBlogs() {
				var _this = this;
				Api.UserBlogs().then(
					res => {
						if (res.data.code === 0) {
							_this.userBlogs = res.data.data.data;
						}
					}).catch(err => {
					console.log(err)
				});
			},
			queryRank() {
				var _this = this;
				Api.Rank().then(
					res => {
						if (res.data.code === 0) {
							console.log(res.data);
							_this.rank = res.data.data.data;
						}
					}).catch(err => {
					console.log(err)
				});
			},
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		width: 100%;
	}

	.light_border {
		border: 1px solid #ebedf0;
		border-radius: 2px;
		position: relative;
	}

	.comment_cnt {
		width: 60%;
		height: auto;
		margin-right: 5%;
	}

	.ranking_rnt {
		width: 20%;
		height: fit-content;
	}

	#components-layout-demo-fixed .logo {
		width: 120px;
		height: 31px;
		background: rgba(255, 255, 255, .2);
		margin: 16px 24px 16px 0;
		float: left;
	}
</style>
