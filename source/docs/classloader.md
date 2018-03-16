---
title: Ark 容器类加载机制
---

# Ark 容器类加载机制

Ark 容器中会管理插件和业务，整体的类加载机制可见如下图描述：

![undefined](https://gw.alipayobjects.com/zos/skylark/7dfdc66f-a70d-4ef0-9de3-92b72bf2caf7/2018/png/77f10035-a6c3-4bab-bff3-a2c9a986561f.png)


## Ark 插件类加载机制

每个 Ark 插件都拥有一个独立的类加载器，其类加载的顺序如下：

1. 如果是加载反射生成的字节码，那么会直接抛出 ClassNotFoundException，终止类加载。这一部分主要是来源于我们的工程实践，避免一定找不到的类查找路径过长
2. 查找已经被加载过的类
3. 查找 JDK 中的类，这一块主要包含两部分：第一部分是 ExtClassloader 负责加载的类；第二部分是 JDK 提供的类但从 ExtClassloader 中加载不到，但在本地运行时会被加入到 SystemClassloader 的 classpath 中，同时这些类可能会被放到一些三方工具包中，典型的如 tool.jar 中 `sun.tools.attach.BsdVirtualMachine`,这一部分也主要来源于我们的工程实践，避免类被加载超过一次，从而引发报错
4. 看类是否是由 Sofa Ark 提供的接口类，典型的如: `com.alipay.sofa.ark.spi.service.PluginActivator`, 如果是，则类会委托给 Ark 容器的类加载器加载
5. 看是否在插件的 import 中(包括 import-classes 和 import-package)， 如果在，则会委托给导出该类的插件类加载器加载
6. 在插件自身的 classpath 中加载
7. 如果上述都失败了，则会尝试在 SymtemClassloader 中加载，这一步主要是为了解决使用 agent 时的情形

如果上述的步骤都加载失败了，则抛出 ClassNotFoundException

## Ark 业务类加载机制

每个 Ark 业务都拥有一个独立的类加载器， Ark 业务类加载机制基本上与 Ark 插件保持一致，在上述的7步中，主要是第5步不一样：

对于 Ark 业务而言，并没有提供 import 的配置，而是认为默认 import 所有插件 export 出来的类；但为了一些特殊的业务场景，我们提供了 Deny-import 的配置让业务可以排除掉某些插件导出的类

# Ark 插件资源导出机制
在 Ark 插件中，当一个资源的名字以 `${pluginName}_sofa_ark_export_resource` 为开头时，会认为这个资源会 export 给其他 Ark 插件或者 Ark 业务使用，在加载资源时，会通过资源的名字解析出来 Ark 插件的名字，然后交给相应的 Ark 插件加载

