
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The erroeMessage is importent! it will be written in the audit log and help the user to understand what happen
*/
import jwtDecode from "jwt-decode";
const resultObject = {};

exports.install = async (Client, Request) => {
    const distUUID = jwtDecode(Client.OAuthAccessToken)['pepperi.distributoruuid'];
    // protection from installing on distributors by mistake.
    // there is also another protection that the dictionray resources iframesDic not loaded for userRole!="VARAdmin"
    if (distUUID!='be266ef2-9759-4a7b-b75a-6e2422815674' && distUUID!='063be5e2-d21f-4517-90a4-8c856847d88b' && distUUID!='8141752a-a033-4f4b-8b06-1ea4923f1464')
    {
        return {
            success:false,
            errorMessage: 'This addon cant be installed on this distributor'}
    }
    else{
        return {
            success:true,
            resultObject: resultObject
        }
    }
    
}
exports.uninstall = async (Client, Request) => {
    return {success:true}
}
exports.upgrade = async (Client, Request) => {
    return {
        success:true,
        resultObject: resultObject
    }
}
exports.downgrade = async (Client, Request) => {
    return {
        success:true,
        resultObject: resultObject
    }
}