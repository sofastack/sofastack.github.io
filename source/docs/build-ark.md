---
title: 构建
---

## Maven 插件
官方提供 `Maven` 插件 `sofa-ark-maven-plugin` 可以将普通 Java 工程或者 Spring Boot 工程打包成标准格式 `Ark 包` ；使用 [Fat Jar](https://docs.spring.io/spring-boot/docs/current/reference/html/executable-jar.html#executable-jar-jar-file-structure) 技术，使用 `java -jar` 命令可以直接启动 `Ark 包` 。 `Maven` 插件坐标为：

```java
 <plugin>
    <groupId>com.alipay.sofa</groupId>
    <artifactId>sofa-ark-maven-plugin</artifactId>
    <version>0.1.0</version>
</plugin>
```

## Goals
* `sofa-ark:repackage` : 将当前工程打包成可执行的 `Ark 包` 和 `Ark-Biz` ; 默认情况下只会安装 `Ark 包` 到本地仓库，如果希望安装 `Ark-Biz` 到本地仓库或者希望发布 `Ark-Biz` 被其他应用依赖，可以通过增加 `attach = true` 配置，默认为 `false`  

## 构建
以 Spring Boot Web 工程为例，为了生成标准的 `Ark包` ，只需要两步操作
* 参考下面的配置模板，在Web 模块的 pom.xml 文件中配置 `sofa-ark-boot-maven-plugin` 插件；
* 在 Web 模块目录或应用根目录中敲击 `mvn pacakge` 命令，即可在配置的 `outputDirectory` 目录中生成 `Ark 包` 和 `Ark-Biz` 文件；默认命名分别为 Web 模块 `${artifactId}` 和 `${artifactId}-ark-biz` ; 也可以分别通过 `arkClassifier` 和 `bizClassifier` 设置 classifier；敲击 `mvn install` 命令，则会安装 `Ark 包` 到本地仓库；
  
## 发布
在工程主 pom 中配置仓库地址，然后敲击 `mvn deploy`命令，即可发布该 `Ark 包`；特别强调的是，如果希望同时发布 `Ark-Biz` ，则需要额外配置 `attach=true` ；此外 `Ark-Biz` 发布包默认会带上 `classifier = ark-biz` ；

## 配置模板
`sofa-ark-maven-plugin`插件配置模板如下：

```java
<plugins>
    <plugin>
        <groupId>com.alipay.sofa</groupId>
        <artifactId>sofa-ark-maven-plugin</artifactId>
        <version>0.1.0</version>
        <executions>
            <execution>
                <id>default-cli</id>
                <goals>
                    <goal>repackage</goal>
                </goals>
                <configuration>

                    <outputDirectory>../target</outputDirectory>

                    <!--生成 ark 包名称，默认为 ${artifactId}-->
                    <finalName>demo-ark</finalName>

                    <!--是否跳过执行 goal:repackage, 默认为false-->
                    <skip>false</skip>

                    <!--是否安装 ark biz 到本地仓库, 默认为false-->
                    <attach>true</attach>

                    <!--设置 ark 包的 classifier，默认为空-->
                    <arkClassifier>ark-classifier</arkClassifier>

                    <!--设置 ark biz 的 classifier，默认为 ark-biz-->
                    <bizClassifier>ark-biz-classifier</bizClassifier>

                    <!--打包 ark biz 时，排除指定的包依赖；格式为: ${groupId:artifactId} 或者 ${groupId:artifactId:classifier}-->
                    <excludes>
                        <exclude>org.apache.commons:commons-lang3</exclude>
                    </excludes>

                    <!--打包 ark biz 时，排除和指定 groupId 相同的包依赖-->
                    <excludeGroupIds>
                        <excludeGroupId>org.springframework</excludeGroupId>
                    </excludeGroupIds>

                    <!--打包 ark biz 时，排除和指定 artifactId 相同的包依赖-->
                    <excludeArtifactIds>
                        <excludeArtifactId>sofa-ark-spi</excludeArtifactId>
                    </excludeArtifactIds>

                </configuration>
            </execution>
        </executions>
    </plugin>
</plugins>
```
