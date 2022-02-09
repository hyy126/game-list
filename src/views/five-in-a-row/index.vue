<template>
  <section class="fiveinarow-wrapper">
    <h1>五子棋</h1>
    <canvas ref="fiveCanvas" @click="handleClick"></canvas>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useFiveInARow from './useFiveInARow'
import type { Point } from "./useFiveInARow"
import { useEasyGoStore } from '@/store/useEasyGoStore'
import { useRoomStore } from "@/store/useRoomStore"
import { useMessage } from "naive-ui"

const SIZE = 540
// 棋盘间距
const INTERVAL = 30
// 棋盘边距
const EDGE = 24

const fiveCanvas = ref<HTMLCanvasElement>()

const message = useMessage()

const { points, hasFiveInARow } = useFiveInARow({
  size: SIZE,
  interval: INTERVAL
})

const { send } = useEasyGoStore()
const roomStore = useRoomStore()

onMounted(() => {
  let ctx = fiveCanvas.value?.getContext('2d')
  if (!ctx) {
    return
  }
  fiveCanvas.value!.width = SIZE + EDGE * 2
  fiveCanvas.value!.height = SIZE + EDGE * 2

  // 生成棋盘线条
  for (let i = 0; i <= SIZE; i += INTERVAL) {
    ctx.moveTo(EDGE, i + EDGE)
    ctx.lineTo(SIZE + EDGE, i + EDGE)

    ctx.moveTo(i + EDGE, EDGE)
    ctx.lineTo(i + EDGE, SIZE + EDGE)
  }
  ctx.rect(EDGE, EDGE, SIZE, SIZE)
  ctx.fillStyle = '#DCB26A';
  ctx.fill()
  ctx.lineWidth = 1
  ctx.strokeStyle = '#865A24';
  ctx.stroke()
})

// 黑白棋交叉执行 单机模式
// let isBlack = false;

// 哪个棋子
let chessColor: 1 | 2 | undefined = undefined
// 棋子数量 控制顺序
let chessCount = [0, 0]

const generatorChessColor = () => {
  // 确认执行棋子颜色
  if (!chessColor) {
    // 黑棋先行
    if (chessCount[0] === 0 && chessCount[1] === 0) {
      chessColor = 1
    } else {
      chessColor = 2
    }
  }
}

// 棋盘点击
const handleClick = (e: MouseEvent) => {
  generatorChessColor()
  console.log(chessColor, chessCount)
  // 黑棋是否可下
  if (chessColor === 1 && chessCount[0] > chessCount[1]) {
    return
  }
  // 白棋是否可下
  if (chessColor === 2 && chessCount[1] >= chessCount[0]) {
    return
  }

  const localXy = {
    x: e.clientX - fiveCanvas.value!.getBoundingClientRect().left - EDGE,
    y: e.clientY - fiveCanvas.value!.getBoundingClientRect().top - EDGE
  }

  const col = Math.floor(localXy.x / INTERVAL) + (localXy.x % INTERVAL < 15 ? 0 : 1)
  const row = Math.floor(localXy.y / INTERVAL) + (localXy.y % INTERVAL < 15 ? 0 : 1)
  const point = points.value[row][col]
  // 已放置过
  if (point.chess) {
    return
  }
  point.chess = chessColor
  // 棋局消息推送
  send(roomStore.room, JSON.stringify({ point, row, col }))
  // handleChess(point)
}

const handleChess = (point: Point) => {
  point.chess === 1 ? chessCount[0]++ : chessCount[1]++
  generatorChessColor()

  drawChessman(point.pos.x + EDGE, point.pos.y + EDGE, point.chess === 1)
  if (hasFiveInARow()) {
    message.success(`牛啊!!${point.chess === 1 ? '黑棋' : '白棋'}游戏胜利!`)
  }
}

roomStore.listen((msg: string) => {
  try {
    let { point, row, col } = JSON.parse(msg)
    points.value[row][col] = point
    handleChess(point)
  } catch (error) {
    message.error(`${message}json解析异常`);
  }
})

// 绘制黑棋或白棋
const drawChessman = (x: number, y: number, isBlack?: boolean) => {
  let ctx = fiveCanvas.value?.getContext('2d')
  if (!ctx) {
    return
  }
  let gradient = ctx.createRadialGradient(x, y, EDGE, x - 5, y - 5, 0);
  ctx.beginPath();
  ctx.arc(x, y, EDGE / 2, 0, 2 * Math.PI);
  ctx.closePath();
  if (isBlack) {
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#636766');
  } else {
    gradient.addColorStop(0, '#d1d1d1');
    gradient.addColorStop(1, '#f9f9f9');
  }
  ctx.fillStyle = gradient;
  ctx.fill();
}

</script>

<style lang="less"></style>