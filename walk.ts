
// WalkStatus 描述了遍历状态。
export enum WalkStatus {
  // WalkStop 意味着不需要继续遍历。
  WalkStop = 0,
  // WalkSkipChildren 意味着不要遍历子节点。
  WalkSkipChildren,
  // WalkContinue 意味着继续遍历。
  WalkContinue,
}

// Walker 函数定义了遍历节点 n 时需要执行的操作，进入节点设置 entering 为 true，离开节点设置为 false。
// 如果返回 WalkStop 或者 error 则结束遍历。
export type Walker = (n: Node, entering: boolean) => WalkStatus;

// Walk 使用深度优先算法遍历指定的树节点 n。
export function Walk(n: Node, walker: Walker) {
  walk(n, walker);
}

export function walk(n: Node, walker: Walker): WalkStatus {
  // 进入节点
  let ret = walker(n, true);
  if (ret === WalkStatus.WalkStop) {
    return ret;
  }

  if (ret !== WalkStatus.WalkSkipChildren) {
    // 递归遍历子节点
    for (let c = n.FirstChild; c !== undefined; c = c.Next) {
      if ((ret = walk(c, walker)) === WalkStatus.WalkStop) {
        return WalkStatus.WalkStop;
      }
    }
  }

  // 离开节点
  ret = walker(n, false);
  return ret;
}
