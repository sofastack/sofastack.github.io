---
title: 目录格式
---

## Ark 包典型目录结构
下图是一个普通的 `Spring-Boot Web` 应用打包生成的 `Ark 包` 目录结构

```java
.
├── META-INF
│   └── MANIFEST.MF
├── SOFA-ARK
│   ├── biz
│   │   └── sofa-boot-demo-web-1.0-SNAPSHOT-sofa-ark-biz.jar
│   ├── container
│   │   ├── META-INF
│   │   │   └── MANIFEST.MF
│   │   ├── com
│   │   │   └── alipay
│   │   │       └── sofa
│   │   │           └── ark
│   │   └── lib
│   │       ├── aopalliance-1.0.jar
│   │       ├── guava-16.0.1.jar
│   │       ├── guice-4.0.jar
│   │       ├── guice-multibindings-4.0.jar
│   │       ├── javax.inject-1.jar
│   │       ├── log4j-1.2.17.jar
│   │       ├── slf4j-api-1.7.21.jar
│   │       ├── slf4j-log4j12-1.7.21.jar
│   │       ├── sofa-ark-archive-0.1.0.jar
│   │       ├── sofa-ark-common-0.1.0.jar
│   │       ├── sofa-ark-container-0.1.0.jar
│   │       ├── sofa-ark-exception-0.1.0.jar
│   │       ├── sofa-ark-spi-0.1.0.jar
│   │       └── sofa-common-tools-1.0.11.jar
│   └── plugin
│       └── sofa-ark-rpc-plugin-2.2.5-ark-plugin.jar
└── com
    └── alipay
        └── sofa
            └── ark
                ├── bootstrap
                │   ├── ArkLauncher.class
                │   ├── ClasspathLauncher$ClassPathArchive.class
                │   ├── ClasspathLauncher.class
                │   ├── ContainerClassLoader.class
                │   ├── EntryMethod.class
                │   ├── ExecutableArchiveLauncher.class
                │   ├── Launcher.class
                │   ├── MainMethodRunner.class
                │   └── SofaArkBootstrap.class
                ├── loader
                │   ├── DirectoryBizModuleArchive.class
                │   ├── ExecutableArkBizJar$1.class
                │   ├── ExecutableArkBizJar$2.class
                │   ├── ExecutableArkBizJar$3.class
                │   ├── ExecutableArkBizJar.class
                │   ├── JarBizModuleArchive$1.class
                │   ├── JarBizModuleArchive.class
                │   ├── JarContainerArchive$1.class
                │   ├── JarContainerArchive.class
                │   ├── JarPluginArchive$1.class
                │   ├── JarPluginArchive.class
                │   ├── archive
                │   ├── data
                │   └── jar
                └── spi
                    └── archive
```

## 目录说明
* <div data-type="alignment" data-value="justify" style="text-align:justify;"><div data-type="p"><code>META-INF/MANIFEST.MF</code> : 记录 <code>Ark 包</code> 元信息，其中最关键的信息是 <code>Ark 包</code> 的启动入口类 <code>Main-Class</code> ；文件内容类似如下：</div></div>

```java
Manifest-Version: 1.0
Implementation-Title: sofa-ark-all
Implementation-Version: 0.1.0
Archiver-Version: Plexus Archiver
Built-By: qilong.zql
Sofa-Ark-Version: 0.1.0
Specification-Title: sofa-ark-all
Implementation-Vendor-Id: com.alipay.sofa
Main-Class: com.alipay.sofa.ark.bootstrap.ArkLauncher
Ark-Container-Root: SOFA-ARK/container/
Created-By: Apache Maven 3.2.5
Build-Jdk: 1.8.0_101
Specification-Version: 0.1.0
ArkVersion: 0.1.0
Timestamp: 2018-03-13T18:13:06Z
```
可以看到，`Ark 包` 启动入口类是 `com.alipay.sofa.ark.bootstrap.ArkLauncher`

* `com/alipay/sofa/ark/\*` : 存放使用 `java -jar` 命令启动 `Ark 包`  所必需的引导类；


* `SOFA-ARK/container` : 存放 `ark-container` 容器依赖包，实际上是如下依赖包的解压目录；

```java
<dependency>
    <groupId>com.alipay.sofa</groupId>
    <artifactId>sofa-ark-all</artifactId>
    <version>0.1.0</version>
</dependency>
```

* `SOFA-ARK/biz` : 存放所有的 `Ark-Biz` 包，因为 demo 工程中没有依赖其他的 `Ark-Biz` , 因此只有自身的 `Ark-Biz`


* `SOFA-ARK/plugin` : 存放应用依赖的所有 `Ark-Plugin` 包，demo 工程只依赖一个 rpc `Ark-Plugin`


