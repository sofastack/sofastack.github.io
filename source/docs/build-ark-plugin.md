---
title: 构建
---

## 插件规范
标准的 `Ark-Plugin` 需要满足以下规范：
* 插件必须配置插件名，默认为 `${artifactId}` ；运行时，不允许存在同名的插件，可以认为它是 `Ark-Plugin` 的唯一 ID;
* 插件必须配置优先级，默认为1000，数字越低表示优先级越高；
* 插件最多配置一个入口类 `activator` ，它是容器启动插件的入口，统一实现 `com.alipay.sofa.ark.spi.service.PluginActivator` 接口类；优先级高的插件优先启动；
* 导入类支持 package 和 class 两个级别；导入类优先从其他的插件加载；
* 导出类支持 package 和 class 两个级别；优先级高的插件优先导出；
* 插件导出资源给其他插件使用时，必须以 `${pluginName}\_sofa\_ark\_export\_resource` 开头命名资源名


## Maven 插件
官方提供 `Maven` 插件 `sofa-ark-plugin-maven-plugin` 可以将普通的 Java 工程打包成标准格式的 `Ark-Plugin` ； `Maven` 插件坐标为：

```java
<plugin>
    <groupId>com.alipay.sofa</groupId>
    <artifactId>sofa-ark-plugin-maven-plugin</artifactId>
    <version>0.1.0</version>
</plugin>
```

## Goals
* `sofa-ark:ark-plugin` : 将普通的 Java 工程打包成标准格式的 `Ark-Plugin` 


## 构建
对于普通的 Java 工程，为了生成标准的 `Ark-Plugin` ，只需要三步操作：
* 在工程根目录中新建一个空模块，定义模块坐标，假设为：


```java
<dependency>
    <groupId>com.alipay.sofa</groupId>
    <artifactId>sofa-ark-plugin-demo</artifactId>
    <version>1.0.0</version>
</dependency>
```

* 在该模块的 pom.xml 文件中，添加工程其他模块和三方包依赖，并按下面的配置模板配置 `sofa-ark-plugin-maven-plugin` 插件；
* 在该模块目录或工程根目录中敲击 `mvn package` 命令，即可在配置的 `outputDirectory` 目录中生成 `ark-plugin-demo.ark.plugin` 插件文件；敲击 `mvn install` 命令，则会安装到本地 `Maven` 仓库；


## 发布
在工程主pom 中配置仓库地址，然后敲击 `mvn deploy` 命令，即可发布该 `Ark-Plugin` ;需要指出的是，发布的 `Ark-Plugin` 坐标会默认带上 `classifier = ark-plugin` ；如上述构建描述，会生成如下坐标的 `Ark-Plugin` :

```java
<dependency>
    <groupId>com.alipay.sofa</groupId>
    <artifactId>sofa-ark-plugin-demo</artifactId>
    <classifier>ark-plugin</classifier>
    <version>1.0.0</version>
</dependency>
```

其他应用通过该坐标即可引用该插件。

## 配置模板

`sofa-ark-plugin-maven-plugin` 插件配置模板如下：

```java
<plugins>
    <plugin>
        <groupId>com.alipay.sofa</groupId>
        <artifactId>sofa-ark-plugin-maven-plugin</artifactId>
        <version>0.1.0</version>
        <executions>
            <execution>
                <id>default-cli</id>
                <goals>
                    <goal>ark-plugin</goal>
                </goals>

                <configuration>
    
                    <!--是否把 ark plugin 安装到本地仓库，默认为true-->
                    <attach>true</attach>

                    <!-- ark plugin 最多仅能实现一个 Activator 接口 -->
                    <activator>com.alipay.sofa.ark.service.impl.SampleActivator</activator>

                    <!-- 配置优先级，数字越小，优先级越高，优先启动，优先导出类，默认1000 -->
                    <priority>2000</priority>

                    <!-- 配置插件的名字，务必配置对。比如 sofa-rpc 插件，则配置为 sofa-rpc; 默认为 ${artifactId} -->
                    <!-- 本示例中插件名字是 sample-plugin -->
                    <pluginName>${ark.plugin.name}</pluginName>

                    <!-- 配置导入类 -->
                    <imported>
                        <!-- 配置需要优先从其他 ark plugin 加载的 package -->
                        <packages>
                            <package>javax.servlet</package>
                            <package>org.springframework</package>
                        </packages>

                        <!-- 配置需要优先从其他 ark plugin 加载的 class -->
                        <classes>
                            <class>com.alipay.sofa.rpc.config.ProviderConfig</class>
                        </classes>
                    </imported>

                    <!-- 配置导出类 -->
                    <exported>
                        <!-- 配置包级别导出的类 -->
                        <packages>
                            <package>com.alipay.sofa.ark.service</package>
                        </packages>

                        <!-- 配置类级别导出类 -->
                        <classes>
                            <class>com.alipay.sofa.ark.common.CommonUtils</class>
                            <class>com.alipay.sofa.mock</class>
                        </classes>
                    </exported>

                    <!--打包插件时，排除指定的包依赖；格式为: ${groupId:artifactId} 或者 ${groupId:artifactId:classifier}-->
                    <excludes>
                        <exclude>org.apache.commons:commons-lang3</exclude>
                    </excludes>

                    <!--打包插件时，排除和指定 groupId 相同的包依赖-->
                    <excludeGroupIds>
                        <excludeGroupId>org.springframework</excludeGroupId>
                    </excludeGroupIds>

                    <!--打包插件时，排除和指定 artifactId 相同的包依赖-->
                    <excludeArtifactIds>
                        <excludeArtifactId>sofa-ark-spi</excludeArtifactId>
                    </excludeArtifactIds>

                    <!-- 指定打包的 ${pluginName}.ark.plugin 存放目录; 默认放在 ${project.build.directory} -->
                    <outputDirectory>./</outputDirectory>
                </configuration>
            </execution>

        </executions>
    </plugin>
</plugins>
```



