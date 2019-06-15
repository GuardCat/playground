
function HappyNewYear {

  constructor(year) {
    this.year = year;
    this.previousYear = +year - 1;
    this.actiondCount = 0;
    this.actionsFlags = {};
    this.needActionsCount = 5;
  }
  
  isHappy() {
    return this.actionsCount >= this.needActionsCount;
  }
  
  

}