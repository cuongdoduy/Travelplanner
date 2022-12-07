function checkYear(value)
{
    if ((value%400==0)&&(value%100==0)) return true;
    if (value%4==0) return true;
    return false;
}
function daysofMonth(value,year){
    switch(value){
        case 1:
            return 31;
        case 3:
            return 31;
        case 5:
            return 31;
        case 7:
            return 31;
        case 8:
            return 31;
        case 10:
            return 31;
        case 12:
            return 31;    
        case 4:
            return 30;
        case 6:
            return 30;
        case 9:
            return 30;
        case 11:
            return 30;
        case 2:
        if (checkYear(year)==true) return 29; else return 28; 
    }
}
export function CountDates(value){
    let d=new Date();
    const day=parseInt(value[8]+value[9]);
    const month=parseInt(value[5]+value[6]);
    const year=parseInt(value[0]+value[1]+value[2]+value[3]);
    const day2=parseInt(d.getDate());
    const month2=parseInt(d.getMonth())+1;
    let year2=parseInt(d.getFullYear())
    if (year>year2)
    {
        let count=0;
        let getDay=daysofMonth(month2,year2);
        count+=getDay-day2+day;
        for(let i=1;i<=month-1;i++)
        {
            count+=daysofMonth(i,year)
        }
        //console.log(count);
        for(let i=month2+1;i<=12;i++)
        {
            count+=daysofMonth(i,year2);
        }
        year2+=1;
        while(year2!=year)
        {
            if (checkYear(year2)) count+=366; else count+=365;
            year2++;
        }
        return count;
    }
    else
    if (year==year2)
    {
       if (month==month2) return day-day2;
       let count=0;
       let getDay=daysofMonth(month2,year2);
       count+=getDay-day2+day;
       for(let i=month2+1;i<=month-1;i++)
        {
            count+=daysofMonth(i,year);
        }
        return count;
    }
}