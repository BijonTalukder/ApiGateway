const { orderService } = require("../shared/axios")

const orderCrateService= async (req)=>{
    const result =orderService.post('',req.body,{
        headers:{
            Authorization:req.headers.authorization
        }
    })

    return result;
}