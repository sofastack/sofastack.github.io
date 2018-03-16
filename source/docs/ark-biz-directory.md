---
title: 目录格式
---

## Ark-Biz 典型目录结构

```java
.
├── META-INF
│   ├── MANIFEST.MF
│   ├── maven
│   │   └── me.qlong.tech
│   │       └── sofa-boot-demo3-web
│   │           ├── pom.properties
│   │           └── pom.xml
│   └── sofa-boot-demo3
│       └── sofa-boot-demo3-web.xml
├── com
│   └── alipay
│       └── sofa
│           └── ark
│               └── biz
│                   └── mark
├── config
│   ├── application-dev.properties
│   ├── application-test.properties
│   └── application.properties
├── lib
│   ├── spring-beans-4.3.4.RELEASE.jar
│   ├── spring-boot-1.4.2.RELEASE.jar
│   ├── spring-boot-autoconfigure-1.4.2.RELEASE.jar
│   ├── spring-boot-devtools-1.4.2.RELEASE.jar
│   ├── spring-boot-starter-1.4.2.RELEASE.jar
│   ├── spring-boot-starter-logging-1.4.2.RELEASE.jar
│   ├── spring-boot-starter-tomcat-1.4.2.RELEASE.jar
│   ├── spring-boot-starter-web-1.4.2.RELEASE.jar
│   ├── spring-context-4.3.4.RELEASE.jar
│   ├── spring-core-4.3.4.RELEASE.jar
│   ├── spring-expression-4.3.4.RELEASE.jar
│   ├── spring-web-4.3.4.RELEASE.jar
│   ├── ...
│   ├── ...
│   ├── ...
│   └── velocity-1.7.jar
├── logback-spring.xml
├── me
│   └── qlong
│       └── tech
│           └── SOFABootWebSpringApplication.class
└── static
    └── index.html
```

## 目录说明
<div data-type="alignment" data-value="justify" style="text-align:justify;"><div data-type="p">普通的 Java 工程或者 Spring Boot Core/Web 工程都可以打包成 <code>Ark-Biz</code> ；因此 <code>Ark-Biz</code> 没有固定的目录格式，它只是在原来的包结构基础上新增两个目录/文件：</div></div>

* <div data-type="alignment" data-value="justify" style="text-align:justify;"><div data-type="p"><code>com/alipay/sofa/ark/biz/mark</code> : 标记文件，标记该 Jar 包是 <code>sofa-ark-maven-plugin</code> 打包生成的 <code>Ark-Biz</code> 文件。</div></div>


* `lib/` : lib 目录存放工程应用的三方依赖，


