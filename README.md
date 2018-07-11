# Nongye

## Setup
[Referrence](https://facebook.github.io/react-native/docs/getting-started.html)

### First of All
- `cp .env.example .env`
- edit the `.env` file

### Android
- Install Android Studio and related components
- Configure env variables
- Install JDK 8
- run an android simulator
- `npm install`
- `npm run start`
- `npm run android`

### iOS
- Install XCode and Command Line Tool
- `npm install`
- `npm run start`
- `npm run ios`

### Pit(s)
- `npm run android` failed.
  1. gradle permission: [https://github.com/facebook/react-native/issues/8868](https://github.com/facebook/react-native/issues/8868)
  2. Error:Configuration with name 'default' not found.: [https://blog.csdn.net/s_521_h/article/details/77711875](https://blog.csdn.net/s_521_h/article/details/77711875)
- `npm run ios` failed. `CFBundleIdentifier, Does Not Exist #14969`. [https://github.com/facebook/react-native/issues/14969](https://github.com/facebook/react-native/issues/14969)

### Make rtsp work (for Android, and only work on real device)
- https://github.com/ghondar/react-native-vlc-player
- testurl for this demo: [rtsp://admin:wnvxiaoti5566123@10.17.5.99:554/Streaming/Channels/101](rtsp://admin:wnvxiaoti5566123@10.17.5.99:554/Streaming/Channels/101)


### .env

下面是一个合适的 `env` 文件的格式，编译之前，uncomment 需要的 `API_BASE_URL` 行，再执行 `npm run build:android`

```
# Development 开发环境
# API_BASE_URL=

# Test 测试环境
# API_BASE_URL=

# Pre-Prod 预发布环境
# API_BASE_URL=

# Production 生产环境
# API_BASE_URL=
```

### ./scripts

#### `npm run upload` 是自动上传 android apk 文件到蒲公英的命令。

- 会自动从 `.env` 文件中找到没有 comment 的 `API_BASE_URL` 的上面一行文本作为环境说明
- `npm run upload <number>`，会从 `git log --oneline` 中取出最近的几条 commit 信息作为更新说明，默认为 1

#### `npm run iconfont <iconfont.css>` 转换为 iconfont 为 react-native-vector-icon 脚本

- `iconfont.css` 指定下载下来的 iconfont.css 文件路径
- 不要忘记更新 `android` `ios` 目录下的 ttf 文件
=============
