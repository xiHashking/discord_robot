
  
  
  //替换表情符
  function replaceEmojis(bitAccount, emojiMap) {
    let replacedbitAccount = bitAccount;
     
    for (const emoji in emojiMap) {
      const regex = new RegExp(emoji, 'g');
      replacedbitAccount = replacedbitAccount.replace(regex, emojiMap[emoji]);
    }
  
    return replacedbitAccount;
  }

  //替换含有emoji的地址

  
  