export function switchPlayer(aP:string,rS:any){
    var rc = document.querySelector(aP) as HTMLDivElement;
    rc.innerText = rS;
}
