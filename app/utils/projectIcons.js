const group = {
  '备注': 'liuchengdan-beizhu',
  '捕捞理': 'liuchengdan-bulaoli',
  '病虫害防治': 'liuchengdan-bingchonghaifangzhi',
  '插秧': 'liuchengdan-chayang',
  '打枝打叉': 'liuchengdan-dazhidacha',
  '采收': 'liuchengdan-caishou',
  '当天工作安排': 'liuchengdan-dangtiangongzuoanpai',
  '垫料': 'liuchengdan-dianliao',
  '定植': 'liuchengdan-dingzhi',
  '大群管理': 'liuchengdan-daqunguanli',
  '防疫工作': 'liuchengdan-fangyigongzuo',
  '风口管理': 'liuchengdan-fengkouguanli',
  '放牧': 'liuchengdan-fangmu',
  '高温闷棚消毒': 'liuchengdan-gaowenmenpengxiaodu',
  '工具发放': 'liuchengdan-gongjufafang',
  '工人管理': 'liuchengdan-gongrenguanli',
  '规范手册': 'liuchengdan-guifanshouce',
  '环境卫生': 'liuchengdan-huanjingweisheng',
  '工作状态': 'liuchengdan-gongzuozhuangtai',
  '加料': 'liuchengdan-jialiao',
  '浇水': 'liuchengdan-jiaoshui',
  '禁止事项': 'liuchengdan-jinzhishixiang',
  '平田': 'liuchengdan-pingtian',
  '高温消毒': 'liuchengdan-gaowenxiaodu',
  '清点人数': 'liuchengdan-qingdianrenshu',
  '棚舍温度': 'liuchengdan-pengshewendu',
  '人员管理': 'liuchengdan-renyuanguanli',
  '疾病处理': 'liuchengdan-jibingchuli',
  '设备维护': 'liuchengdan-shebeiweihu',
  '杀菌杀虫': 'liuchengdan-shajunshachong',
  '人员安排': 'liuchengdan-renyuananpai',
  '施肥': 'liuchengdan-shifei',
  '收割': 'liuchengdan-shouge',
  '蔬菜管理': 'liuchengdan-shucaiguanli',
  '水循环设备': 'liuchengdan-shuixunhuanshebei',
  '数据统计': 'liuchengdan-shujutongji',
  '田间管理': 'liuchengdan-tianjianguanli',
  '水': 'liuchengdan-shui',
  '通风情况': 'liuchengdan-tongfengqingkuang',
  '水循环水质': 'liuchengdan-shuixunhuanshuizhi',
  '温室卫生清理': 'liuchengdan-wenshiweishengqingli',
  '物质管理': 'liuchengdan-wuzhiguanli',
  '无害化工作': 'liuchengdan-wuhaihuagongzuo',
  '项目管理': 'liuchengdan-xiangmuguanli',
  '下班工作确认': 'liuchengdan-xiabangongzuoqueren',
  '销售产出': 'liuchengdan-xiaoshouchanchu',
  '旋地垄畦管路': 'liuchengdan-xuandilongqiguanlu',
  '饮水': 'liuchengdan-yinshui',
  '鱼苗管理': 'liuchengdan-yumiaoguanli',
  '育雏工作': 'liuchengdan-yuchugongzuo',
  '鱼苗进场': 'liuchengdan-yumiaojinchang',
  '消毒': 'liuchengdan-xiaodu',
  '秧田': 'liuchengdan-yangtian',
  '育苗': 'liuchengdan-yumiao',
  '植株调整': 'liuchengdan-zhizhutiaozheng',
  '注意事项': 'liuchengdan-zhuyishixiang',
  '遮阳网管理': 'liuchengdan-zheyangwangguanli',
  '扎田': 'liuchengdan-zatian',
  '投食打氧': 'toushidayang',
  '物料管理': 'wuliaoguanli',
  '整地': 'liuchengdan-zhengdi'
};

export default (title) => {
  const keys = Object.keys(group);
  if (keys.includes(title)) {
    return group[title];
  }

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (k.indexOf(title) >= 0) {
      return group[k];
      break;
    }
    if (title.indexOf(k) >= 0) {
      return group[k];
      break;
    }
  }

  return 'liuchengdan-morentubiao';
};
