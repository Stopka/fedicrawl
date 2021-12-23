export interface NodeProvider {
    getKey:()=>string,
    retrieveNodes: (domain: string, page:number)=> Promise<string[]>
}
