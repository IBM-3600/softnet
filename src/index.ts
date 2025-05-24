import Softnet from "./softnet";

const app = new Softnet();
app.get("/",(req,res)=>{
        res.end("hello World!")
})
app.listen(3000,()=>{
    console.log("listening on port: 3000 ...")
})
console.log("kello world");
class ModuleRegister{
    modules = new Map<string,Object>();
    constructor(){
    }
    addModule(name:string,module:Object){
        this.modules.set(name,module)
    }

}