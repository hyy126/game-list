import { computed, Ref, ref, watch } from "vue"
import { grid3 } from './config'

export interface MineField {
  /**
   * 显示还是隐藏状态
   */
  isShow: boolean
  /**
   * 周边九宫格雷数
   */
  mineNum: number
  /**
   * 是否地雷
   */
  isMine: boolean
  /**
   * 是否标记排除地雷
   */
  isMark: boolean
  /**
   * 是否踩中地雷
   */
  hitMine?: boolean
  /**
   * 位置
   */
  pos: {
    x: number,
    y: number
  }
}

interface Options {
  width: number
  height: number
  mineNum: number
}

export const useMineSweeper = (options: Ref<Options>) => {
  let { width, height, mineNum } = options.value
  let markNum = ref(mineNum)
  watch(options, () => {
    width = options.value.width
    height = options.value.height
    markNum.value = mineNum = options.value.mineNum
  })

  let list = ref<MineField[][]>([])

  let gameover = ref(false)

  let gamewin = computed(() => showFieldNum.value === options.value.width * options.value.height)

  // 显示了多少个
  let showFieldNum = computed(() => list.value.flat().filter((field) => field.isShow || field.isMark).length)

  const init = () => {
    initList()

    // 获取地雷集合
    let nums = new Array(width * height).fill('').map((value, index) => index + 1);
    let mineList = shuffle(nums, mineNum)

    // 埋雷
    mineList.forEach((num) => {
      let row = Math.floor(num / width)
      let column = num % width - 1
      if (num % width === 0) {
        row = row - 1
        column = width - 1
      }

      list.value[row][column].isMine = true
    })

    // 计算周边雷数
    calcRoundMineNum(grid3)
  }

  const initList = () => {
    // 初始化list赋值
    for (let i = 0; i < height; i++) {
      let rowList: MineField[] = []
      for (let j = 0; j < width; j++) {
        rowList.push({
          isShow: false,
          mineNum: 0,
          isMine: false,
          isMark: false,
          pos: {
            y: i,
            x: j
          }
        })
      }
      list.value.push(rowList)
    }
  }

  // 计算周边雷数
  const calcRoundMineNum = (gridModel: number[][]) => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!list.value[i][j].isMine) {
          let mineSum = 0
          gridRoundEach(gridModel, i, j, (row, column) => {
            if (list.value[row][column].isMine) {
              mineSum++
            }
          })
          if (mineSum === 0) {
            // 啥都没有的直接显示
            // list.value[i][j].isShow = true
            // gridRoundEach(grid3, i, j, (row, column) => {
            //   list.value[row][column].isShow = true
            // })
          } else {
            list.value[i][j].mineNum = mineSum
          }
        }
      }
    }
  }

  // 筛选宫格周边符合条件的单元格
  const gridRoundEach = (gridModel: number[][], i: number, j: number, callback: (row: number, column: number) => void) => {
    for (let k = 0; k < gridModel.length; k++) {
      const [offsetY, offsetX] = gridModel[k]
      let row = i + offsetY
      let column = j + offsetX
      // 符合边界条件
      if (row >= 0 && row < height && column >= 0 && column < width) {
        callback(row, column)
      }
    }
  }

  // 展示所有地雷
  const showAll = () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (list.value[i][j].isMine && !list.value[i][j].isMark) {
          list.value[i][j].isShow = true
        }
      }
    }
  }

  // 重置雷区
  const reset = () => {
    list.value = []
    gameover.value = false
    init()
  }

  // 点击雷事件
  const mineHandle = (field: MineField) => {
    if (gameover.value || gamewin.value) {
      return
    }
    if (field.isShow) {
      return
    }
    // 移除排雷标记
    if (field.isMark) {
      field.isMark = false
      return
    }

    field.isShow = true

    if (field.isMine) {
      field.hitMine = true
      gameover.value = true
      showAll()
    }

    if (field.mineNum === 0) {
      deepGridRoundEach(field.pos.y, field.pos.x)
    }
  }

  const deepGridRoundEach = (i: number, j: number) => {
    gridRoundEach(grid3, i, j, (row, column) => {
      let field = list.value[row][column]
      const cacheFieldShow = field.isShow
      field.isShow = true
      if (field.mineNum === 0 && !cacheFieldShow) {
        deepGridRoundEach(row, column)
      }
    })
  }

  // 排雷 标记
  const markMine = (field: MineField) => {
    // 可排雷数为0不做处理
    if (markNum.value === 0) {
      return
    }
    if (field.isMark) {
      return
    }
    field.isMark = true
    markNum.value--
  }

  init()

  return {
    list,
    showAll,
    reset,
    mineHandle,
    markMine,
    markNum,
    gameover,
    gamewin,
  }
}


// 乱序算法
const shuffle = function (nums: number[], extracts: number) {
  let radomNums = nums.slice(0)
  let len = radomNums.length
  while (len > 1) {
    let rand = Math.floor(Math.random() * len);
    len--;
    let temp = radomNums[len];
    radomNums[len] = radomNums[rand];
    radomNums[rand] = temp;
  }
  return radomNums.slice(0, extracts);
}