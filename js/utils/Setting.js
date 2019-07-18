import _ from 'lodash'

const Setting = {
	get: (key)=>{
		let objs = realm.objects("Setting").filtered("key='"+key+"'");
		if(!_.isEmpty(objs)){
			return objs[0].value;
		}else{
			return null;
		}
	},
	set: (key, val)=>{
		realm.write(()=>{
			realm.create("Setting", {key: key, value: val}, true);
		});
	}
}

export default Setting;