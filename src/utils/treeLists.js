const treeLists = function (type) {
    if (type == 1) {
        return TREELIST_1
    } else if (type == 2) {
        return TREELIST_2
    } else if (type == 3) {
        return TREELIST_3
    } else if (type == 4) {
        return TREELIST_4
    } else if (type == 5) {
        return TREELIST_5

    }
}

const TREELIST_1 = [{
    "id": 110,
    "name": "收银",
    "path": "/",
    "parents": null,
    "type": 1,
    "chi": [{"id": 111, "name": "收银", "path": "/home", "parents": 110, "type": null, "chi": null}]
}, {
    "id": 120,
    "name": "开卡",
    "path": "/",
    "parents": null,
    "type": 1,
    "chi": [{"id": 121, "name": "开卡", "path": "/home/card", "parents": 120, "type": null, "chi": null}]
}, {
    "id": 130,
    "name": "挂单",
    "path": "/",
    "parents": null,
    "type": 1,
    "chi": [{"id": 131, "name": "挂单", "path": "/home/pending", "parents": 130, "type": null, "chi": null}]
}, {
    "id": 140,
    "name": "今日水单",
    "path": "/",
    "parents": null,
    "type": 1,
    "chi": [{"id": 141, "name": "今日水单", "path": "/home/order", "parents": 140, "type": null, "chi": null}]
}, {
    "id": 150,
    "name": "日常收支",
    "path": "/",
    "parents": null,
    "type": 1,
    "chi": [{"id": 151, "name": "日常收支", "path": "/home/currency", "parents": 150, "type": null, "chi": null}]
}];
const TREELIST_2 = [{
    "id": 210,
    "name": "会员资料",
    "path": "/",
    "parents": null,
    "type": 2,
    "chi": [{"id": 211, "name": "会员列表", "path": "/vips/vipslist", "parents": 210, "type": null, "chi": null}, {
        "id": 212,
        "name": "散客列表",
        "path": "/vips/guest",
        "parents": 210,
        "type": null,
        "chi": null
    }]
}, {
    "id": 220,
    "name": "消息与通知",
    "path": "/",
    "parents": null,
    "type": 2,
    "chi": [{"id": 221, "name": "群发短信", "path": "/vips/chats", "parents": 220, "type": null, "chi": null}]
}];
const TREELIST_3 = [{
    "id": 310,
    "name": "营业记录",
    "path": "/",
    "parents": null,
    "type": 3,
    "chi": [{"id": 311, "name": "水单审核", "path": "/", "parents": 310, "type": null, "chi": null}, {
        "id": 312,
        "name": "项目消费记录",
        "path": "/",
        "parents": 310,
        "type": null,
        "chi": null
    }, {"id": 313, "name": "商品消费记录", "path": "/", "parents": 310, "type": null, "chi": null}, {
        "id": 314,
        "name": "充值开卡记录",
        "path": "/",
        "parents": 310,
        "type": null,
        "chi": null
    }, {"id": 315, "name": "订购套餐记录", "path": "/", "parents": 310, "type": null, "chi": null}]
}, {
    "id": 320,
    "name": "店面财务数据",
    "path": "/",
    "parents": null,
    "type": 3,
    "chi": [{"id": 321, "name": "店面财务数据", "path": "/", "parents": 320, "type": null, "chi": null}]
}, {
    "id": 330,
    "name": "业绩提成核对",
    "path": "/",
    "parents": null,
    "type": 3,
    "chi": [{"id": 331, "name": "员工提成核对", "path": "/", "parents": 330, "type": null, "chi": null}, {
        "id": 332,
        "name": "员工业绩核对",
        "path": "/",
        "parents": 330,
        "type": null,
        "chi": null
    }]
}, {
    "id": 340,
    "name": "员工工资表",
    "path": "/",
    "parents": null,
    "type": 3,
    "chi": [{"id": 341, "name": "员工工资表", "path": "/", "parents": 340, "type": null, "chi": null}]
}];
const TREELIST_4 = [{
    "id": 410,
    "name": "店面经营报表",
    "path": "/",
    "parents": null,
    "type": 4,
    "chi": [{"id": 411, "name": "收支报表", "path": "/", "parents": 410, "type": null, "chi": null}, {
        "id": 412,
        "name": "店面业绩报表",
        "path": "/",
        "parents": 410,
        "type": null,
        "chi": null
    }]
}, {
    "id": 420,
    "name": "员工统计报表",
    "path": "/",
    "parents": null,
    "type": 4,
    "chi": [{"id": 421, "name": "员工业绩报表", "path": "/", "parents": 420, "type": null, "chi": null}]
}, {
    "id": 430,
    "name": "销售统计报表",
    "path": "/",
    "parents": null,
    "type": 4,
    "chi": [{"id": 431, "name": "项目消费报表", "path": "/", "parents": 430, "type": null, "chi": null}, {
        "id": 432,
        "name": "商品销售报表",
        "path": "/",
        "parents": 430,
        "type": null,
        "chi": null
    }, {"id": 433, "name": "套餐订购报表", "path": "/", "parents": 430, "type": null, "chi": null}]
}, {
    "id": 440,
    "name": "会员卡统计报表",
    "path": "/",
    "parents": null,
    "type": 4,
    "chi": [{"id": 441, "name": "会员卡充值报表", "path": "/", "parents": 440, "type": null, "chi": null}, {
        "id": 442,
        "name": "会员卡消费报表",
        "path": "/",
        "parents": 440,
        "type": null,
        "chi": null
    }, {"id": 443, "name": "会员卡余额报表", "path": "/", "parents": 440, "type": null, "chi": null}]
}];
const TREELIST_5 = [{
    "id": 510,
    "name": "开店设置",
    "path": "/",
    "parents": null,
    "type": 5,
    "chi": [{"id": 511, "name": "添加员工", "path": "/", "parents": 510, "type": null, "chi": null}, {
        "id": 512,
        "name": "添加卡类型",
        "path": "/",
        "parents": 510,
        "type": null,
        "chi": null
    }, {"id": 513, "name": "添加服务项目", "path": "/", "parents": 510, "type": null, "chi": null}, {
        "id": 514,
        "name": "添加疗程套餐",
        "path": "/",
        "parents": 510,
        "type": null,
        "chi": null
    }, {"id": 515, "name": "添加商品", "path": "/", "parents": 510, "type": null, "chi": null}]
}, {
    "id": 520,
    "name": "提成设置",
    "path": "/",
    "parents": null,
    "type": 5,
    "chi": [{"id": 521, "name": "服务项目提成设置", "path": "/", "parents": 520, "type": null, "chi": null}, {
        "id": 522,
        "name": "商品销售提成设置",
        "path": "/",
        "parents": 520,
        "type": null,
        "chi": null
    }, {"id": 523, "name": "开卡充值提成设置", "path": "/", "parents": 520, "type": null, "chi": null}, {
        "id": 524,
        "name": "套餐订购提成设置",
        "path": "/",
        "parents": 520,
        "type": null,
        "chi": null
    }]
}, {
    "id": 530,
    "name": "短信设置",
    "path": "/",
    "parents": null,
    "type": 5,
    "chi": [{"id": 531, "name": "会员卡动态提醒", "path": "/", "parents": 530, "type": null, "chi": null}, {
        "id": 532,
        "name": "会员消费跟进",
        "path": "/",
        "parents": 530,
        "type": null,
        "chi": null
    }, {"id": 533, "name": "会员服务", "path": "/", "parents": 530, "type": null, "chi": null}, {
        "id": 534,
        "name": "店面管理",
        "path": "/",
        "parents": 530,
        "type": null,
        "chi": null
    }, {"id": 535, "name": "基础设置", "path": "/", "parents": 530, "type": null, "chi": null}]
}, {
    "id": 540,
    "name": "系统安全",
    "path": "/",
    "parents": null,
    "type": 5,
    "chi": [{"id": 541, "name": "系统日志", "path": "/", "parents": 540, "type": null, "chi": null}]
}];


export default treeLists