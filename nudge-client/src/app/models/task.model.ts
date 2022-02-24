export class Task {
    step_id: number;
    step: String = ""; 
    task:String = "";
    workflow:String = "";  
    tags:String = "";  
    action:String = "";  
    klevel:Number = 1;  
    due:String = "";  
    dueDate:Date = new Date(); 
    space:String = "";   
    datetime:String = "";
    doneOn:Date = new Date;  
    isActivity:boolean = false;
}
