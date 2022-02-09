import { ref } from "vue"

export interface Options {
  /**
   * 棋盘大小
   */
  size: number;
  /**
   * 间隔
   */
  interval: number
}

export interface Point {
  /**
   * 棋子 1 黑棋 2 白棋 
   */
  chess?: 1 | 2;
  /**
   * 位置
   */
  pos: {
    x: number,
    y: number
  }
}

// 五连胜利
const WINCOUNT = 5

// 计算斜线忽视的边距
const ignorePoint = WINCOUNT - 1

const useFiveInARow = (options: Options) => {
  const { size, interval } = options

  let points = ref<Point[][]>([])
  const sizeCount = size / interval

  // 初始化点阵
  for (let i = 0; i <= size; i += interval) {
    let pointRow: Point[] = []
    for (let j = 0; j <= size; j += interval) {
      pointRow.push({
        pos: {
          x: j,
          y: i
        }
      })
    }
    points.value.push(pointRow)
  }


  // 是否有5子连成一条线
  const hasFiveInARow = () => {
    let count = 0;
    let cur = -1;

    const reset = () => {
      count = 0;
      cur = -1;
    }

    // 检测
    const check = (chess: number | undefined) => {
      if (!chess) {
        return false
      }
      if (chess !== cur) {
        count = 0
        cur = chess
      }
      count++
      if (count === WINCOUNT) {
        return true
      }
    }


    for (let i = 0; i < points.value.length; i++) {
      let pointRow = points.value[i]
      const rowLen = pointRow.length
      // 横向
      reset()
      for (let j = 0; j < rowLen; j++) {
        const chess = pointRow[j].chess
        if (check(chess)) return true
      }

      // 竖向
      reset()
      for (let j = 0; j < rowLen; j++) {
        const chess = points.value[j][i].chess
        if (check(chess)) return true
      }
    }

    // 又上斜向
    for (let k = ignorePoint; k <= sizeCount; k++) {
      let point = [k, 0]
      let flag = true
      reset()
      while (point[0] > -1 && flag) {
        const chess = points.value[point[1]][point[0]].chess
        if (check(chess)) flag = false
        point = [point[0] - 1, point[1] + 1]
      }
      if (!flag) return true
    }

    // 又上斜向
    for (let k = 1; k <= sizeCount - ignorePoint; k++) {
      let point = [sizeCount, k]
      let flag = true
      reset()
      while (point[1] <= sizeCount && flag) {
        const chess = points.value[point[1]][point[0]].chess
        if (check(chess)) flag = false
        point = [point[0] - 1, point[1] + 1]
      }
      if (!flag) return true
    }

    // 左上斜向 1
    for (let k = 0; k <= sizeCount - ignorePoint; k++) {
      let point = [k, 0]
      let flag = true
      reset()
      while (point[0] <= sizeCount && flag) {
        const chess = points.value[point[1]][point[0]].chess
        if (check(chess)) flag = false
        point = [point[0] + 1, point[1] + 1]
      }
      if (!flag) return true
    }

    // 左上斜向 2
    for (let k = 1; k <= sizeCount - ignorePoint; k++) {
      let point = [0, k]
      let flag = true
      reset()
      while (point[1] <= sizeCount && flag) {
        const chess = points.value[point[1]][point[0]].chess
        if (check(chess)) flag = false
        point = [point[0] + 1, point[1] + 1]
      }
      if (!flag) return true
    }

    return false
  }


  return {
    points,
    hasFiveInARow
  }
}

export default useFiveInARow