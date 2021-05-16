
function obfee_addHideButtons() {
    const foundANodes = document.querySelectorAll("a[href^='https://profile.onliner.by/user']:not([class^='news-comment__image']):not([obfee_generated='1']):not([class^='news-comment__subname'])");
    foundANodes.forEach(node => {
        node.setAttribute("obfee_generated", "1");

        const hideButton = document.createElement('button');
        hideButton.setAttribute('title', 'Скрывать / Показывать комментарии этого профиля');
        hideButton.innerHTML = `Скрыть навсегда!`;

        const profileUrl = node.getAttribute('href');
        hideButton.addEventListener('click', () => {
            obfee_thisIsBot(profileUrl);
        });
        node.parentNode.appendChild(hideButton);
    });
};

function obfee_hideTexts() {
    const blockedProfiles = JSON.parse(localStorage.getItem('obfee_blocked_v2') ?? '[]');
    const foundANodes = document.querySelectorAll("a[href^='https://profile.onliner.by/user']:not([class^='news-comment__image']):not([obfee_hided='1']):not([class^='news-comment__subname'])");
    foundANodes.forEach(node => {
        const profileUrl = node.getAttribute('href');
        if (blockedProfiles.indexOf(profileUrl) != -1) {
            node.setAttribute("obfee_hided", "1");

            let searchNode = node;
            while (searchNode && searchNode.getAttribute('class') != 'news-comment__unit') {
                searchNode = searchNode.parentNode;
            }

            // searchNode.parentNode.removeChild(searchNode);
            console.log('CENSORED: ', profileUrl, searchNode);
            searchNode.innerHTML = 'Сообщение скрыто';
            // if (searchNode) {
            //     searchNode.childNodes.forEach(childNode => {
            //         if (childNode.getAttribute('class') == 'news-comment__speech news-comment__speech_base' ||
            //             childNode.getAttribute('class') == 'news-comment__preview') {
            //             childNode.style.opacity = "0.01";
            //         }
            //     })
            // }
        }
    });
};

function obfee_thisIsBot(profileUrl) {
    let blockedProfiles = JSON.parse(localStorage.getItem('obfee_blocked_v2') ?? '[]');
    if (blockedProfiles.indexOf(profileUrl) == -1) {
        blockedProfiles.push(profileUrl);
    } else {
        blockedProfiles = blockedProfiles.filter(item => item != profileUrl);
        alert('Перезагрузите страницу');
    }
    localStorage.setItem('obfee_blocked_v2', JSON.stringify(blockedProfiles));
};

function obfee_refresh() {
    obfee_addHideButtons();
    obfee_hideTexts();
};

if (!window['obfee_interval']) {
    obfee_refresh();
    window['obfee_interval'] = setInterval(obfee_refresh, 5000);
}


