/*
 * @Description: 通用的一些函数，比如判断是否为空对象这些
 * @Author: zzglovecoding
 * @Date: 2021-06-08 20:39:59
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-14 20:06:34
 */

function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number';
}

export function isFormData(obj) {
    return (typeof FormData !== 'undefined') && (obj instanceof FormData);
}

export function isFile(obj) {
    return _getClass(obj).toLowerCase() === 'file';
}

export function isBlob(obj) {
    return _getClass(obj).toLowerCase() === 'blob';
}

export function isFunction(obj) {
    return _getClass(obj).toLowerCase() === 'function';
}

export function isStream(obj) {
    return isObject(obj) && isFunction(obj.pipe);
}

export function isURLSearchParams(obj) {
    return typeof URLSearchParams !== 'undefined' && obj instanceof URLSearchParams;
}

export function isIE() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('compatible') > -1 &&
        userAgent.indexOf('MSIE') > -1) {
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false;

    if (obj === null || obj === undefined) { // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        var hasProp = false;
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    } else if (isNumber(obj) && isNaN(obj)) {
        empty = true;
    }
    return empty;
}

/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}

/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中全是空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}
// TODO: 吸附于辅助线的函数
export function fixToSupLine() {

}

export function uuid() {
    return Math.floor(Math.random() * +new Date());
}

export function ellipsisWord(str, len) {
    if (str && str.length > len) {
        return str.substring(0, len) + '..';
    }

    return str;
}