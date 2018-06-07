# webpack-test
#### Webpack 搭建  
`npm run dev-hot`启动热重载开发模式  
`npm run dev`开发构建  
`npm run test`测试环境构建  
`npm run prod`生产构建（压缩所有文件，需要配置输出目录与静态资源域名）  

#### 创建文件  
`node create.js a`在对应的目录下创建**a.html** , **a.js** , **a.scss**  
`node create.js a vue`在 **/src/vue** 目录下创建 **a.vue** 单文件组件  
`node create.js a mock`在 **/src/mocker** 目录下创建 **a.js** 的Mock文件  

#### 目录结构  

###### 开发文件  
`/view/*.html` HTML文件  
`/src/scss/**/*.scss` Sass文件  
`/src/js/**/*.js` JS文件  
`/src/images/**/*.[png|jpg|jpeg|gif]` 图像文件   
`/src/vue/**/*.vue` Vue单文件组件   
`/src/mocker/**/*.js` Mock.js模拟数据文件   

###### 模版文件  
`/create.js` 创建开发文件脚本  
`/templates/*.js` 创建开发文件所需的模版  

###### Webpack构建配置文件
`/webpack.config.js` 基础配置文件  
`/webpack.dev.js` 开发环境配置  
`/config/test.config.js` 测试环境静态资源仓库与域名配置  
`/webpack.test.js` 测试环境配置  
`/config/prod.config.js` 生产环境静态资源仓库与域名配置  
`/webpack.prod.js` 生产环境配置  

###### 其他配置  
`/.babelrc` **babel**配置  
`/.postcssrc` **postcss**配置  