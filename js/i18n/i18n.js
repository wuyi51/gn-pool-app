import I18n from 'react-native-i18n';
import Setting from '../utils/Setting'
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';

I18n.fallbacks = true;

I18n.translations = {
    'zh': require('./locales/zh'),
    'en': require('./locales/en'),
};
//未设置语言时，默认取系统语言，不能识别系统语言时取Config配置，再没有指定为zh
if(_.isEmpty(Setting.get('language'))) {
    /*let lang = DeviceUtil.getLocal();
    if(!I18n.translations[lang]){
        lang = Config.language || 'en';
    }*/
    let lang = Config.language || 'en';
    Setting.set("language", lang);
}
I18n.locale = Setting.get('language');


console.log("I18n.locale = " + I18n.locale);

/*
loadLocale();

loadCurrentUnit();

export function loadLocale() {
    let settings = realm.objects('Setting');
    if(settings.length > 0){
        for(let index = 0; index < settings.length; index++) {
            if(settings[index].key === Setting.KEY_LANGUAGE){
                I18n.locale = settings[index].value;
                console.log(I18n.locale);
                return;
            }
        }
    }

    realm.write(() => {
        realm.create('Setting', {key: Setting.KEY_LANGUAGE , value: Setting.VALUE_LANGUAGE_CHINESE });
    });
    I18n.locale = 'zh';
}

export function loadCurrentUnit() {
    let settings = realm.objects('Setting');
    if(settings.length > 0){
        for(let index = 0; index < settings.length; index++) {
            if(settings[index].key === Setting.KEK_CURRENT_UNIT){
                return;
            }
        }
    }

    realm.write(() => {
        realm.create('Setting', {key: Setting.KEK_CURRENT_UNIT , value: Setting.VALUE_CURRENT_UNIT_CNY });
    });
}*/

//export default I18n;
global.I18n = I18n;

