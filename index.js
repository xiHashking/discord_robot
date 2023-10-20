const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const fs = require('fs');

const PREFIX = '!';

  
client.on('message', message => {
  if (message.author.bot) return; 
  if (!message.content.startsWith(PREFIX)) 
  {
    message.reply('错误:验证命令:!verify+xxxx.bit or !verify space xxxx.bit');
    return;} 

  const args = message.content.slice(PREFIX.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command !== 'verify') {
    message.reply('错误:验证命令为!verify+xxxx.bit or !verify space xxxx.bit');
    return;}

    const isVip = args[0] === 'vip';
    const bitAccount = args[isVip ? 1 : 0];
    
    /*
    if (!verifiedAccounts[bitAccount]) {   
      message.reply('未找到对应的 .bit 账号！验证命令:!verify+xxxx.bit or !verify space xxxx.bit');
      return;
    }
    */
    // 这要加一个验证看看这个.bit账号是否被注册过，未注册返回 Error: This .bit account is not registered.        


    //判断.bit账户是否含有emoji
    const regex = /::/g;
    const matches = bitAccount.match(regex);
    if (matches && matches.length >= 2) {
        fs.readFile('emoji.json', 'utf-8', (err, data) => {
        if (err) {
          console.error('无法读取文件:', err);
          return;
        }
        // 将文件内容解析为 JSON 对象
        const emojiMap = JSON.parse(data);
        // 使用 emojiMap 进行替换
        const replacedbitAccount = replaceEmojis(bitAccount, emojiMap);
        bitAccount=replacedbitAccount;
      });
    } 


    // 获取discordId
    discordId = message.author.id;
  
    //const { discordId, bitAmount } = verifiedAccounts[bitAccount];  查询数量调用函数

    if (isVip) {
      if (bitAmount >= 50) {
        // 给 ROLE B
        const roleB = message.guild.roles.cache.find(role => role.name === 'ROLE B');
        if (roleB) {
          const member = message.guild.members.cache.get(discordId);
          if (member) member.roles.add(roleB);
        }
      } else if (bitAmount >= 10 && bitAmount < 50) {
        // 给 ROLE A
        const roleA = message.guild.roles.cache.find(role => role.name === 'ROLE A');
        if (roleA) {
          const member = message.guild.members.cache.get(discordId);
          if (member) member.roles.add(roleA);
        }
      } else {
        message.reply('未满足条件！持有数量不足！');
      }
    } else {
      if (discordId === message.author.id) {   //54行，discordId 就是这么赋值的，，，
        // 对接收到的.bit账户进行解析
      (async () => {
        const ResAccountInfo = await getAccountInfo(bitAccount);

        if (!ResAccountInfo) {
          message.reply('.bit 账户不存在！');
          return;
        }

        const expired_at_unix = ResAccountInfo.expired_at_unix;
        const status = ResAccountInfo.status;

        const rightNow = Math.floor(Date.now() / 1000); // 获取当前时间的时间戳（以秒为单位）
        const timeDifferenceInSeconds = rightNow - expired_at_unix;

        // 将差异时间（以秒为单位）转换为天数
        const timeDifferenceInDays = timeDifferenceInSeconds / (24 * 60 * 60); // 1天有24小时，1小时有60分钟，1分钟有60秒

        if (timeDifferenceInDays > 0 && timeDifferenceInDays < 90) {
          message.reply('.bit 账号处于过期保护状态！');
          return;
        }

        if (status === 3) {
          message.reply('.bit 账号处于NFT状态！');
          return;
        }

        if (status !== 0 && status !== 1) {
          message.reply('.bit 账号处于异常状态！');
          return;
        }

        const value = await getProfile(bitAccount);
        if (value == null) {
          message.reply('.bit 账号未解析信息！');
          return;
        }

        if (value !== discordId) {
          message.reply('.bit 账号解析信息不一致！');
          return;
        }

        // .bit 账号正常且解析信息成功！
      })();
        // 给Role
        const roleToGrant = message.guild.roles.cache.find(role => role.name === '.bit Owner');
        if (roleToGrant) {
          const member = message.guild.members.cache.get(discordId);
          if (member) {
          member.roles.add(roleToGrant);
          message.reply('.bit 账号正常且解析信息成功！');
          return;
          }
        }
      } 

        message.reply('账号与当前 Discord ID 不匹配！');
        return;
      
    
  }
});

client.login(token);
