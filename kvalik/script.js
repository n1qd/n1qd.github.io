// Вставляем содержимое шпаргалки как строку
const rawText = `𝗻𝟭𝗾𝗱, [28.06.2025 1:30]
backup:
tar cvpzf backup.tgz –exclude=/proc –exclude=/lost+found –exclude=/backup.tgz –exclude=/mnt –exclude=/sys –exclude=/web /

𝗻𝟭𝗾𝗱, [29.06.2025 23:54]
user groups:
sudo apt install gnome-system-tools

𝗻𝟭𝗾𝗱, [30.06.2025 0:29]
выключить композицию рабочего стола:
gsettings set org.gnome.desktop.interface enable-animations false

gnome-shell --replace &

𝗻𝟭𝗾𝗱, [30.06.2025 0:53]
SSH
ip add

sudo apt install openssh-server
sudo systemctl enable --now ssh
sudo systemctl status ssh


проверка через Putty
df
https://disk.yandex.ru/i/m_nJ-0L5_n0CeA

𝗻𝟭𝗾𝗱, [30.06.2025 1:31]
установочный образ
sudo dd if=/dev/sda of=~/Desktop/system_image.img bs=4M status=progress

𝗻𝟭𝗾𝗱, [30.06.2025 1:40]
в Linux уже есть множество встроенных логов, которые система и различные сервисы создают автоматически. Эти логи содержат информацию о событиях, ошибках, предупреждениях и другой системной информации. Вот некоторые из основных логов, которые вы можете найти на системе Ubuntu:

/var/log/syslog - Основной системный журнал, содержащий информацию о событиях системы и приложений.

/var/log/auth.log - Содержит информацию об авторизации, включая попытки входа в систему и использования sudo.

/var/log/kern.log - Журнал ядра, содержащий сообщения, сгенерированные ядром Linux.

/var/log/dmesg - Содержит сообщения, сгенерированные ядром во время загрузки системы.

/var/log/boot.log - Информация о процессе загрузки системы.

/var/log/cron.log - Логи задач, выполняемых планировщиком cron.

/var/log/apt/history.log и /var/log/apt/term.log - Логи, связанные с установкой и обновлением пакетов через APT.

𝗻𝟭𝗾𝗱, [30.06.2025 13:13]
принтер

sudo apt install cups-pdf`;

// Новый парсер: разбиваем по разделителям, заголовок — первая непустая строка после разделителя
function parseBlocks(text) {
  const blocks = [];
  const regex = /𝗻[\d𝗾𝗱]+, \[\d{2}\.\d{2}\.\d{4} \d{1,2}:\d{2}\]/g;
  let matches = [...text.matchAll(regex)];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i][0].length;
    const end = (i + 1 < matches.length) ? matches[i + 1].index : text.length;
    const blockText = text.slice(start, end).trim();
    if (!blockText) continue;
    // Первая непустая строка — заголовок
    const lines = blockText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const title = lines[0];
    const content = blockText;
    blocks.push({ title, content });
  }
  return blocks;
}

const blocks = parseBlocks(rawText);

// Строим оглавление
const toc = document.getElementById('toc');
const contentArea = document.getElementById('content-area');
const searchInput = document.getElementById('search');

function renderTOC(filteredBlocks) {
  toc.innerHTML = '';
  filteredBlocks.forEach((block, idx) => {
    const li = document.createElement('li');
    li.textContent = block.title;
    li.onclick = () => {
      document.querySelectorAll('#toc li').forEach(el => el.classList.remove('active'));
      li.classList.add('active');
      contentArea.textContent = block.content;
    };
    toc.appendChild(li);
  });
}

// Поиск по всем блокам
searchInput.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  if (!q) {
    renderTOC(blocks);
    contentArea.textContent = 'Выберите раздел или воспользуйтесь поиском.';
    return;
  }
  const filtered = blocks.filter(b => b.title.toLowerCase().includes(q) || b.content.toLowerCase().includes(q));
  renderTOC(filtered);
  if (filtered.length === 1) {
    contentArea.textContent = filtered[0].content;
    document.querySelectorAll('#toc li')[0]?.classList.add('active');
  } else if (filtered.length === 0) {
    contentArea.textContent = 'Ничего не найдено.';
  } else {
    contentArea.textContent = 'Выберите раздел из списка.';
  }
});

// Инициализация
renderTOC(blocks); 