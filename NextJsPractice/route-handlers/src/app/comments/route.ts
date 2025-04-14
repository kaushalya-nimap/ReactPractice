import { comments } from "./data";
export async function GET(){
    return Response.json(comments)
//return new Response("Hello world")
}
export async function POST(request:Request){
   const comment=await request.json()
   const newComment={
      id:comments.length+1,
      text:comment.text
   };
   comments.push(newComment);
   return new Response(JSON.stringify(newComment),{
      headers:{'content-type':'application/json'},
      status:201
   })

}
export async function Patch(request:Request,{params}:{params:Promise<{id:string}>}) {
   const {id}=await params;
   const body=await request.json();
   const{text}=body;
   const index=comments.findIndex((comment)=>comment.id===parseInt(id));
   comments[index].text=text
   return Response.json(comments[index]);
}