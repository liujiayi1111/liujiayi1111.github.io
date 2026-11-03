document.addEventListener('DOMContentLoaded', () => {
  renderSidebar()
  initSidebar()
  initCategoryFilters()
  initTabs()
  initTableOfContents()
  initQuickSearch()
})

function renderSidebar () {
  const sidebar = document.getElementById('wiki-sidebar')
  if (!sidebar) return

  if (typeof WIKI_NAV_DATA === 'undefined') {
    console.warn('WIKI_NAV_DATA 未定义，请确保在 HTML 中引入了 js/sidebar-data.js')
    return
  }

  let currentFile = window.location.pathname.split('/').pop()
  if (!currentFile || currentFile === '') currentFile = 'index.html'

  if (currentFile === 'article.html') currentFile = 'dog-wangcai.html'

  let html = `
    <nav class="sidebar-nav">
      <div class="nav-group">
        <div class="nav-group-title">导航快捷</div>
        <a href="index.html" class="nav-item ${currentFile === 'index.html' ? 'active' : ''}">
          <i class="fa-solid fa-compass"></i> 百科首页
        </a>
      </div>
      <div class="nav-group">
        <div class="nav-group-title">游戏资料图鉴</div>
  `

  WIKI_NAV_DATA.forEach(cat => {
    const isCurrentCat = cat.items.some(item => item.href === currentFile)
    const openCls = isCurrentCat ? ' open' : ''

    html += `
      <div class="nav-folder${openCls}">
        <div class="folder-header">
          <span><i class="fa-solid ${cat.icon}" style="color: ${cat.color};"></i> ${cat.name}</span>
          <i class="fa-solid fa-chevron-down arrow"></i>
        </div>
        <div class="folder-content">
    `

    cat.items.forEach(item => {
      const isActive = item.href === currentFile ? ' active' : ''
      html += `    <a href="${item.href}" class="nav-subitem${isActive}">${item.title}</a>\n`
    })

    html += `
        </div>
      </div>
    `
  })

  html += `
      </div>
    </nav>
  `

  sidebar.innerHTML = html
}

function initSidebar () {
  const sidebarToggle = document.getElementById('sidebar-toggle')
  const sidebar = document.getElementById('wiki-sidebar')

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', e => {
      e.stopPropagation()
      sidebar.classList.toggle('open')
    })

    document.addEventListener('click', e => {
      if (window.innerWidth <= 768 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('open')
      }
    })
  }

  const folders = document.querySelectorAll('.nav-folder .folder-header')
  folders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement
      parent.classList.toggle('open')
    })
  })
}

function initCategoryFilters () {
  const filterChips = document.querySelectorAll('.filter-chip')
  const catCards = document.querySelectorAll('.cat-card')

  if (filterChips.length === 0 || catCards.length === 0) return

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'))
      chip.classList.add('active')

      const targetCategory = chip.getAttribute('data-category')

      catCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category')
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex'
        } else {
          card.style.display = 'none'
        }
      })
    })
  })
}

function initTabs () {
  const tabContainers = document.querySelectorAll('.tab-component')

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn')
    const panes = container.querySelectorAll('.tab-pane')

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab')

        buttons.forEach(b => b.classList.remove('active'))
        panes.forEach(p => p.classList.remove('active'))

        btn.classList.add('active')
        const targetPane = container.querySelector('#' + targetId)
        if (targetPane) {
          targetPane.classList.add('active')
        }
      })
    })
  })
}

function initTableOfContents () {
  const tocList = document.getElementById('toc-list')
  const articleContent = document.getElementById('article-content')

  if (tocList && articleContent) {
    const headings = articleContent.querySelectorAll('h2')

    if (headings.length === 0) {
      const tocWrapper = document.getElementById('toc-container')
      if (tocWrapper) tocWrapper.style.display = 'none'
      return
    }

    tocList.innerHTML = ''

    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = 'section-' + (index + 1)
      }

      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = '#' + heading.id
      a.textContent = heading.innerText.trim()

      li.appendChild(a)
      tocList.appendChild(li)
    })
  }
}

function initQuickSearch () {
  const searchInput = document.getElementById('quick-search-input')
  if (!searchInput) return

  const headerSearch = searchInput.closest('.header-search') || searchInput.parentElement
  if (!headerSearch) return

  let clearBtn = headerSearch.querySelector('.search-clear-btn')
  if (!clearBtn) {
    clearBtn = document.createElement('button')
    clearBtn.className = 'search-clear-btn'
    clearBtn.type = 'button'
    clearBtn.setAttribute('aria-label', '清空输入')
    clearBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    clearBtn.style.display = 'none'
    headerSearch.appendChild(clearBtn)
  }

  let dropdown = headerSearch.querySelector('.search-dropdown-menu')
  if (!dropdown) {
    dropdown = document.createElement('div')
    dropdown.className = 'search-dropdown-menu'
    dropdown.id = 'search-dropdown-menu'
    dropdown.setAttribute('role', 'listbox')
    headerSearch.appendChild(dropdown)
  }

  let currentResults = []
  let selectedIndex = -1

  function escapeHtml (str) {
    return (str || '').replace(
      /[&<>"']/g,
      m =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }[m])
    )
  }

  function highlightText (text, query) {
    if (!text) return ''
    if (!query) return escapeHtml(text)
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    return escapeHtml(text).replace(regex, '<mark class="search-highlight">$1</mark>')
  }

  function openDropdown () {
    dropdown.classList.add('open')
    if (!searchInput.value.trim()) {
      renderBrowsePanel()
    } else {
      doSearch(searchInput.value)
    }
  }

  function closeDropdown () {
    dropdown.classList.remove('open')
    selectedIndex = -1
  }

  function doSearch (keyword) {
    const q = keyword.toLowerCase().trim()
    if (!q) {
      renderBrowsePanel()
      return
    }

    if (typeof WIKI_SEARCH_DATA === 'undefined' || !Array.isArray(WIKI_SEARCH_DATA)) {
      dropdown.innerHTML = `
        <div class="search-empty-state">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>搜索数据未加载，请确保引入了 js/sidebar-data.js</p>
        </div>
      `
      return
    }

    const scored = []

    for (const item of WIKI_SEARCH_DATA) {
      let score = 0
      const titleLower = item.title.toLowerCase()
      const idLower = (item.id || '').toLowerCase()
      const badgeLower = (item.badge || '').toLowerCase()
      const catLower = (item.cat || '').toLowerCase()

      if (titleLower === q) score += 300
      else if (titleLower.startsWith(q)) score += 150
      else if (titleLower.includes(q)) score += 80

      if (idLower === q) score += 200
      else if (idLower.startsWith(q)) score += 100
      else if (idLower.includes(q)) score += 50

      if (badgeLower && badgeLower.includes(q)) score += 70
      if (catLower && catLower.includes(q)) score += 60

      if (score > 0) {
        scored.push({ item, score })
      }
    }

    scored.sort((a, b) => b.score - a.score || a.item.title.length - b.item.title.length)

    currentResults = scored.slice(0, 15)
    selectedIndex = currentResults.length > 0 ? 0 : -1
    renderResults(currentResults, q, scored.length)

    const cards = document.querySelectorAll('.cat-card, .wiki-list li')
    if (cards.length > 0) {
      cards.forEach(el => {
        const text = el.innerText.toLowerCase()
        el.style.display = text.includes(q) ? '' : 'none'
      })
    }
  }

  function renderBrowsePanel () {
    selectedIndex = -1
    currentResults = []

    const hotTags = [
      { name: '黄油带', cat: 'weapon' },
      { name: '土豆地雷', cat: 'weapon' },
      { name: '大薯条', cat: 'weapon' },
      { name: '超武', cat: 'weapon' },
      { name: '肥料', cat: 'passive' },
      { name: '深冻冰柜', cat: 'boss' },
      { name: '投币洗衣房', cat: 'biome' },
      { name: '塞尔达与林克', cat: 'dog' }
    ]

    const catPills = [
      { name: '武器', icon: 'fa-khanda', color: '#2563eb' },
      { name: '被动', icon: 'fa-shield-heart', color: '#059669' },
      { name: '道具', icon: 'fa-box-open', color: '#d97706' },
      { name: '进化', icon: 'fa-wand-magic-sparkles', color: '#7c3aed' },
      { name: '建筑', icon: 'fa-landmark-dome', color: '#4f46e5' },
      { name: '敌人', icon: 'fa-ghost', color: '#e11d48' },
      { name: '首领', icon: 'fa-skull-crossbones', color: '#b91c1c' },
      { name: '地区', icon: 'fa-mountain-sun', color: '#0d9488' },
      { name: '狗狗', icon: 'fa-dog', color: '#ea580c' }
    ]

    let html = `
      <div class="search-quick-panel">
        <div class="search-panel-section">
          <div class="search-section-title"><i class="fa-solid fa-fire text-amber" style="color: #f59e0b;"></i> 热门检索与超武</div>
          <div class="search-tag-group">
            ${hotTags.map(t => `<button type="button" class="search-tag-pill" data-search="${t.name}">${t.name}</button>`).join('')}
          </div>
        </div>
        <div class="search-panel-section">
          <div class="search-section-title"><i class="fa-solid fa-shapes"></i> 8 大核心系统速览</div>
          <div class="search-cat-group">
            ${catPills
              .map(
                c => `
              <button type="button" class="search-cat-pill-btn" data-search="${c.name}">
                <i class="fa-solid ${c.icon}" style="color:${c.color}"></i> ${c.name}
              </button>
            `
              )
              .join('')}
          </div>
        </div>
        <div class="search-dropdown-footer">
          <span>全站共收录 <strong>238</strong> 篇词条</span>
          <div class="search-shortcuts"><kbd>/</kbd> 随时聚焦 <kbd>Esc</kbd> 关闭</div>
        </div>
      </div>
    `

    dropdown.innerHTML = html

    dropdown.querySelectorAll('[data-search]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const val = btn.getAttribute('data-search')
        searchInput.value = val
        clearBtn.style.display = 'flex'
        searchInput.focus()
        doSearch(val)
      })
    })
  }

  function renderResults (results, query, totalMatches) {
    if (results.length === 0) {
      dropdown.innerHTML = `
        <div class="search-empty-state">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
          <p>未找到与 “<strong>${escapeHtml(query)}</strong>” 匹配的词条</p>
          <div class="search-empty-tip">
            支持搜索：中文名称、拼音缩写（如 <code>hyd</code> 搜黄油带）、英文标识（如 <code>spud</code>）或分类
          </div>
        </div>
        <div class="search-dropdown-footer">
          <span>暂无匹配项</span>
          <div class="search-shortcuts"><kbd>Esc</kbd> 退出</div>
        </div>
      `
      return
    }

    let itemsHtml = `
      <div class="search-results-list" id="search-results-list">
    `

    results.forEach(({ item }, idx) => {
      const activeCls = idx === selectedIndex ? ' active' : ''
      const thumbHtml = item.image
        ? `<img src="${item.image}" alt="${escapeHtml(item.title)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
           <div class="search-thumb-fallback" style="display:none;background:${item.catColor}15;color:${item.catColor};"><i class="fa-solid ${item.catIcon}"></i></div>`
        : `<div class="search-thumb-fallback" style="background:${item.catColor}15;color:${item.catColor};"><i class="fa-solid ${item.catIcon}"></i></div>`

      const badgeHtml = item.badge ? `<span class="search-badge-pill">${item.badge}</span>` : ''

      itemsHtml += `
        <a href="${item.href}" class="search-result-item${activeCls}" data-index="${idx}" role="option">
          <div class="search-item-thumb">
            ${thumbHtml}
          </div>
          <div class="search-item-main">
            <div class="search-item-header">
              <span class="search-item-title">${highlightText(item.title, query)}</span>
              <span class="search-cat-badge tag-${item.catKey}">${item.cat}</span>
              ${badgeHtml}
              <span class="search-item-id">${highlightText(item.id, query)}</span>
            </div>
            <div class="search-item-desc">${highlightText(item.desc || '', query)}</div>
          </div>
          <div class="search-item-jump">
            <i class="fa-solid fa-arrow-turn-down fa-rotate-90"></i>
          </div>
        </a>
      `
    })

    itemsHtml += `</div>`

    const footerHtml = `
      <div class="search-dropdown-footer">
        <span>检索到 <strong>${totalMatches}</strong> 个相关词条 (显示前 ${results.length} 项)</span>
        <div class="search-shortcuts"><kbd>↑</kbd><kbd>↓</kbd> 选择 <kbd>Enter</kbd> 跳转 <kbd>Esc</kbd> 关闭</div>
      </div>
    `

    dropdown.innerHTML = itemsHtml + footerHtml

    dropdown.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10)
        updateSelection(idx)
      })
    })
  }

  function updateSelection (newIdx) {
    if (currentResults.length === 0) return
    const items = dropdown.querySelectorAll('.search-result-item')
    items.forEach(it => it.classList.remove('active'))

    if (newIdx < 0) newIdx = currentResults.length - 1
    if (newIdx >= currentResults.length) newIdx = 0

    selectedIndex = newIdx
    const activeItem = items[selectedIndex]
    if (activeItem) {
      activeItem.classList.add('active')
      activeItem.scrollIntoView({ block: 'nearest' })
    }
  }

  searchInput.addEventListener('input', e => {
    const val = e.target.value
    clearBtn.style.display = val.length > 0 ? 'flex' : 'none'
    openDropdown()
    doSearch(val)
  })

  searchInput.addEventListener('focus', () => {
    openDropdown()
  })

  clearBtn.addEventListener('click', e => {
    e.stopPropagation()
    searchInput.value = ''
    clearBtn.style.display = 'none'
    searchInput.focus()
    openDropdown()

    document.querySelectorAll('.cat-card, .wiki-list li').forEach(el => (el.style.display = ''))
  })

  searchInput.addEventListener('keydown', e => {
    if (!dropdown.classList.contains('open')) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        openDropdown()
        return
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      updateSelection(selectedIndex + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      updateSelection(selectedIndex - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (currentResults.length > 0) {
        const targetIdx = selectedIndex >= 0 ? selectedIndex : 0
        const targetItem = currentResults[targetIdx]
        if (targetItem && targetItem.item && targetItem.item.href) {
          window.location.href = targetItem.item.href
        }
      }
    } else if (e.key === 'Escape') {
      closeDropdown()
      searchInput.blur()
    }
  })

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : ''
      if (activeTag !== 'input' && activeTag !== 'textarea') {
        e.preventDefault()
        searchInput.focus()
        searchInput.select()
        openDropdown()
      }
    }
  })

  document.addEventListener('click', e => {
    if (!headerSearch.contains(e.target)) {
      closeDropdown()
    }
  })
}
