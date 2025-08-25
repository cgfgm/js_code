window.addEventListener('scroll', function() {
  const container = document.querySelector('.hope-ui-dark');
  if (!container) return; // 如果页面上没有这个元素，则退出

  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 检查容器是否在视口范围内，增加一个小的缓冲区
  const buffer = 100; // 提前开始和结束效果，避免边缘突变
  if (rect.bottom < -buffer || rect.top > windowHeight + buffer) {
    return; // 容器完全在视口外，不执行任何操作
  }

  // 计算容器的“可见进程”
  // 当容器顶部与视口底部对齐时，进程为0
  // 当容器底部与视口顶部对齐时，进程为1
  // 这段距离的总长度是 视口高度 + 容器高度
  const totalScrollableDistance = windowHeight + container.offsetHeight;
  const scrollProgress = (windowHeight - rect.top) / totalScrollableDistance;

  // 将进程限制在 0 到 1 之间
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

  // 将进程 (0 to 1) 映射到背景的垂直位置 (0% to 100%)
  // 0% 代表背景的顶部，100% 代表背景的底部
  const backgroundYPosition = clampedProgress * 100;

  // 更新背景位置
  container.style.backgroundPosition = `center ${backgroundYPosition}%`;
});
