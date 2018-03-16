---
title: 目录结构
---


## Ark-Plugin 典型目录结构

```java
.
│
├── com
│   └── alipay
│       └── sofa
│           └── ark
│               └── plugin
│                   └── mark
│
├── META-INF
│   └── MANIFEST.MF
│
├── conf
│   └── export.index
└── lib
    ├── commons-lang3-3.3.1.jar
    ├── sample-plugin-1.0.0.jar
    └── sample-plugin-common-1.0.0.jar
```

## 目录说明
* `com/alipay/sofa/ark/plugin/mark` ：标记文件，标记该 Jar 包是 `sofa-ark-plugin-maven-plugin` 打包生成的 `Ark-Plugin` 文件。


* `META-INF/MANIFEST.MF` ：记录插件元信息，内容类似如下：
  ```java
  Manifest-Version: 1.0
  groupId: com.alipay.sofa
  artifactId: sample-plugin
  version: 1.0.0
  priority: 2000
  pluginName: sample-demo-plugin
  activator: com.alipay.sofa.ark.service.impl.SampleActivator
  import-packages: javax.servlet,org.springframework
  import-classes: com.alipay.sofa.rpc.config.ProviderConfig
  export-packages: com.alipay.sofa.ark.service
  export-classes: com.alipay.sofa.ark.common.CommonUtils,com.alipay.sofa
   .mock
  ```


* `conf/export.index` ：插件导出类索引文件；为了避免在运行时计算插件 `export-packages` 下面具体的导出类，在打包生成 `Ark-Plugin` 时，会生成插件所有导出类的索引文件，缩短 `Ark-Container` 解析配置时间。而导入类只需要读取 `META-INF/MANIFEST.MF` 配置信息，直接比较 `import-packages` 和 `import-classes` 前缀即可，无需生成索引文件。


* `lib/` : lib 目录存放插件工程依赖的普通 Jar 包，一般插件需要和其他插件或者业务有隔离需求的 Jar 包；插件配置的导出类都包含在这些 Jar 包中。
