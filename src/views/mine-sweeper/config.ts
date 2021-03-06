export default {
  itemWidth: 30,
  itemHeight: 30,
  preset: {
    low: {
      width: 9,
      height: 9,
      mineNum: 10
    },
    medium: {
      width: 16,
      height: 16,
      mineNum: 40
    },
    high: {
      width: 30,
      height: 16,
      mineNum: 99
    }
  }
}

// 3x3 单元格周边行列计算
export const grid3 = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
]

// 数字颜色等阶
export const colorNumMap = new Map([[1, '#021AFF'], [2, '#1E8000'], [3, '#F80701'], [4, '#010780'], [5, '#800201'], [6, 'red'], [7, 'red'], [8, 'red']])
