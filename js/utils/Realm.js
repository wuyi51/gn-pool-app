import Realm from 'realm';
import _ from 'lodash';

     
/*{
    "name":"Ethereum Foundation",
    "issuer":null,
    "address":"0x0000000000000000000000000000000000000000",
    "totalSupply":null,
    "unit":"ether",
    "symbol":"ETH",
    "decimals":18,
    "description":null,
    "balanceOf":"70a08231",
    "transfer":"a9059cbb",
    "icon_url":"https://whale-token-im.b0.upaiyun.com/app-production/tokens/icons/0x0000000000000000000000000000000000000000/eth.png",
    "mode":"system",
    "exchangeRate":{
        "CNY":"eth_cny_yunbi",
        "USD":"eth_usd_krak"
    },
    "gas":""
}*/
class Token extends Realm.Object {}
Token.schema = {
    name: 'Token',
    primaryKey: 'symbol',
    properties: {
        name: 'string',
        issuer: 'string',
        address: 'string',
        totalSupply: 'int',
        unit: 'string',
        symbol: 'string',
        decimals: 'int',
        description: 'string',
        balanceOf: 'string',
        transfer: 'string',
        icon_url: 'string',
        mode: 'string',
        exchangeRate: 'string',
        gas: 'int'
    },
};


class Asset extends Realm.Object {}
Asset.schema = {
    name: 'Asset',
    primaryKey: 'key',
    properties: {
        key:'string',//以钱包地址和合约地址为主键，中间以-隔开  eg：0x111-0x222
        address: 'string',
        symbol: 'string',
        icon: 'string',
        balance: 'string',
        price: 'string',
        unit: {type:'string', default: 'wei'},
        abi:'string',
        decimals:'int'
    }
};


class Wallet extends Realm.Object {}
Wallet.schema = {
    name: 'Wallet',
    primaryKey: 'address',
    properties: {
        name: 'string',
        password: {type:'string', default: ''}, //sha256 str
        passwordHint: {type:'string', default: ''},
        address: 'string',
        keystore: {type:'string', default: ''},
        mnemonic: {type:'string', default: ''},
        //privateKey: {type:'string', default: ''},
        publicKey: {type:'string', default: ''},
        ethBalance:  {type: 'int', default: 0},
        isPrivateKeyBacked: {type: 'bool', default: false},
        isKeyStoreBacked: {type: 'bool', default: false},
        isMnemonicBacked: {type: 'bool', default: false},
        isWatch: {type: 'bool', default: false},
        assets: {type: 'list', objectType: 'Asset'},
        imgUrl: {type: 'string', default: ''},
    }
};

// 用于存储设置
class Setting extends Realm.Object {}
Setting.schema = {
    name: 'Setting',
    primaryKey: 'key',
    properties: {
        key: 'string',
        value: 'string',
    },
};

// 用于存储地址本
class AddressBook extends Realm.Object {}
AddressBook.schema = {
    name: 'AddressBook',
    primaryKey: 'address',
    properties: {
        symbol: {type: 'string', default: 'Sinoc'},
        name: 'string',
        remark: 'string',
        address: 'string',
    }
};

// 用于存储本地交易记录
class LocaTransRecord extends Realm.Object {}
LocaTransRecord.schema = {
    name: 'LocaTransRecord',
    primaryKey: 'key',
    properties: {
        key: {type:'string'},//key=txHash+"-"+address
        txHash: {type:'string', default: ''},
        status: {type:'string', default: ''},
        blockNumber: {type:'string', default: ''},
        timeStamp: {type:'string', default: ''},
        from:{type:'string', default: ''},
        to:{type:'string', default: ''},
        value: {type:'string', default: ''},
        gasLimit: {type:'string', default: ''},
        gasUsed: {type:'string', default: ''},
        gasPrice:{type:'string', default: ''},
        fee: {type:'string', default: ''},
        nonce: {type:'string', default: ''},
        contractAddress: {type:'string', default: ''},
        inputData: {type:'string', default: ''},
        transactionIndex:{type:'string', default: ''},
        position: {type:'string', default: ''},
        formatTime:'int',
        address:{type:'string', default: ''}
    }
};

// 用于存储通知消息
class News extends Realm.Object {}
News.schema = {
    name: 'News',
    primaryKey: 'key',
    properties: {
        key: {type:'string', default: ''},
        title: {type:'string', default: ''},
        content: {type:'string', default: ''},
        timeStamp: {type:'string', default: ''},
        status:{type:'string', default: ''}//1：未读 2：已读
    }
};

// 用于存储聊天消息
class Message extends Realm.Object {}
Message.schema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
        id: {type:'string', default: ''},
        _realId: {type:'string', default: ''},  //由于主键不能修改，发送消息时主键记录的是_tempId，所以加这个字段记录服务端的真实id
        from: {type:'string', default: ''},
        to: {type:'string', default: ''},
        type: {type:'string', default: ''},
        content: {type:'string', default: ''},
        duration: {type:'int', default: 0},
        groupId: {type:'string', default: ''},
        status:{type:'string', default: ''},
        read: {type:'bool', default: false},
        date: {type:'int', default: 0},
        senderImgId: {type:'string', default: ''},
        senderName: {type:'string', default: ''},
        _filePath: {type:'string', default: ''},
        _sendStatus: {type:'string', default: ''},
        _tempId: {type:'string', default: ''},
    }
};
// 用于存储联系人
class Contacts extends Realm.Object {}
Contacts.schema = {
    name: 'Contacts',
    primaryKey: 'id',
    properties: {
        id: {type:'string', default: ''},
        name: {type:'string', default: ''},
        phone: {type:'string', default: ''},
        email: {type:'string', default: ''},
        sex: {type:'string', default: ''},
        headImgId: {type:'string', default: ''},
        _nameChar: {type: 'string', default: ''},   //名字首字母
        _lastMsg: {type:'string', default: ''},
        _updateDate: {type:'date'},
    }
};

class Group extends Realm.Object {}
Group.schema = {
    name: 'Group',
    primaryKey: 'id',
    properties: {
        id: {type:'string', default: ''},
        groupName: {type:'string', default: ''},
        groupImgId: {type:'string', default: ''},
        introduce: {type:'string', default: ''},
        owner: {type:'string', default: ''},
        status: {type:'string', default: ''},
        memberLimit: {type: 'int', default: 0},
        memberCount: {type: 'int', default: 0},
        createDate: {type:'int', default: 0},
        _nameChar: {type: 'string', default: ''},   //名字首字母
        _updateDate: {type:'date'},
        _sort: {type:'int', default: 0},
    }
};

class Chat extends Realm.Object {}
Chat.schema = {
    name: 'Chat',
    primaryKey: 'id',
    properties: {
        id: {type:'string', default: ''},
        isGroup: 'bool',
        name: {type:'string', default: ''},
        headImgId: {type:'string', default: ''},
        lastMsg: {type:'string', default: ''},
        lastDate: 'date',
        unreadCount: {type: 'int', default: 0}
    }
};

const _realm = new Realm({schema: [
    Setting,
    Token,
    Asset,
    Wallet,
    AddressBook,
    LocaTransRecord,
    News,
    Message,
    Contacts,
    Group,
    Chat
], schemaVersion: 13});

//Usage: realm.findOne("Wallet", {address: 'xxx'})
//original: boolean, 返回realm.objects的原始对象
Realm.prototype.findOne = function(schemaName, queryJson, original){
    if(!schemaName || _.isEmpty(queryJson)){
        return null;
    }
    let query = _.map(queryJson, (v, k)=>{
        let d = typeof v == 'string' ? [k, "=", "'", v, "'"] : [k, "=", v];
        return d.join("");
    }).join(" and ");
    let objs = realm.objects(schemaName).filtered(query);
    if(!_.isEmpty(objs) && objs.length == 1){
        return original ? objs : objs[0];
    }else{
        return null;
    }
}
//Usage: realm.removeOne("Wallet", {address: 'xxx'})
Realm.prototype.removeOne = function(schemaName, queryJson){
    let obj = _realm.findOne(schemaName, queryJson, true);
    if(obj){
        _realm.write(()=>{
            _realm.delete(obj);
        });
    }else{
        console.warn("Realm removeOne() error, query: ", queryJson);
    }
}

global.realm = _realm;