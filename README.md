# simple_blog

## description

### 文件说明
 - 总体组件：./src/App.vue
	- 主要使用：
		- [大体布局：ant design 布局](https://vue.ant.design/components/layout-cn/)
		- [ant design menu](https://vue.ant.design/components/menu-cn/)
		- [ant design 列表](https://vue.ant.design/components/list-cn/)
		- [ant design 卡片](https://vue.ant.design/components/card-cn/)
		- [element 对话框](https://element.eleme.cn/#/zh-CN/component/dialog)
		- [element 表单](https://element.eleme.cn/#/zh-CN/component/form)
 - 总体配置：./src/main.js
 - 网络请求：./src/api/api.js
 - 博客首页comment组件： ./src/components/SimpleCMT.vue
	- 主要使用：
		- [ant design comment](https://vue.ant.design/components/comment-cn/)
 - 个人主页comment组件： ./src/components/UserCMT.vue 跟博客首页的comment组件基本相同，只是增加了修改和删除功能

### 工具说明
 - 总体框架:[vue](https://cn.vuejs.org/v2/guide/)
 - 整合工具:[vue cli3](https://cli.vuejs.org/zh/guide/)
 - UI框架：[ant-desing-vue](https://vue.ant.design/docs/vue/introduce-cn/)和[element-ui](https://element.eleme.cn/#/zh-CN/component/installation)
 - 网络请求：[axios](https://www.kancloud.cn/yunye/axios/234845)和[转换json工具:qs](https://www.npmjs.com/package/qs)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
