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

// Удаляем строки с автором и временем
const cleanedText = rawText.replace(/^𝗻[\d𝗾𝗱]+, \[\d{2}\.\d{2}\.\d{4} \d{1,2}:\d{2}\]\s*/gm, '');

document.getElementById('content-area').innerText = cleanedText; 