import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';

const DeviceUtil = {
	getDeviceInfo: function(){
		let info = {
			appName: Config.appName,
			appHotVersion: Config.version,
			appMainVersion: DeviceInfo.getVersion(),
			appBuildNum: DeviceInfo.getBuildNumber(),
			uniqueId: DeviceInfo.getUniqueID(),
			os: DeviceInfo.getSystemName(),
			osVersion: DeviceInfo.getSystemVersion(),
			deviceId: DeviceInfo.getDeviceId(),
			deviceBrand: DeviceInfo.getBrand(),
			deviceModel: DeviceInfo.getModel(),
			manufacturer: DeviceInfo.getManufacturer(),
			serialNumber: DeviceInfo.getSerialNumber(),
			country: DeviceInfo.getDeviceCountry(),
			locale: DeviceInfo.getDeviceLocale(),
			timezone: DeviceInfo.getTimezone(),
			carrier: DeviceInfo.getCarrier(),
			firstInstallTime: DeviceInfo.getFirstInstallTime(),
			lastUpdateTime: DeviceInfo.getLastUpdateTime(),
		};
		if(info.firstInstallTime > 0){
			info.firstInstallTime = new Date(info.firstInstallTime).format('yyyy-MM-dd HH:mm:ss');
		}
		if(info.lastUpdateTime > 0){
			info.lastUpdateTime = new Date(info.lastUpdateTime).format('yyyy-MM-dd HH:mm:ss');
		}
		console.log(info);
		return info;
	},
	//获取地区语言，可用于i18n的地区设置
	getLocal: function(){
		let local = DeviceInfo.getDeviceLocale();
		if(_.includes(local, "-")){
			local = local.split('-')[0];
		}
		return local;
	},
	//apk版本，e.g.: "v-1.0"
	getApkVer: function(){
		return DeviceInfo.getVersion();
	},
	//apk版本code， e.g: 2
	getApkVerNo: function(){
		return DeviceInfo.getBuildNumber();
	}


}

export default DeviceUtil;