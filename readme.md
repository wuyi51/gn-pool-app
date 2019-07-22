### npm使用淘宝镜像，不要使用cnpm

### 开发工具
	推荐sublime，不建议使用android studio或xcode开发。android studio仅用于管理sdk即可。

### SDK
	android sdk、buildtool等版本号见 /android/app/build.gradle配置

### 初次安装依赖
	进入项目根目录（以下指令若未特别说明，均在根目录下运行，指令均在cmd内执行）
	执行指令 npm install

### 刷新依赖
	npm update

### 打包js文件到bundle
	android：
		react-native bundle --platform android --dev false --entry-file Index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

	ios：
		react-native bundle --platform ios --dev false --entry-file ./Index.js --bundle-output ./ios/bundle/index.ios.jsbundle --assets-dest ./ios/bundle

### 真机调试
	需先打包js文件到bundle，然后执行：
	android： 
		react-native run-android
	ios:
		react-native run-ios 或 使用xcode运行

	以上指令会执行编译、打包、安装到真机、启动调试服务端，耗时较长，在首次安装或原生部分有改动时使用即可
	安装需要usb连接真机，调试时需要真机和调式服务器（本地电脑）在同一wifi环境中
	若已安装测试版到真机，只需启动调试服务端，执行指令：

	react-native start

### 真机调试查看log
	
	react-native log-android


### 打包apk（android）
	注：打包前需先执行 react-native bundle 指令，生成最新的bundle文件

	进入android目录

	仅打包成apk：
	gradlew assembleRelease -x bundleReleaseJsAndAssets
	
	打包apk并安装到手机：
	gradlew installRelease -x bundleReleaseJsAndAssets


### Pushy 热更新
	发布应用：
		android: pushy uploadApk android/app/build/outputs/apk/app-release.apk
		ios: pushy uploadIpa <your-package.ipa>

	发布热更新版本：
		pushy bundle --platform <ios|android>
		e.g.: pushy bundle --platform android

	更多内容详见 git：react-native-pushy 文档

	元信息：
		如果需要热更新立即生效，需添加‘noDelay’字段， {"noDelay": true}；
		否则热更新会在APP下次启动是生效。

		注意：元信息是以字符串的形式存在，所以元信息json字符串的key一定要用双引号，否则热更新解析json会失败，导致元信息失效。

### 常用指令

	adb： 用于管理android手机的工具
	
	adb devices
	查看usb连接的android手机

### 三方组件的坑

	react-native-camera： 
		Could not find method google() for arguments [] on repository container
		fix：
			修改gradle/wrapper/gradle-wrapper.properties中distributionUrl为
			distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip

		Could not find method compileOnly() for arguments ...
		fix:
			Replace "compileOnly" with "provided" in /project/node_modules/react-native-camera/android/build.gradle

			Replace compile with implementation

	启动时报react-native-vector-icons组件相关错误
		解决方案：
		删除./node_modules/react-native/local-cli/core/__fixtures__/files/package.json文件

	react-native-crypto：
		Unable to resolve module `crypto` from `E:\gitRepository\workspace\rn-demo\node_modules\sjcl\sjcl.js`: Module does not exist in the module map
		fix: 
			重新执行一次 react-native-crypto 安装 （主要是 ./node_modules/.bin/rn-nodeify --hack --install 这一步）
			参考 http://npm.taobao.org/package/react-native-crypto



