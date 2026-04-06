// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/loading.gif'
import errorImg from '@/assets/images/none.png'

// 优选商城专属：图片格式化辅助函数，自动附加OSS裁剪与WebP转换参数，实现极致瘦身
const formatImgUrl = (url) => {
  // 防御性检查：只处理正常的 HTTP 外部链接，且没有附加过云处理参数的
  if (!url || typeof url !== 'string' || !url.startsWith('http') || url.includes('x-oss-process')) {
    return url
  }
  // 适配网易/通用七牛云 CDN 的 WebP 与裁剪指令
  return url.includes('?')
    ? `${url}&imageView&thumbnail=400x0&type=webp`
    : `${url}?imageView&thumbnail=400x0&type=webp`
}

export const lazyPlugin = {
  install (app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted (el, binding) {
        el.src = defaultImg
        if (el._lazyStop) el._lazyStop()
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              el.src = formatImgUrl(binding.value)
              el.onerror = () => {
                el.src = errorImg
                el.onerror = null
              }
              stop()
            }
          },
          { rootMargin: '200px', threshold: 0 }
        )
        el._lazyStop = stop
      },

      updated (el, binding) {
        if (binding.value !== binding.oldValue) {
          if (el._lazyStop) el._lazyStop()
          el.src = defaultImg
          const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
              if (isIntersecting) {
                el.src = formatImgUrl(binding.value)
                el.onerror = () => {
                  el.src = errorImg
                  el.onerror = null
                }
                stop()
              }
            },
            { rootMargin: '200px', threshold: 0 }
          )
          el._lazyStop = stop
        }
      },
      unmounted (el) {
        if (el._lazyStop) el._lazyStop()
        el.onerror = null
      }
    })
  }
}
