## 部署 ##

* <b>git安装,node(>6.0.0)安装
<br>
* <b>仓库拉下来后，首先执行npm install，生成测试执行需要的组件
<br>
* <b>执行npm run test 执行测试用例，执行npm run clean清空test文件目录.

## 开发相关: ##

*	<b>项目开发基于node环境，使用git做版本控制
<br>
*	<b>开发工具</b>
	* 此项目使用mocha + shouldjs ＋ supertest编写测试用例
<br>
* <b>主要组件: </b>
	* 使用邮件发送系统为nodemailer,
	* 使用自动化管理工具gulp,
	* 使用npm自带script执行命令行命令,npm管理相关插件,
	* 使用mysql组件做数据库连接
<br>

## 3.项目结构: ##
*	<b>api,db,describe</b>：
	为核心的开发框架，分别编写api http请求函数,db数据库查询函数,测试mocha脚本
<br>
*	<b>封装工具tools:</b>
        用于编写封装函数使用。
<br>
*	 <b>boots:</b>
        启动项，里面存放的主要是生成可执行测试用例和gulp相关的脚本.
<br>
*	 <b>sample:</b>
        用于存放测试使用的文件或数据
<br>
*	<b>test,public,reports分别为项目执行npm run test后生成的文件夹:</b>
	* test为可执行测试脚本文件夹
	* public为发布测试报告的文件夹
	* reports为存放测试报告的文件夹，文件存放准侧根据测试报告生生成时间，生成对应的存放文件目录.
<br>
*	<b>others</b>
	该文件夹下请存放不是以该开发框架编写的可执行测试用例，文件存放各自请以文件夹的方式存放，方便区分开发者.

<br>
<br>
<br>
<b>docs written by Wlm</b>
