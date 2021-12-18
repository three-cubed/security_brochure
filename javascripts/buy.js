// Obfuscated!

const _0x3242b9 = _0xc051;
(function (_0x1601eb, _0x50db69) {
    const _0xb1b40f = _0xc051;
    const _0x2cf5b7 = _0x1601eb();
    while (!![]) {
        try {
            const _0xa2dc1 = parseInt(_0xb1b40f(0x1be)) / 0x1 * (parseInt(_0xb1b40f(0x17d)) / 0x2) + -parseInt(_0xb1b40f(0x17e)) / 0x3 + parseInt(_0xb1b40f(0x172)) / 0x4 * (-parseInt(_0xb1b40f(0x196)) / 0x5) + parseInt(_0xb1b40f(0x18c)) / 0x6 * (-parseInt(_0xb1b40f(0x18e)) / 0x7) + -parseInt(_0xb1b40f(0x180)) / 0x8 + -parseInt(_0xb1b40f(0x1ab)) / 0x9 * (-parseInt(_0xb1b40f(0x198)) / 0xa) + -parseInt(_0xb1b40f(0x1b4)) / 0xb * (-parseInt(_0xb1b40f(0x178)) / 0xc);
            if (_0xa2dc1 === _0x50db69) {
                break;
            } else {
                _0x2cf5b7['push'](_0x2cf5b7['shift']());
            }
        } catch (_0x50e287) {
            _0x2cf5b7['push'](_0x2cf5b7['shift']());
        }
    }
}(_0xc97c, 0x353a9));
function _0xc051(_0x335311, _0x2f3e79) {
    const _0xc97c5e = _0xc97c();
    _0xc051 = function (_0xc0513f, _0x1d7fc9) {
        _0xc0513f = _0xc0513f - 0x172;
        let _0x1eb663 = _0xc97c5e[_0xc0513f];
        return _0x1eb663;
    };
    return _0xc051(_0x335311, _0x2f3e79);
}
if (document[_0x3242b9(0x18f)] === 'loading') {
    document[_0x3242b9(0x177)](_0x3242b9(0x1bd), () => {
        const _0x22d458 = _0x3242b9;
        console[_0x22d458(0x1ae)](_0x22d458(0x1c9));
        addPrices();
        addEventListeners();
    });
} else {
    console[_0x3242b9(0x1ae)](_0x3242b9(0x1c8));
    addPrices();
    addEventListeners();
}
const removeBtnText = _0x3242b9(0x1c3);
function addPrices() {
    const _0x13f279 = _0x3242b9;
    const _0x14f039 = document[_0x13f279(0x1c4)](_0x13f279(0x19e));
    for (let _0x271696 = 0x0; _0x271696 < _0x14f039['length']; _0x271696++) {
        _0x14f039[_0x271696][_0x13f279(0x1af)] = '£&thinsp;' + formatNumberToString(_0x14f039[_0x271696]['dataset'][_0x13f279(0x1b6)]);
    }
}
function addEventListeners() {
    const _0x14cbfd = _0x3242b9;
    document[_0x14cbfd(0x1c4)](_0x14cbfd(0x17c))[0x0][_0x14cbfd(0x177)](_0x14cbfd(0x181), executePurchase);
    const _0x2a4c6e = document['getElementsByClassName']('groupTitleSpan');
    for (let _0x2aa68a = 0x0; _0x2aa68a < _0x2a4c6e[_0x14cbfd(0x1b7)]; _0x2aa68a++) {
        const _0x59c68b = _0x2a4c6e[_0x2aa68a][_0x14cbfd(0x1a0)]['id'];
        _0x2a4c6e[_0x2aa68a][_0x14cbfd(0x177)](_0x14cbfd(0x181), () => {
            changeDivVisibility(_0x59c68b);
        });
    }
    ;
}
function addToBasket(_0x3bc504) {
    const _0x533ede = _0x3242b9;
    const _0x1e9b17 = document[_0x533ede(0x1a6)](_0x533ede(0x1a1));
    _0x1e9b17['classList']['add']('basket-row');
    _0x1e9b17[_0x533ede(0x19c)][_0x533ede(0x19a)] = _0x3bc504['target'][_0x533ede(0x1a0)][_0x533ede(0x1a0)][_0x533ede(0x19c)][_0x533ede(0x19a)];
    _0x1e9b17[_0x533ede(0x19c)][_0x533ede(0x1b6)] = _0x3bc504[_0x533ede(0x175)][_0x533ede(0x1a0)][_0x533ede(0x1a0)][_0x533ede(0x19c)]['buyablePrice'];
    const _0x56bac5 = document[_0x533ede(0x1c4)](_0x533ede(0x195))[0x0];
    const _0x547049 = _0x56bac5[_0x533ede(0x1c4)]('basket-row');
    for (let _0x308a8f = 0x0; _0x308a8f < _0x547049[_0x533ede(0x1b7)]; _0x308a8f++) {
        if (_0x547049[_0x308a8f]['dataset'][_0x533ede(0x19a)] === _0x3bc504[_0x533ede(0x175)][_0x533ede(0x1a0)][_0x533ede(0x1a0)][_0x533ede(0x19c)]['buyableId']) {
            alert('This\x20has\x20already\x20been\x20put\x20in\x20the\x20basket!\x20If\x20you\x20want\x20more,\x20increase\x20the\x20stated\x20quantity.');
            return;
        }
    }
    const _0x2953c4 = _0x533ede(0x1a5) + _0x3bc504['target'][_0x533ede(0x1a0)][_0x533ede(0x1a0)][_0x533ede(0x193)](_0x533ede(0x1c7))[0x0][_0x533ede(0x1a7)] + _0x533ede(0x1a2) + _0x3bc504[_0x533ede(0x175)]['parentElement'][_0x533ede(0x1a0)][_0x533ede(0x19c)][_0x533ede(0x18d)] + _0x533ede(0x1b3) + formatNumberToString(parseFloat(_0x3bc504[_0x533ede(0x175)][_0x533ede(0x1a0)][_0x533ede(0x1a0)][_0x533ede(0x19c)][_0x533ede(0x1b6)])) + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22total-this-buyable\x20basket-column\x22></span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn\x20btn-remove\x22\x20type=\x22button\x22>' + removeBtnText + _0x533ede(0x199);
    _0x1e9b17[_0x533ede(0x1af)] = _0x2953c4;
    _0x56bac5[_0x533ede(0x1c2)](_0x1e9b17);
    _0x1e9b17[_0x533ede(0x1c4)](_0x533ede(0x1b8))[0x0][_0x533ede(0x177)](_0x533ede(0x181), removeBuyableFromBasket);
    _0x1e9b17[_0x533ede(0x1c4)](_0x533ede(0x1b5))[0x0][_0x533ede(0x177)](_0x533ede(0x1ac), checkValidQuantity);
    _0x1e9b17[_0x533ede(0x1c4)](_0x533ede(0x1b5))[0x0][_0x533ede(0x177)](_0x533ede(0x1b1), checkValidQuantity);
    updateTotals();
    window[_0x533ede(0x1c5)](0x0, document[_0x533ede(0x190)]['scrollHeight']);
}
function removeBuyableFromBasket(_0xb45417) {
    const _0x1f1f00 = _0x3242b9;
    _0xb45417[_0x1f1f00(0x175)][_0x1f1f00(0x1a0)][_0x1f1f00(0x18a)]();
    updateTotals();
}
function checkValidQuantity(_0xf93ec4) {
    const _0x439dea = _0x3242b9;
    if (isNaN(_0xf93ec4[_0x439dea(0x175)][_0x439dea(0x19d)])) {
        alert('Error:\x20Ensure\x20you\x20use\x20a\x20valid\x20numerical\x20quantity!\x20If\x20you\x20no\x20longer\x20want\x20this,\x20simply\x20click\x20\x22' + removeBtnText + '\x22.');
    } else if (_0xf93ec4['target'][_0x439dea(0x19d)] < 0x1) {
        alert(_0x439dea(0x189) + removeBtnText + '\x22.');
        _0xf93ec4[_0x439dea(0x175)][_0x439dea(0x19d)] = 0x1;
    } else if (!Number[_0x439dea(0x1aa)](parseFloat(_0xf93ec4['target']['value']))) {
        alert('Your\x20order\x20quantity\x20must\x20be\x20a\x20whole\x20number');
        _0xf93ec4[_0x439dea(0x175)][_0x439dea(0x19d)] = Math[_0x439dea(0x173)](_0xf93ec4[_0x439dea(0x175)]['value']);
    }
    updateTotals();
}
function _0xc97c() {
    const _0x262f9c = [
        'VisibilityDiv',
        '&hairsp;&times;',
        'message',
        'toggle',
        'currency',
        'basket-row',
        'invisible',
        'You\x20cannot\x20order\x20less\x20than\x20one!\x20If\x20you\x20no\x20longer\x20want\x20this,\x20simply\x20click\x20\x22',
        'remove',
        'error',
        '12MdOCVh',
        'buyableName',
        '99477LwVOIF',
        'readyState',
        'body',
        'stringify',
        'json',
        'getElementsByTagName',
        'getElementById',
        'basket-buyables-div',
        '85835XRAejq',
        'location',
        '10znqwcj',
        '</button>',
        'buyableId',
        'abort',
        'dataset',
        'value',
        'buyablePriceSpan',
        'amountToProcess',
        'parentElement',
        'div',
        '\x22\x20width=\x2224\x22\x20height=\x2224\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22basket-column\x20centredText\x20centredContent\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22basket-buyable-title\x22>',
        'push',
        'uniqueTransactionReference',
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22basket-column\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20class=\x22basket-buyable-image\x22\x20src=\x22',
        'createElement',
        'src',
        'toLocaleString',
        'total-this-buyable',
        'isInteger',
        '3511251vorskS',
        'change',
        'application/json',
        'log',
        'innerHTML',
        '/toBuy/confirm/',
        'keyup',
        'setSuccessFunction',
        '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22buyable-quantity\x20basket-column\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20class=\x22buyable-quantity-input\x22\x20type=\x22number\x22\x20value=\x221\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22buyable-price\x20basket-column\x22>@\x20£\x20',
        '77mtpGGQ',
        'buyable-quantity-input',
        'buyablePrice',
        'length',
        'btn-remove',
        'contains',
        '/toBuy/postReceipt',
        '&#9662;',
        'then',
        'DOMContentLoaded',
        '59VZrGNm',
        'innerText',
        'basket-total-price',
        'href',
        'append',
        'Remove\x20from\x20basket',
        'getElementsByClassName',
        'scrollTo',
        'classList',
        'Img',
        'Loaded\x20(instantaneous)',
        'Loaded\x20(waited)',
        '12jiYjzN',
        'floor',
        'totalToCharge',
        'target',
        'open',
        'addEventListener',
        '299220PODVeb',
        'toString',
        'catch',
        'round',
        'btn-purchase',
        '5222DukBzq',
        '332748mRTWyD',
        'OpenCloseIcon',
        '2478952pkVoVx',
        'click'
    ];
    _0xc97c = function () {
        return _0x262f9c;
    };
    return _0xc97c();
}
function updateTotals() {
    const _0x2737d7 = _0x3242b9;
    const _0x119c89 = document['getElementsByClassName'](_0x2737d7(0x195))[0x0];
    const _0x56fdeb = _0x119c89['getElementsByClassName'](_0x2737d7(0x187));
    let _0x58dc74 = 0x0;
    for (let _0x5c3475 = 0x0; _0x5c3475 < _0x56fdeb[_0x2737d7(0x1b7)]; _0x5c3475++) {
        const _0x294677 = _0x56fdeb[_0x5c3475];
        const _0x1a90df = _0x294677[_0x2737d7(0x1c4)](_0x2737d7(0x1b5))[0x0]['value'];
        const _0x57b4bc = _0x294677[_0x2737d7(0x19c)][_0x2737d7(0x1b6)] * _0x1a90df;
        _0x294677[_0x2737d7(0x1c4)](_0x2737d7(0x1a9))[0x0][_0x2737d7(0x1bf)] = '\x20=\x20£\x20' + formatNumberToString(_0x57b4bc);
        _0x58dc74 += _0x294677['dataset'][_0x2737d7(0x1b6)] * _0x1a90df;
    }
    _0x58dc74 = Math[_0x2737d7(0x17b)](_0x58dc74 * 0x64) / 0x64;
    const _0x3548d3 = formatNumberToString(_0x58dc74);
    document[_0x2737d7(0x1c4)](_0x2737d7(0x1c0))[0x0]['innerText'] = '£\x20' + _0x3548d3;
}
function formatNumberToString(_0x4c78d7) {
    const _0x4467e7 = _0x3242b9;
    _0x4c78d7 = parseFloat(_0x4c78d7);
    let _0x200db6;
    if (!Number[_0x4467e7(0x1aa)](_0x4c78d7)) {
        _0x200db6 = _0x4c78d7['toLocaleString'](undefined, {
            'minimumFractionDigits': 0x2,
            'maximumFractionDigits': 0x2
        });
    } else {
        _0x200db6 = _0x4c78d7[_0x4467e7(0x1a8)]();
    }
    return _0x200db6;
}
function executePurchase() {
    const _0x58b176 = _0x3242b9;
    const _0x1df04d = [];
    const _0x14680f = document[_0x58b176(0x1c4)](_0x58b176(0x195))[0x0]['getElementsByClassName'](_0x58b176(0x187));
    for (let _0x4d67cb = 0x0; _0x4d67cb < _0x14680f[_0x58b176(0x1b7)]; _0x4d67cb++) {
        const _0x8a267d = _0x14680f[_0x4d67cb][_0x58b176(0x1c4)]('buyable-quantity-input')[0x0]['value'];
        const _0x391cb9 = _0x14680f[_0x4d67cb]['dataset'][_0x58b176(0x19a)];
        _0x1df04d[_0x58b176(0x1a3)]({
            'id': _0x391cb9,
            'quantity': _0x8a267d
        });
    }
    let _0x30e7d4 = 0x0;
    fetch('/toBuy/purchase', {
        'method': 'POST',
        'headers': {
            'Content-Type': _0x58b176(0x1ad),
            'Accept': _0x58b176(0x1ad)
        },
        'body': JSON['stringify']({ 'buyables': _0x1df04d })
    })[_0x58b176(0x1bc)](_0x574414 => {
        const _0x43c224 = _0x58b176;
        _0x30e7d4 = _0x574414['status'];
        return _0x574414[_0x43c224(0x192)]();
    })['then'](_0x54c4aa => {
        const _0x1774bd = _0x58b176;
        if (_0x30e7d4[_0x1774bd(0x179)]()[0x0] === '2') {
            Prettypay[_0x1774bd(0x176)](_0x54c4aa[_0x1774bd(0x174)], { 'askAddress': ![] });
            Prettypay[_0x1774bd(0x1b2)](_0x17db40 => {
                const _0x47b637 = _0x1774bd;
                const _0x58ef27 = _0x54c4aa['receiptInfo'];
                _0x58ef27['unshift']({ 'uniqueTransactionReference': _0x17db40[_0x47b637(0x1a4)] });
                clearBuyablesFromBasket();
                updateTotals();
                const _0x5175f5 = async () => {
                    await postReceipt(_0x58ef27);
                    return _0x17db40;
                };
                _0x5175f5()[_0x47b637(0x1bc)](_0x131029 => {
                    const _0x21406b = _0x47b637;
                    window[_0x21406b(0x197)][_0x21406b(0x1c1)] = _0x21406b(0x1b0) + _0x131029[_0x21406b(0x1a4)] + '/' + _0x131029[_0x21406b(0x19f)] + '/' + _0x131029[_0x21406b(0x186)];
                });
            });
        } else {
            Prettypay[_0x1774bd(0x19b)](_0x54c4aa[_0x1774bd(0x184)]);
        }
    })[_0x58b176(0x17a)](_0x320645 => {
        const _0x5f4c57 = _0x58b176;
        console[_0x5f4c57(0x18b)](_0x320645);
    });
}
function clearBuyablesFromBasket() {
    const _0x5e980d = _0x3242b9;
    const _0x24ea6a = document[_0x5e980d(0x1c4)](_0x5e980d(0x195))[0x0][_0x5e980d(0x1c4)](_0x5e980d(0x187));
    while (_0x24ea6a[_0x5e980d(0x1b7)] > 0x0) {
        _0x24ea6a[0x0][_0x5e980d(0x18a)]();
    }
}
function postReceipt(_0x5e0538) {
    const _0x4d3aee = _0x3242b9;
    fetch(_0x4d3aee(0x1ba), {
        'method': 'POST',
        'headers': {
            'Content-Type': _0x4d3aee(0x1ad),
            'Accept': _0x4d3aee(0x1ad)
        },
        'body': JSON[_0x4d3aee(0x191)]({ 'receiptInfo': _0x5e0538 })
    });
}
function changeDivVisibility(_0xfe0eee) {
    const _0x1da0d9 = _0x3242b9;
    const _0x3a813a = document[_0x1da0d9(0x194)](_0xfe0eee + _0x1da0d9(0x182));
    const _0x28968f = document[_0x1da0d9(0x194)](_0xfe0eee + _0x1da0d9(0x17f));
    _0x3a813a[_0x1da0d9(0x1c6)][_0x1da0d9(0x185)](_0x1da0d9(0x188));
    if (!_0x3a813a[_0x1da0d9(0x1c6)][_0x1da0d9(0x1b9)](_0x1da0d9(0x188))) {
        _0x28968f[_0x1da0d9(0x1af)] = _0x1da0d9(0x183);
    } else {
        _0x28968f[_0x1da0d9(0x1af)] = _0x1da0d9(0x1bb);
    }
}
