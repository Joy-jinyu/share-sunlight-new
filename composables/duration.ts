/**
 * 路由相关功能逻辑
 */
export function useNbDuration() {
  let durationInterval: NodeJS.Timer | undefined

  // 端内上报浏览时长
  const reportDuration = function (durationTime: number) {
    console.log(durationTime)
  }

  const startDuration = () => {
    let durationTime = 0

    if (durationInterval) {
      clearInterval(durationInterval)
      durationInterval = undefined
    }

    durationInterval = setInterval(() => {
      durationTime = 5 + durationTime
      reportDuration(durationTime)
    }, 5000)
  }

  return {
    startDuration,
  }
}
