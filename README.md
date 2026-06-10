# 多功能信息展示 - 移动端网页

基于移动优先设计理念构建的现代化信息展示网站。

## 项目结构

```
d:/test/
├── index.html          # 首页
├── topic.html          # 专题列表页
├── topic-detail.html   # 专题详情页
├── css/
│   └── style.css       # 全局样式
├── js/
│   └── main.js         # 交互逻辑
└── images/             # 图片资源目录

```

## 功能特性

### 1. 首页 (index.html)
- **轮播图**: 自动播放的渐变背景轮播，支持触摸滑动
- **快捷功能入口**: 4个主要功能模块的宫格导航
- **内容卡片列表**: 最新内容展示，支持点击进入详情

### 2. 专题列表页 (topic.html)
- **分类筛选**: 横向滚动的分类标签（全部、技术、设计、产品、运营、资讯）
- **专题卡片网格**: 响应式双列布局，突出显示置顶专题
- **渐变视觉设计**: 每个卡片使用独特的渐变色
- **底部导航**: 快速切换页面

### 3. 专题详情页 (topic-detail.html)
- **Hero头部**: 大幅背景图+渐变遮罩，展示专题信息
- **文章列表**: 带编号和标签的详细内容列表
- **相关推荐**: 横向滚动相关专题卡片
- **操作按钮**: 分享、收藏等交互功能

## 设计规范

### 颜色方案
- 主色调: `#667eea` (蓝紫渐变起点)
- 辅助色: `#764ba2` (蓝紫渐变终点)
- 强调色: `#f093fb` (粉紫), `#4facfe` (天蓝), `#43e97b` (青绿)
- 文字: `#1a1a2e` (主), `#6b7280` (次), `#9ca3af` (轻)
- 背景: `#ffffff` (白), `#f3f4f6` (灰)

### 字体
- 系统默认无衬线字体栈: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif`
- 基础字号: 16px
- 响应式缩放

### 间距与圆角
- 标准间距: 12px, 16px, 20px, 24px
- 圆角分级:
  - 小: 8px (卡片、按钮)
  - 中: 12px
  - 大: 16px (图标容器)
  - 超大: 24px (胶囊标签)

### 阴影
- 轻: `0 1px 2px rgba(0,0,0,0.05)` - 默认卡片
- 中: `0 4px 6px rgba(0,0,0,0.1)` - 激活状态
- 重: `0 10px 15px rgba(0,0,0,0.1)` - 浮层元素

## 响应式设计

- 移动优先: 基础样式针对手机 (375px ~ 414px)
- 安全区域支持: `env(safe-area-inset-*)`
- 触摸优化: `-webkit-tap-highlight-color: transparent`
- 滚动增强: `-webkit-overflow-scrolling: touch`

## 交互功能

### 轮播图 (main.js: initBannerSlider)
- 自动播放 (4秒间隔)
- 手动切换 (点击指示器)
- 触摸滑动 (左右滑动)
- 智能暂停 (用户操作时)

### 分类筛选 (main.js: initCategoryFilter)
- 横向滚动浏览
- 点击切换激活状态
- 支持鼠标拖拽 (桌面端)

### 底部导航
- 固定底部，适应安全区域
- 高亮当前页面
- 静默处理未实现链接

## 浏览器兼容性

- iOS Safari 12+
- Chrome for Android 70+
- 现代桌面浏览器 (Chrome, Firefox, Safari, Edge)
- 注: 部分功能需要 CSS Grid 和 `backdrop-filter` 支持

## 开发说明

### 本地预览
直接在浏览器中打开任意 HTML 文件即可:
```bash
# Windows
start /d/test/index.html

# macOS
open /d/test/index.html

# Linux
xdg-open /d/test/index.html
```

### 图片资源
当前使用 CSS 渐变作为占位。正式部署时:
1. 将图片放入 `images/` 目录
2. 替换 `.card-image`、`.topic-image` 等的 `background` 属性
3. 优化图片格式 (建议 WebP + fallback JPEG)

### 添加新页面
1. 复制现有 HTML 结构
2. 更新 `<title>` 和页面标题
3. 链接到底部导航或内部跳转
4. 复用 `style.css` 和 `main.js`

## 待扩展功能

- [ ] 真实的文章详情页
- [ ] 用户登录/个人中心
- [ ] 搜索功能
- [ ] 下拉刷新 + 上拉加载
- [ ] PWA 支持 (manifest, service worker)
- [ ] 多语言 (i18n)
- [ ] 暗色模式切换

---

**设计目标**: 在保持现代化的视觉风格同时，确保在低端设备上的流畅体验。
