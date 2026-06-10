// 主 JavaScript 文件
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各个页面功能
    initHomePage();
    initTopicsPage();
    initSearchPage();
    initFavoritesPage();
    initTimelinePage();
    initBottomNav();
    initToolbarActions();
});

// 全局 Toast 提示
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

// ==================== 首页功能 ====================
function initHomePage() {
    const functionCards = document.querySelectorAll('.function-card');
    functionCards.forEach(card => {
        card.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ==================== 专题页功能 ====================
function initTopicsPage() {
    // 分类折叠功能
    const sectionHeaders = document.querySelectorAll('.topic-section .section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isCollapsed = this.classList.toggle('collapsed');

            if (isCollapsed) {
                content.classList.add('hidden');
            } else {
                content.classList.remove('hidden');
            }
        });
    });

    // 默认展开所有分类
    const contents = document.querySelectorAll('.topic-section .section-content');
    contents.forEach(content => content.classList.remove('hidden'));
}

// 折叠展开函数（供HTML调用）
function toggleSection(header) {
    const content = header.nextElementSibling;
    const isCollapsed = header.classList.toggle('collapsed');

    if (isCollapsed) {
        content.classList.add('hidden');
    } else {
        content.classList.remove('hidden');
    }
}

// ==================== 搜索页功能 ====================
function initSearchPage() {
    const searchInput = document.getElementById('searchInput');
    const searchHistorySection = document.getElementById('historySection');
    const hotSearch = document.querySelector('.hot-search');
    const suggestionsSection = document.getElementById('suggestionsSection');
    const resultsSection = document.getElementById('resultsSection');

    if (!searchInput) return;

    // 加载搜索历史
    loadSearchHistory();

    // 搜索输入事件
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        const clearBtn = document.querySelector('.clear-btn');

        // 显示/隐藏清空按钮
        clearBtn.style.display = query ? 'block' : 'none';

        if (query.length > 0) {
            showSearchSuggestions(query);
        } else {
            suggestionsSection.style.display = 'none';
            if (document.referrer && document.referrer.includes('search.html')) {
                showHistory();
            }
        }
    });

    // 搜索提交
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    // 热门标签点击
    const hotTags = document.querySelectorAll('.hot-tag');
    hotTags.forEach(tag => {
        tag.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = this.textContent;
                performSearch(this.textContent);
            }
        });
    });
}

function showSearchSuggestions(query) {
    const suggestionsSection = document.getElementById('suggestionsSection');
    const suggestionsList = document.getElementById('suggestionsList');

    // 模拟搜索建议数据
    const suggestions = [
        query + '政策',
        query + '文件',
        query + '发展规划',
        query + '实施方案'
    ];

    suggestionsList.innerHTML = suggestions.map(s =>
        `<li onclick="quickSearch('${s}')">${s}</li>`
    ).join('');

    suggestionsSection.style.display = 'block';
}

function quickSearch(query) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = query;
    performSearch(query);
}

function performSearch(query) {
    const suggestionsSection = document.getElementById('suggestionsSection');
    const resultsSection = document.getElementById('resultsSection');
    const resultsCount = document.getElementById('resultsCount');
    const resultsList = document.getElementById('resultsList');

    // 保存搜索历史
    saveSearchHistory(query);

    // 隐藏建议，显示结果
    suggestionsSection.style.display = 'none';

    // 模拟搜索结果
    const mockResults = [
        {
            title: '关于' + query + '的实施方案',
            dept: '国家数据局',
            date: '2024-06-10',
            summary: '为进一步推进' + query + '工作，制定本实施方案...'
        },
        {
            title: query + '发展规划（2024-2025）',
            dept: '工业和信息化部',
            date: '2024-06-08',
            summary: '为加快' + query + '发展，提升整体水平...'
        },
        {
            title: '关于推动' + query + '高质量发展的指导意见',
            dept: '国家发展改革委',
            date: '2024-06-05',
            summary: '深入贯彻落实党中央、国务院决策部署...'
        }
    ];

    resultsCount.textContent = `找到 ${mockResults.length} 条结果`;
    resultsList.innerHTML = mockResults.map(result => `
        <article class="search-result-item" onclick="location.href='topic-detail.html'">
            <h3>${result.title}</h3>
            <p>${result.summary}</p>
            <div class="result-meta">
                <span class="dept">${result.dept}</span>
                <span class="date">${result.date}</span>
            </div>
        </article>
    `).join('');

    resultsSection.style.display = 'block';
    document.querySelector('.hot-search').style.display = 'none';
    document.querySelector('.search-history').style.display = 'none';
}

function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const historyTags = document.getElementById('historyTags');

    if (history.length > 0) {
        historyTags.innerHTML = history.map(item =>
            `<span class="history-tag" onclick="quickSearch('${item}')">${item}</span>`
        ).join('');
        document.getElementById('historySection').style.display = 'block';
    }
}

function saveSearchHistory(query) {
    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history = history.filter(item => item !== query);
    history.unshift(query);
    history = history.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

function clearHistory() {
    localStorage.removeItem('searchHistory');
    document.getElementById('historySection').style.display = 'none';
    showToast('搜索历史已清空');
}

function showHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const historyTags = document.getElementById('historyTags');
    const historySection = document.getElementById('historySection');
    const hotSearch = document.querySelector('.hot-search');

    if (history.length > 0) {
        historyTags.innerHTML = history.map(item =>
            `<span class="history-tag" onclick="quickSearch('${item}')">${item}</span>`
        ).join('');
        historySection.style.display = 'block';
        if (hotSearch) hotSearch.style.display = 'block';
    }
}

// ==================== 收藏页功能 ====================
function initFavoritesPage() {
    const tabs = document.querySelectorAll('.tab');
    const favoritesList = document.getElementById('favoritesList');
    const emptyState = document.getElementById('emptyState');

    // 模拟有收藏数据时
    const hasFavorites = true;

    if (hasFavorites) {
        emptyState.style.display = 'none';
        favoritesList.style.display = 'flex';
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabType = this.dataset.tab;
            // 这里可以根据分类筛选收藏
            console.log('筛选收藏分类:', tabType);
        });
    });
}

function removeFavorite(btn) {
    const item = btn.closest('.favorite-item');
    item.style.transition = 'opacity 0.3s';
    item.style.opacity = '0';

    setTimeout(() => {
        item.remove();
        showToast('已取消收藏');

        // 检查是否为空
        const list = document.getElementById('favoritesList');
        const emptyState = document.getElementById('emptyState');
        if (list.children.length === 0) {
            list.style.display = 'none';
            emptyState.style.display = 'flex';
        }
    }, 300);
}

// ==================== 时间轴页功能 ====================
function initTimelinePage() {
    const filterBtns = document.querySelectorAll('.timeline-filter .filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 这里可以根据筛选条件过滤时间轴内容
            console.log('筛选时间轴:', this.textContent);
        });
    });
}

function startCompare() {
    showToast('开始对比，请选择要对比的政策');
}

// ==================== 全局功能 ====================
function initToolbarActions() {
    // 收藏按钮功能
    const favoriteButtons = document.querySelectorAll('.icon-btn[aria-label="收藏"]');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('favorited');
            if (this.classList.contains('favorited')) {
                showToast('已收藏');
            } else {
                showToast('已取消收藏');
            }
        });
    });

    // 返回按钮（已在HTML中使用onclick实现）
}

// ==================== 底部导航 ====================
function initBottomNav() {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 如果是空链接，阻止跳转
            if (href === '#' || !href) {
                e.preventDefault();
                showToast('功能开发中');
                return;
            }

            // 更新 active 状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ==================== 搜索页面内样式补充 ====================
const searchStyles = `
    .search-result-item {
        background: var(--bg-white);
        padding: 16px;
        border-radius: var(--radius-md);
        margin-bottom: 12px;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
    }

    .search-result-item:active {
        transform: scale(0.98);
    }

    .search-result-item h3 {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 6px;
        color: var(--text-primary);
    }

    .search-result-item p {
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .result-meta {
        display: flex;
        gap: 12px;
        font-size: 12px;
        color: var(--text-muted);
    }

    .result-meta .dept::before {
        content: "📋 ";
    }

    .result-meta .date::before {
        content: "📅 ";
    }

    @media (max-width: 360px) {
        .main-title {
            font-size: 20px;
        }

        .function-card {
            padding: 20px 16px;
        }

        .function-card h3 {
            font-size: 16px;
        }
    }
`;

// 动态添加搜索样式
const styleEl = document.createElement('style');
styleEl.textContent = searchStyles;
document.head.appendChild(styleEl);

// 全局错误处理
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('未处理的Promise错误:', e.reason);
});

// Service Worker 注册（PWA支持，可选）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js');
    });
}
