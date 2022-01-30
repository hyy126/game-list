<template>
  <section class="sweeper-wrapper">
    <h1>扫雷</h1>
    <div class="action-wrapper">
      <span class="btn" @click="changeMode('low')">基础</span>
      <span class="btn" @click="changeMode('medium')">中级</span>
      <span class="btn" @click="changeMode('high')">专家</span>
      <span class="btn">自定义</span>
    </div>
    <div class="info-wrapper">
      <span>{{ markNum }}</span>
      <i
        class="iconfont emoj"
        :class="gameover ? 'icon-bukaixin' : gamewin ? 'icon-xiaolian-' : 'icon-kaixin'"
        @click="reset"
      ></i>
      <span>倒计时</span>
    </div>
    <section class="game-wrapper" :style="responseSize">
      <template v-for="mineFileds) in list">
        <template v-for="field in mineFileds">
          <div
            class
            @click="mineHandle(field)"
            @contextmenu.prevent="markMine(field)"
            :class="fieldClass(field)"
          >
            <template v-if="field.isShow">
              <span v-if="field.isMine">x</span>
              <span
                class="mineNum"
                :style="{ color: colorNumMap.get(field.mineNum) }"
                v-if="field.mineNum"
              >{{ field.mineNum }}</span>
            </template>
          </div>
        </template>
      </template>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import config from './config'
import { useMineSweeper } from './useMineSweeper'
import type { MineField } from './useMineSweeper'

// enum Emoj {
//   SAD = '⊙︿⊙',
//   HAPPY = '￣ˇ￣'
// }

const sweeperData = ref(config.preset.medium)

const itemStyle = {
  width: `${config.itemWidth}px`,
  height: `${config.itemHeight}px`
}

const responseSize = computed(() => {
  return {
    width: `${sweeperData.value.width * config.itemWidth}px`,
  }
})

// 区块背景色判断
const fieldClass = (field: MineField) => {
  const { isShow, isMine, isMark, hitMine } = field
  let className = '';
  if (isMark) {
    className = 'isMarkShow'
  } else if (isShow) {
    if (isMine) {
      className = hitMine ? 'isRedMineShow' : 'isMineShow'
    } else {
      className = 'isShow'
    }
  }
  return ['mineField', className]
}

// 数字颜色等阶
const colorNumMap = new Map([[1, '#021AFF'], [2, '#1E8000'], [3, '#F80701'], [4, '#010780'], [5, '#800201'], [6, 'red']])

const { list, reset, mineHandle, markMine, markNum, gameover, gamewin } = useMineSweeper(sweeperData)

const changeMode = (preset: 'low' | 'medium' | 'high') => {
  sweeperData.value = config.preset[preset]
  nextTick(() => {
    reset()
  })
}
</script>

<style lang="less">
h1 {
  text-align: center;
}

@maincolor: #2080f0;

.action-wrapper {
  width: 282px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .btn {
    padding: 4px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @maincolor;
    background: rgba(32, 128, 240, 0.16);
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background: rgba(32, 128, 240, 0.22);
    }

    &:active {
      background: rgba(32, 128, 240, 0.28);
    }
  }
}

.info-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0;
  .emoj {
    cursor: pointer;
    font-size: 30px;
  }
}
.game-wrapper {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  border: 6px solid #ccc;
  border-radius: 5px;

  .mineField {
    box-sizing: border-box;
    width: v-bind("itemStyle.width");
    height: v-bind("itemStyle.height");
    // border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("data:img/gif;base64,R0lGODlhGQAZAJEAAP///8DAwICAgAAAACH5BAQUAP8ALAAAAAAZABkAAAJKhI+pFrH/GpwnCFGb3nxfzHQi92XjWYbnmAIrepkvGauzV7s3Deq71vrhekJgrtgIIpVFptD5g+6kN+osZflot9xPsgvufsPkSwEAOw==");
    background-size: cover;
    &.isShow {
      background-image: url("data:img/gif;base64,R0lGODlhGQAZAKIAAM7OzsbGxr6+vra2trKysqampoKCggAAACH5BAAHAP8ALAAAAAAZABkAAANHaLrc3mWQSau9xAwQuv9gGBhEIJxoqq4CabLw6sY0Otf0jcP6Lpc+HjD4exFTvWNrqDwlj09iNDj1VXdXXLa2zTGb3VgYlgAAOw==");
    }

    &.isMineShow {
      background-image: url("data:img/gif;base64,R0lGODlhGQAZAJEAAP///76+voKCggAAACH5BAAHAP8ALAAAAAAZABkAAAJglI+py70Bo5wUmhrHwPFyzVlCCIYeBGqqik5nkK4s7I6TjFOvCvR42bGhND3AbyPZEX2/GuwILV2iUZGEOgtesUhthuu8VcNbqE74fOZoSTQFiHm9u3G3OBSQ4yv6/aQAADs=");
    }

    &.isRedMineShow {
      background-image: url("data:img/gif;base64,R0lGODlhGQAZAJEAAP///4CAgP8AAAAAACH5BAQUAP8ALAAAAAAZABkAAAJgjI+py70Co5wUmhrHwPFyzVlBCIYeBGqqik6nkK4s7I6TjFOvCvR42bGhND3AbyPZEX2/GuwILV2iUZGEOgtesUhthuu8VcNbqE74fOZoSTQFiHm9u3G3OCSQ4yv6/aQAADs=");
    }

    &.isMarkShow {
      background-image: url("data:img/gif;base64,R0lGODlhGQAZAKIAAP///8DAwICAgP8AAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAZABkAAANsCLrcriG8OSO9KwiRo//gt3FQaIJjZw7DmZYh25ovEMtzWH+47G6qno8GhAWEOVTRBur9SMxbUrQ8BQiEpyqE1RpBXSLUGtZVI9i0Wu3ZodfwbMR9ja/bZ6s3qjeTNCOBgoMjc4SHhIaIixsJADs=");
    }

    .mineNum {
      font-family: system-ui;
      font-weight: bold;
      font-size: 22px;
    }
  }
}
</style>