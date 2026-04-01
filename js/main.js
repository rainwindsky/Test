/* =========================================
   1. 初始化与核心路由
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initGlobalBGM();        // 1. 初始化全局背景音乐
    initPageLogic();        // 2. 初始化当前页面的专属逻辑
    setupSmoothNavigation();// 3. 开启无缝跳转魔法（核心！）
});

// 根据 body 的 ID 触发对应页面的 JS 逻辑
function initPageLogic() {
    const pageId = document.body.id;
    if (pageId === 'page-index') {
        console.log("加载首页逻辑");
    } else if (pageId === 'page-quiz') {
        initQuizPage();
    } else if (pageId === 'page-music') {
        initMusicPage();
    } else if (pageId === 'page-history') {
        // initHistoryPage(); 预留
    }
}

/* =========================================
   2. 无缝跳转魔法 (Ajax/Fetch Router)
========================================= */
function setupSmoothNavigation() {
    // 监听全页面的点击事件
    document.body.addEventListener('click', async (e) => {
        // 寻找被点击的 a 标签
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') && !link.getAttribute('href').startsWith('http')) {
            e.preventDefault(); // 阻止浏览器原本的暴力跳转
            const url = link.getAttribute('href');
            await loadPageSeamlessly(url);
        }
    });

    // 监听浏览器的“返回”按钮
    window.addEventListener('popstate', () => {
        loadPageSeamlessly(location.pathname, false);
    });
}

// 核心：悄悄拉取新页面内容并替换
async function loadPageSeamlessly(url, pushHistory = true) {
    try {
        const response = await fetch(url);
        const htmlText = await response.text();

        // 将获取到的 HTML 文本解析为真实的 DOM 结构
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(htmlText, 'text/html');

        // 1. 替换 body 的 ID (为了触发新页面的 CSS)
        document.body.id = newDoc.body.id;
        document.title = newDoc.title;

        // 2. 获取当前的容器和新页面的容器
        const currentApp = document.getElementById('app');
        const newApp = newDoc.getElementById('app');

        // 3. 核心替换动作：移除旧内容（避开音乐组件）
        Array.from(currentApp.children).forEach(child => {
            if (child.id !== 'global-bgm' && child.id !== 'bgm-btn') {
                child.remove();
            }
        });

        // 4. 将新页面的内容塞进来（避开音乐组件）
        Array.from(newApp.children).forEach(child => {
            if (child.id !== 'global-bgm' && child.id !== 'bgm-btn') {
                currentApp.appendChild(child.cloneNode(true));
            }
        });

        // 5. 更新浏览器地址栏，假装我们真的跳转了
        if (pushHistory) {
            window.history.pushState(null, '', url);
        }

        // 6. 为新加载进来的页面重新绑定点击事件
        initPageLogic();

    } catch(e) {
        console.error("无缝加载失败，降级为普通跳转", e);
        window.location.href = url; // 如果出错，老老实实真跳转
    }
}

/* =========================================
   3. 全局背景音乐逻辑 (含点击解锁)
========================================= */
function initGlobalBGM() {
    const bgm = document.getElementById('global-bgm');
    const bgmBtn = document.getElementById('bgm-btn');
    if (!bgm || !bgmBtn) return;

    // 尝试播放的函数
    const attemptPlay = () => {
        bgm.play().then(() => {
            bgmBtn.classList.add('playing');
            bgmBtn.classList.remove('paused');
            // 播放成功后移除全屏监听，避免浪费性能
            document.body.removeEventListener('click', attemptPlay);
            document.body.removeEventListener('touchstart', attemptPlay);
        }).catch(err => {
            console.log("浏览器拦截自动播放，等待用户任意点击解锁。");
            bgmBtn.classList.add('paused');
        });
    };

    // 无论如何，先挂载一个全局点击监听：只要用户点屏幕，立刻播放！
    document.body.addEventListener('click', attemptPlay, { once: true });
    document.body.addEventListener('touchstart', attemptPlay, { once: true });

    // 首次进入尝试直接播放
    attemptPlay();

    // 右上角按钮手动控制
    bgmBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡到 body 上
        if (bgm.paused) {
            bgm.play();
            bgmBtn.classList.add('playing');
            bgmBtn.classList.remove('paused');
        } else {
            bgm.pause();
            bgmBtn.classList.remove('playing');
            bgmBtn.classList.add('paused');
        }
    });
}

/* =========================================
   4. 各个子页面的专属逻辑
========================================= */

/* =========================================
   1. 初始化与核心路由
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initGlobalBGM();        // 1. 初始化全局背景音乐
    initPageLogic();        // 2. 初始化当前页面的专属逻辑
    setupSmoothNavigation();// 3. 开启无缝跳转魔法（核心！）
});

// 根据 body 的 ID 触发对应页面的 JS 逻辑
function initPageLogic() {
    const pageId = document.body.id;
    if (pageId === 'page-index') {
        console.log("加载首页逻辑");
    } else if (pageId === 'page-quiz') {
        initQuizPage();
    } else if (pageId === 'page-music') {
        initMusicPage();
    } else if (pageId === 'page-history') {
        // initHistoryPage(); 预留
    }
}

/* =========================================
   2. 无缝跳转魔法 (Ajax/Fetch Router)
========================================= */
function setupSmoothNavigation() {
    // 监听全页面的点击事件
    document.body.addEventListener('click', async (e) => {
        // 寻找被点击的 a 标签
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') && !link.getAttribute('href').startsWith('http')) {
            e.preventDefault(); // 阻止浏览器原本的暴力跳转
            const url = link.getAttribute('href');
            await loadPageSeamlessly(url);
        }
    });

    // 监听浏览器的“返回”按钮
    window.addEventListener('popstate', () => {
        loadPageSeamlessly(location.pathname, false);
    });
}

// 核心：悄悄拉取新页面内容并替换
async function loadPageSeamlessly(url, pushHistory = true) {
    try {
        const response = await fetch(url);
        const htmlText = await response.text();

        // 将获取到的 HTML 文本解析为真实的 DOM 结构
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(htmlText, 'text/html');

        // 1. 替换 body 的 ID (为了触发新页面的 CSS)
        document.body.id = newDoc.body.id;
        document.title = newDoc.title;

        // 2. 获取当前的容器和新页面的容器
        const currentApp = document.getElementById('app');
        const newApp = newDoc.getElementById('app');

        // 3. 核心替换动作：移除旧内容（避开音乐组件）
        Array.from(currentApp.children).forEach(child => {
            if (child.id !== 'global-bgm' && child.id !== 'bgm-btn') {
                child.remove();
            }
        });

        // 4. 将新页面的内容塞进来（避开音乐组件）
        Array.from(newApp.children).forEach(child => {
            if (child.id !== 'global-bgm' && child.id !== 'bgm-btn') {
                currentApp.appendChild(child.cloneNode(true));
            }
        });

        // 5. 更新浏览器地址栏，假装我们真的跳转了
        if (pushHistory) {
            window.history.pushState(null, '', url);
        }

        // 6. 为新加载进来的页面重新绑定点击事件
        initPageLogic();

    } catch(e) {
        console.error("无缝加载失败，降级为普通跳转", e);
        window.location.href = url; // 如果出错，老老实实真跳转
    }
}

/* =========================================
   3. 全局背景音乐逻辑 (含点击解锁)
========================================= */
function initGlobalBGM() {
    const bgm = document.getElementById('global-bgm');
    const bgmBtn = document.getElementById('bgm-btn');
    if (!bgm || !bgmBtn) return;

    // 尝试播放的函数
    const attemptPlay = () => {
        bgm.play().then(() => {
            bgmBtn.classList.add('playing');
            bgmBtn.classList.remove('paused');
            // 播放成功后移除全屏监听，避免浪费性能
            document.body.removeEventListener('click', attemptPlay);
            document.body.removeEventListener('touchstart', attemptPlay);
        }).catch(err => {
            console.log("浏览器拦截自动播放，等待用户任意点击解锁。");
            bgmBtn.classList.add('paused');
        });
    };

    // 无论如何，先挂载一个全局点击监听：只要用户点屏幕，立刻播放！
    document.body.addEventListener('click', attemptPlay, { once: true });
    document.body.addEventListener('touchstart', attemptPlay, { once: true });

    // 首次进入尝试直接播放
    attemptPlay();

    // 右上角按钮手动控制
    bgmBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡到 body 上
        if (bgm.paused) {
            bgm.play();
            bgmBtn.classList.add('playing');
            bgmBtn.classList.remove('paused');
        } else {
            bgm.pause();
            bgmBtn.classList.remove('playing');
            bgmBtn.classList.add('paused');
        }
    });
}

/* =========================================
   4. 各个子页面的专属逻辑
========================================= */

// 答题页逻辑
function initQuizPage() {
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-quiz');

    if (!quizContainer || !submitBtn) return;

    // 1. 题库数据：基于虞山琴派历史设计
    const questions = [
        {
            id: 1,
            question: "虞山琴派（琴川派）的创始人是谁？",
            options: ["A. 严讷", "B. 严天池", "C. 徐上瀛", "D. 吴景略"],
            answer: "B"
        },
        {
            id: 2,
            question: "虞山琴派的核心审美主张（琴学纲领）是哪八个字？",
            options: ["A. 中正平和，大音希声", "B. 刚柔相济，气韵生动", "C. 清微淡远，博大和平", "D. 意境悠远，余韵绵长"],
            answer: "C"
        },
        {
            id: 3,
            question: "由严天池主持编纂，且是唯一被收入《四库全书》的明代琴谱是？",
            options: ["A. 《大还阁琴谱》", "B. 《松弦馆琴谱》", "C. 《溪山琴况》", "D. 《诚一堂琴谱》"],
            answer: "B"
        },
        {
            id: 4,
            question: "由徐上瀛所著，提出了古琴审美“二十四况”，构建了完整美学体系的巨著是？",
            options: ["A. 《溪山琴况》", "B. 《琴川新谱》", "C. 《大还阁琴谱》", "D. 《虞山李氏琴谱》"],
            answer: "A"
        },
        {
            id: 5,
            question: "近现代创立“虞山吴派”，让虞山琴韵重焕生机的一代宗师是？",
            options: ["A. 陈星源", "B. 朱晞", "C. 严天池", "D. 吴景略"],
            answer: "D"
        }
    ];

    // 2. 动态渲染题目到页面
    let htmlContent = '';
    questions.forEach((q, index) => {
        htmlContent += `<div class="question-item" style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 10px;">${index + 1}. ${q.question}</p>
            <div class="options-group" style="display: flex; flex-direction: column; gap: 8px;">`;

        q.options.forEach(opt => {
            // 提取选项字母 (A, B, C, D) 作为 value
            const optValue = opt.charAt(0);
            htmlContent += `
                <label style="cursor: pointer; padding: 5px; background: rgba(255,255,255,0.5); border-radius: 4px;">
                    <input type="radio" name="q${q.id}" value="${optValue}"> 
                    ${opt}
                </label>`;
        });

        htmlContent += `</div></div>`;
    });

    quizContainer.innerHTML = htmlContent;
    submitBtn.style.display = 'block';

    // 3. 提交与计分逻辑
    submitBtn.addEventListener('click', () => {
        let score = 0;
        let answeredCount = 0;

        questions.forEach(q => {
            const selectedOption = document.querySelector(`input[name="q${q.id}"]:checked`);
            if (selectedOption) {
                answeredCount++;
                if (selectedOption.value === q.answer) {
                    score += 20; // 每题20分，满分100
                }
            }
        });

        // 验证是否全部答完
        if (answeredCount < questions.length) {
            alert("请先完成所有题目再提交哦！");
            return;
        }

        // 4. 根据分数评定称号
        let title = "";
        let msg = "";
        if (score === 100) {
            title = "【古音正宗】";
            msg = "全对！你是骨灰级古琴狂热粉丝，对虞山琴派的历史了如指掌！";
        } else if (score >= 80) {
            title = "【清微淡远】";
            msg = "优秀！你已掌握虞山琴派的核心美学，是位资深的古琴爱好者。";
        } else if (score >= 60) {
            title = "【琴川雅客】";
            msg = "不错哦！你对虞山琴派有了基本的了解，期待你进一步探索。";
        } else {
            title = "【抚琴跫音】";
            msg = "初识琴韵，建议再去“千年流芳”版块复习一下虞山琴派的悠久历史哦~";
        }

        // 弹出结果（后续如果你们的大一设计同学做了精美的结果海报，可以替换这里的 alert）
        alert(`你的得分: ${score}分\n获得称号: ${title}\n\n${msg}`);
    });
}

// 音乐交互页逻辑
function initMusicPage() {
    // 1. 获取当前页面的古琴交互元素
    const logo = document.getElementById('guqin-logo');
    const statusText = document.getElementById('music-status');
    const trackBtns = document.querySelectorAll('.track-btn');
    const globalBgm = document.getElementById('global-bgm');
    const bgmBtn = document.getElementById('bgm-btn');

    if(!logo) return;

    let isPlaying = false;
    let currentTrackName = '良宵引';

    // 播放古琴曲时，暂停全局背景音
    logo.addEventListener('click', () => {
        if (isPlaying) {
            statusText.innerText = "已暂停：《" + currentTrackName + "》";
            logo.classList.remove('playing');
            logo.innerText = "点击抚琴";
        } else {
            statusText.innerText = "正在聆听：《" + currentTrackName + "》";
            logo.classList.add('playing');
            logo.innerText = "正在抚琴";

            // 核心：暂停那首英文背景音
            if (globalBgm && !globalBgm.paused) {
                globalBgm.pause();
                if(bgmBtn) {
                    bgmBtn.classList.remove('playing');
                    bgmBtn.classList.add('paused');
                }
            }
        }
        isPlaying = !isPlaying;
    });

    trackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trackBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const trackName = this.getAttribute('data-track');
            const trackDesc = this.getAttribute('data-desc');

            if (currentTrackName === trackName) return;
            currentTrackName = trackName;

            document.getElementById('music-desc').innerText = trackDesc;
            statusText.innerText = "已准备：《" + currentTrackName + "》";
            logo.classList.remove('playing');
            logo.innerText = "点击抚琴";
            isPlaying = false;
        });
    });
}


// 音乐交互页逻辑
function initMusicPage() {
    // 1. 获取当前页面的古琴交互元素
    const logo = document.getElementById('guqin-logo');
    const statusText = document.getElementById('music-status');
    const trackBtns = document.querySelectorAll('.track-btn');
    const globalBgm = document.getElementById('global-bgm');
    const bgmBtn = document.getElementById('bgm-btn');

    if(!logo) return;

    let isPlaying = false;
    let currentTrackName = '良宵引';

    // 播放古琴曲时，暂停全局背景音
    logo.addEventListener('click', () => {
        if (isPlaying) {
            statusText.innerText = "已暂停：《" + currentTrackName + "》";
            logo.classList.remove('playing');
            logo.innerText = "点击抚琴";
        } else {
            statusText.innerText = "正在聆听：《" + currentTrackName + "》";
            logo.classList.add('playing');
            logo.innerText = "正在抚琴";

            // 核心：暂停那首英文背景音
            if (globalBgm && !globalBgm.paused) {
                globalBgm.pause();
                if(bgmBtn) {
                    bgmBtn.classList.remove('playing');
                    bgmBtn.classList.add('paused');
                }
            }
        }
        isPlaying = !isPlaying;
    });

    trackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trackBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const trackName = this.getAttribute('data-track');
            const trackDesc = this.getAttribute('data-desc');

            if (currentTrackName === trackName) return;
            currentTrackName = trackName;

            document.getElementById('music-desc').innerText = trackDesc;
            statusText.innerText = "已准备：《" + currentTrackName + "》";
            logo.classList.remove('playing');
            logo.innerText = "点击抚琴";
            isPlaying = false;
        });
    });
}
