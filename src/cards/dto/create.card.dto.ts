export class CreateCardDto {
    readonly  value : string;
    readonly description : string;
    readonly deadline : Date;
    readonly color : string;
    readonly listId : number
}