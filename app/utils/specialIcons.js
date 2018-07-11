import GroupGuoshu from '@/static/icons/group-guoshu.png';
import GroupShiwaiwenshi from '@/static/icons/group-shiwaiwenshi.png';
import GroupShuidao from '@/static/icons/group-shuidao.png';
import GroupWenshidapeng from '@/static/icons/group-wenshidapeng.png';
import GroupYangzhi from '@/static/icons/group-yangzhi.png';
import GroupYucaigongsheng from '@/static/icons/group-yucaigongsheng.png';
import GroupDefault from '@/static/icons/group-default.png';

const group = {
  '水稻组': GroupShuidao,
  '鱼菜共生组': GroupYucaigongsheng,
  '果树组': GroupGuoshu,
  '养殖组': GroupYangzhi,
  '温室大棚组': GroupWenshidapeng,
  '室外温室组': GroupShiwaiwenshi
};

export default (title) => {
  if (Object.keys(group).includes(title)) {
    return group[title];
  } else {
    return GroupDefault;
  }
};
