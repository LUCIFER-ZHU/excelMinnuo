<template>
	<!-- 头部内容 -->
	<el-row class="container">
		<el-col :span="24" class="header">
			<!-- LOGO -->
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed ? '模板': sysName}}
			</el-col>

			<!-- 头部右侧用户信息部分-->
			<el-col :span="8" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<span class="user-name" v-text="userName"></span>
						<img :src="this.sysUserAvatar" />
						<!-- <i class="iconfont iconyonghu"></i> -->
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item class="el-icon-switch-button" @click.native="logout" divided>&nbsp;退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>

		<!-- 主题内容页面 -->
		<el-col :span="24" class="main">
			<!-- <aside :class="collapsed?'menu-collapsed':'menu-expanded'"> -->
			<aside class="menu-expanded">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					unique-opened router v-show="!collapsed">
          			<!--循环rotes.js文件中的配置的内容-->
					<template v-for="(item,index) in $router.options.routes">
						<div v-if="!item.hidden" :key="index">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title"><i class="iconfont" :class="item.iconCls"></i>{{item.name}}</template>

								<el-menu-item
									v-for="child in item.children"
									:index="child.path"
									:key="child.path"
									v-show="!child.hidden"
									>
									<i class="iconfont" :class="child.iconCls"></i>
									{{ child.name }}
								</el-menu-item>
							</el-submenu>

              					<!--渲染当只有一个子元素的情况-->
							<el-menu-item
								v-if="item.leaf && (item.children.length > 0)"
								:index="item.children[0].path">
								<i :class="item.iconCls"></i>
								{{ item.children[0].name }}
							</el-menu-item>
						</div>
					</template>
				</el-menu>
			</aside>

			<section class="content-container">
				<div class="grid-content bg-purple-light">
              			<!--页面上方的页面路径渲染-->
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner"></el-breadcrumb>
					</el-col>

          			<!--页面内容渲染-->
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	import session from '@/utils/session' // 引入localStorage组件

	export default {
		props: {
			lang: String
		},
		data() {
			return {
				// 语言种类列表
				localList: [
					{
						name: '中文',
						value: 'zh-CN'
					},
					{
						name: 'English',
						value: 'en-US'
					},
					{
						name: '韩文',
						value: 'ko'
					}
				],
				sysName: '机床站 后台',
				userName: '李四',
				isOpenIcons: false,
				isCloseIcons: true,
				collapsed: false,
				sysUserName: '',
				sysUserAvatar: 'http://zk-web-object.oss-cn-qingdao.aliyuncs.com/h5/oa/images/user.jpg',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		watch: {
			lang (lang) {
				this.$i18n.locale = lang
			}
		},
		mounted () {
			var user = sessionStorage.getItem('user')
			if (user) {
				user = JSON.parse(user)
				// this.sysUserName = user.name || ''
				this.sysUserName = user.user_name || ''
			}
		},
		methods: {
			onSubmit () {
				console.log('submit!')
			},
			handleopen () {
				// console.log('handleopen')
			},
			handleclose () {
				// console.log('handleclose')
			},
			handleselect (a, b) {

			},
			// 退出登录
			logout () {
				var _this = this
				this.$confirm('确认退出吗?', '提示', {
					// type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user')
					_this.$router.push('/login')
				}).catch((err) => {
					console.log(err)
				})
			},
			// 折叠导航栏
			collapse () {
				this.collapsed = !this.collapsed
				this.isOpenIcons = !this.isOpenIcons
				this.isCloseIcons = !this.isCloseIcons
			},
			showMenu (i, status) {
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
			},
			setBtn () {
				this.$message.success('设置')
			},
			// 语言切换
			handleSetLanguage(lang) {
				console.log(lang)
				this.$i18n.locale = lang
				// session.set('i18n', lang)
				// this.$i18n.locale = lang === 'zh-CN' ? 'zh-CN' : 'en-US'
				// this.$store.dispatch("base/changeI18n", lang)
			}
		}
	}
</script>

<style scoped lang="less">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #20a0ff;
			color: #fff;
			background-color: #303133;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
				.el-dropdown {
					height: 60px;
					line-height: 60px;
					.iconyonghu {
						font-size: 36px;
					}
				}
				.select-lang {
					width: 100px;
					margin-right: 30px;
					text-align: center;
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				text-align: center;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width {
				width:230px;
			}
			.logo-collapse-width {
				width:60px
			}
			.tools {
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
				i {
					position: relative;
					top: 2px;
					font-size: 20px;
				}
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
					.el-submenu {
						.is-active {
							color: #fff;
							background-color: #20a0ff;
						}
					}
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}
				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
				.el-menu-vertical-demo {
					width: 230px !important;
				}
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					padding-bottom: 10px;
					.breadcrumb-inner {
						float: left;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
