import _ from 'lodash'
import RNFetchBlob from 'rn-fetch-blob'
let dirs = RNFetchBlob.fs.dirs;

function _fetchFriends(beforeFun, afterFun, succFun, errFun){
    beforeFun && beforeFun();
    Http.getUserAllFriend(null, (res)=>{
        if(res.success){
            let list = res.data || [];
            _.forEach(list, (u)=>{
                u._nameChar = PinyinUtil.getOneLetter(u.name);
            });
            list = _.sortBy(list, (u)=>{
                return u._nameChar || u.name;
            })
            _syncRealmContact(list);
            succFun && succFun(list);
        } else {
        	errFun && errFun();
        }
        afterFun && afterFun();
    }, ()=>{
        errFun && errFun();
        afterFun && afterFun();
    });
}

function _syncRealmContact(users){
    let cs = realm.objects('Contacts');
    let olds = _.filter(cs, (c)=>{
         return _.findIndex(users, (u)=>{return u.id == c.id;}) == -1;
    });
    if(!_.isEmpty(olds)){
        _.forEach(olds, (old)=>{
            let filter = 'from="{ID}" || to="{ID}"'.replace(/{ID}/g, old.id);
            let msgList = realm.objects('Message').filtered(filter);
            realm.write(()=>{
                realm.delete(msgList);
            })
            realm.removeOne("Chat", { id: old.id });
        });
    }
    realm.write(()=>{
        !_.isEmpty(olds) && realm.delete(olds);
        _.forEach(users, (user)=>{
            user._updateDate = new Date();
            realm.create("Contacts", user, true);
        });
    });
}

const _fetchGroups = (beforeFun, afterFun, succFun, errFun)=>{
    beforeFun && beforeFun();
    Http.getUserGroups(null, (res)=>{
        errFun && errFun();
        if(res.success){
            let list = res.data || [];
            _.forEach(list, (u)=>{
                u._nameChar = PinyinUtil.getOneLetter(u.groupName);
            });
            list = _.sortBy(list, (u)=>{
                return u._nameChar || u.groupName;
            })
            _syncRealmGroup(list);
            succFun && succFun(list);
        } else {
        	errFun && errFun();
        }
        afterFun && afterFun();
    }, ()=>{
        errFun && errFun();
    });
}
_syncRealmGroup = (groups)=>{
    let cs = realm.objects('Group');
    let olds = _.filter(cs, (c)=>{
         return _.findIndex(groups, (u)=>{return u.id == c.id;}) == -1;
    });
    if(!_.isEmpty(olds)){
        _.forEach(olds, (old)=>{
            let filter = 'groupId="{ID}"'.replace("{ID}", old.id);
            let msgList = realm.objects('Message').filtered(filter);
            realm.write(()=>{
                realm.delete(msgList);
            })
            realm.removeOne("Chat", { id: old.id });
        });
    }
    realm.write(()=>{
        !_.isEmpty(olds) && realm.delete(olds);
        _.forEach(groups, (group)=>{
            group._updateDate = new Date();
            group._sort = group.owner == WorldManager.currUser.id ? 1 : 0
            realm.create("Group", group, true);
        });
    });
}
_uploadFile = (uri, succFun, errFun)=>{
    if(_.isEmpty(uri)){
        errFun && errFun();
        return;
    }
    Http.uploadImg(uri, (res)=>{
        if(res.success){
            succFun && succFun(res.file);
        } else {
            errFun && errFun();
        }
    }, (err)=>{
        errFun && errFun();
    });
}
_downloadFile = (fileName, succFun, errFun)=>{
    let url = Http.getImg(fileName);
    if(!url){
        return;
    }
    RNFetchBlob.config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache : true,
        path : dirs.DocumentDir + '/' + fileName
    }).fetch('GET', url, {
        //Authorization : 'Bearer access-token...',
        //some headers ..
    }).then((res) => {
        // the temp file path
        let path = res.path();
        if(!_.startsWith(path, "file://")){
            path = "file://" + path;
        }
        succFun && succFun(path);
    }).catch((err) => {
        // error handling ..
        console.error(err);
        errFun && errFun();
    });
}


export default {
	syncContact: _fetchFriends,
	syncGroup: _fetchGroups,
    uploadFile: _uploadFile,
    downloadFile: _downloadFile
}


