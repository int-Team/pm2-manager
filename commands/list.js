const Discord = require('discord.js');
let statuses = {
    online: '🟢 온라인',
    stopped: '🔴 정지됨',
    launching: '🟡 프로세스 시작 중',
    errored: '🔴 에러',
    stopping: '🟡 프로세스 정지 중'
}
module.exports = {
    name: 'list',
    aliases: ['리스트', 'ㅣㅑㄴㅅ', 'fltmxm', '목록', 'ahrfhr', 'ls', 'ㅣㄴ'],
    description: '실행중인 프로세스 목록을 보여줘요.',
    usage: 'list',
    run: async (client, message, args) => {
        let lists = JSON.parse(require('child_process').execSync('pm2 jlist').toString());
        const embed = new Discord.MessageEmbed()
        .setTitle('프로세스 리스트')
        .setColor('RANDOM')
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp();
        for (let x of lists) {
            embed.addField(x.name, `상태: ${statuses[x.pm2_env.status]}\nID: ${x.pm_id}\n실행 모드: ${x.pm2_env.exec_mode}\n프로세스 ID(PID): ${x.pid}\n업타임: ${Math.floor((new Date() - x.pm2_env.created_at) / 360000) / 10}시간\n재시작 횟수: ${x.pm2_env.restart_time}회\nCPU 사용량: ${x.monit.cpu}%\nRAM 사용량: ${x.monit.memory / 1048576|0}MB`, true);
        }
        message.channel.send(embed);
    }
}