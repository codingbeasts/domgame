//creating a genricParameter function.
export function genricParam(id: string, val: any) {
  let element = document.getElementById(id) as HTMLDivElement;
  element.textContent = val;
}
