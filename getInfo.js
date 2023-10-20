
const { createInstance } = require('dotbit');
const dotbit_Info = createInstance();


//获取profile绑定中的discord名字信息
async function getProfile(account) {
    try {
        const result = await dotbit.account(account).records("profile.discord");
        const value = result[0].value;
        return value;
    } catch (error) {
        return null;
    }
  }


//获取账户状态等信息
async function getAccountInfo(account){
    try{
    const Info=await dotbit_Info.accountInfo(account);
    const data={
        'enable_sub_account':Info.enable_sub_account,
        'create_at_unix':Info.create_at_unix,
        'expired_at_unix':Info.expired_at_unix,
        'status':Info.status,
  
    }
    return data;
    }catch(error){
        return null;
    }
}

//获取账户关联的地址（eth，bnb，matic，tron，doge）（cointype：60， 3， 195）
//参数：账户名  根据账户名查询地址 返回一个地址和cointype
async function getAddress(account){
    try{
        const addressData = dotbit.addresses(account)
        const cointype = addressData.coin_type
        const address = addressData.value



        return address;
    }
    catch(error){
        return null;
    }
     



}

//根据地址查数量
//参数：地址数组  循环查询这个地址，并且过滤二级账户，统计一级账户的数量

module.exports = {
    getAccountInfo,
    getProfile
}