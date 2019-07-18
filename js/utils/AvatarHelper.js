

export function getAvatar(address) {
    switch (address.toLowerCase().charAt(address.length - 1)){
        case '1':
        case '2':
            return require('../../res/image/1.png');
        case '3':
        case '4':
            return require('../../res/image/2.png');
        case '5':
        case '6':
            return require('../../res/image/3.png');
        case '7':
        case '8':
            return require('../../res/image/4.png');
        case '9':
        case '0':
            return require('../../res/image/5.png');
        case 'a':
        case 'b':
            return require('../../res/image/6.png');
        case 'c':
        case 'd':
            return require('../../res/image/7.png');
        case 'e':
        case 'f':
        default:
            return require('../../res/image/8.png');
    }
}