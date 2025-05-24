import http,{IncomingMessage,ServerResponse} from 'http';
type Handler =(req:IncomingMessage,res:ServerResponse) => void;

interface netface{
    get:(path:string,callback:Handler)=>void;
    post:(path:string,callback:Handler)=>void;
    put:(path:string,callback:Handler)=>void;
    delete:(path:string,callback:Handler)=>void;
}
enum method{
    GET="GET",
    POST="POST",
    PUT="PUT",
    UPDATE="UPDATE",
    DELETE="DELETE"
}
class Softnet implements netface{
    constructor(){
        
    }
    private routes:{[key: string]: Handler} ={};
    private call(requestMethod:method,path: string, handler: Handler):void{
        this.routes[`${requestMethod} ${path}`] = handler;
    };
    get(path: string, callback: Handler):void{
       this.call(method.GET,path,callback);
    };
    post(path: string, callback: Handler){
        this.call(method.POST,path,callback);
    }
    put(path: string, callback: Handler){
        this.call(method.PUT,path,callback);
    }

    delete(path: string, callback: Handler){
        this.call(method.DELETE,path,callback);
    }

    listen(port:number,callback:()=>void){
        const server = http.createServer((req,res)=>{
            const routeKey = `${req.method} ${req.url}`;
            const handler = this.routes[routeKey]
            if(handler){
                handler(req,res);
            }else{
                res.statusCode = 404;
                res.end('Not Found');
            }
            })
            
            server.listen(port,callback)
    }
    
}

export default Softnet;