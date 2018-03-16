title: 产品概述
---
## 产品描述
SOFA Ark 是一款基于 Java 实现的轻量级类隔离加载容器；

SOFA Ark 为应用程序提供了类隔离和依赖包隔离的能力，基于 [Fat Jar](https://docs.spring.io/spring-boot/docs/current/reference/html/executable-jar.html#executable-jar-jar-file-structure) 技术，应用程序可以被打包成一个自包含可运行的 Fat Jar；应用既可以是一个简单的单模块 Java 应用也可以是一个 Spring Boot 应用。

应用运行在 SOFA Ark 容器之上，借助容器插件化隔离达到依赖包的隔离；容器管理插件初始化和应用启动，多应用、多插件相互隔离。

## 插件化隔离

![image.png | center | 1310x1178](https://gw.alipayobjects.com/zos/skylark/fab14537-aac7-43e5-b734-0df82abe927c/2018/png/c33669f7-271b-4300-a7b5-67d1e4a22f3d.png "")

一个应用程序会依赖不同坐标 Jar 包；一般而言，应用程序和依赖都交由同一个 ClassLoader 加载；随着业务的发展，应用程序变得越来越庞大，那么依赖冲突不可避免；如果能做到将某个或者某些依赖使用单独的 ClassLoader 加载，内部定义一套行之有效的类索引规则，那么就能有效解决这些依赖冲突的问题。而 SOFA Ark 的优势就在于定义了一套简单的类索引规则，并提供标准的容器插件（Ark Plugin）打包工具，供业务开发者按需隔离依赖，解决依赖冲突。当然，中间件内部也会提供基础组件的官方插件，如 Msgbroker、RPC、XTS 等业务所需的基础插件。此外，SOFA Ark 容器定义了标准的插件通信方式，为插件开发者相互协作提供便利。


