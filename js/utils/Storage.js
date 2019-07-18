
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

global.Keys = {
	MinerLoginData: 'minerLoginData',
	MinerUserInfo: 'minerUserInfo',
	MinerAccounts: 'minerAccounts',
	MinerSymbolMap: 'minerSymbolMap'
};

const _storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: require('./sync')
});

/* ========= setting ======= */
global.Setting = {
	get: async function(id){
		let res = await _storage.load({
			key: "setting",
			id: id,
			autoSync: false
		}).then(d=>{
			return d;
		}).catch(error=>{
			return null;
		});
		return res;
	},
	set: (id, val)=>{
		_storage.save({
			key: "setting",
			id: id,
			data: val,
			expires: null
		});
	}
};
