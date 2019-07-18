import {Alert} from 'react-native';
import _ from 'lodash';

let sync = {};

sync[Keys.MinerAccounts] = (params) => {
	let { id, resolve, reject } = params;
	Http.accountCount(function(resp){
        if(resp.success){
        	let accounts = resp.data.clientAssetAccountList;
            storage.save({
                key: Keys.MinerAccounts,
                data: accounts
            });
            resolve && resolve(accounts);
        }else{
    		Alert.alert('获取账户信息失败', resp.message, [{text: '确定'}]);
        }
    }, function(){
    	Alert.alert('获取账户信息失败', null, [{text: '确定'}]);
    });
}

sync[Keys.MinerSymbolMap] = (params) => {
    let { id, resolve, reject } = params;
    Http.getSymbolList(function(resp){
        if(resp.success){
            let accounts = resp.data;
            let map = {};
            _.forEach(resp.data, (d)=>{
                map[d.symbol] = d;
            });
            storage.save({
                key: Keys.MinerSymbolMap,
                data: map,
                defaultExpires: 1000 * 3600 * 0.5    //半小时过期
            });
            resolve && resolve(map);
        }else{
            resolve && resolve({});
        }
    }, function(){
        resolve && resolve({});
    });
}

module.exports = sync;