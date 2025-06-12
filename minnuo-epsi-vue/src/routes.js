let routes = [
	{
		path: '/login', // 菜单路由
		component: () => import('@/views/Login.vue'),
		// name: '菜单', // 菜单名称
		// iconCls: 'el-icon-message', // 图标样式class
		hidden: true // 菜单是否隐藏 true隐藏
	},
	// 首个节点
	{
		path: '/',
		component: () => import('@/views/Home.vue'),
		// name: '监控台',
    // iconCls: 'icon-font iconshuju', // 图标样式class
		hidden: false,
    	leaf: true,
		children: [
			// {
			// 	path: '/main',
			// 	component: () => import('@/views/Main.vue'),
			// 	name: '主页',
			// 	hidden: true // 隐藏子菜单
			// },
			{
				path: '/echarts',
				component: () => import('@/views/charts/echarts.vue'),
        			iconCls: 'icon-font iconshuju',
				name: '监控台'
			}
		]
	},

	{
		path: '/',
		component: () => import('@/views/Home.vue'),
		name: '数据管理',
		iconCls: 'icon-font iconshuju',
		children: [
			// {
			// 	path: '/clientList',
			// 	component: () => import('@/views/Pages/clientList.vue'),
			// 	name: '管理页面'
			// },
			{
				path: '/AdvertiseManage',
				component: () => import('@/views/advertise/index.vue'),
				name: '轮播图管理'
			},
      {
        path: '/ProductManage',
        component: () => import('@/views/product/index.vue'),
        name: '产品管理'
      },
			{
				path: '/ProductTypeManage',
				component: () => import('@/views/manage/productType.vue'),
				name: '产品类型管理'
			},
			{
				path: '/article',
				component: () => import('@/views/article/index.vue'),
				name: '文章管理'
			},
      {
        path: '/ArticleTypeManage',
        component: () => import('@/views/manage/articleType.vue'),
        name: '文章类型管理'
      },
			{
				path: '/enquires',
				component: () => import('@/views/manage/enquires.vue'),
				name: '询盘管理'
			},
      {
        path: '/companyData',
        component: () => import('@/views/manage/company.vue'),
        name: '公司信息'
      }
      , 
	  {
        path: '/Test',
        component: () => import('@/components/Test.vue'),
        name: '测试'
      }
		]
	},
	{
		path: '*',
		name: '404',
		hidden: true,
		component: () => import('@/views/404') // 404 页面
	}
]

export default routes
