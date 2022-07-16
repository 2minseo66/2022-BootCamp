/*첫번째 문제*/
for(var i=2; i<10; i++){
    console.log('------' + i + '단 시작------')
    for(var j=1; j<10; j++){
        console.log(i + "*" + j + "=" + i*j + "\t")
    }
}

/*두번째 문제*/
const date = new Date(2017, 9, 3, 18, 20, 30);
console.log('date : %s', date.toLocaleString());
console.log('LocalDateString : %s',date.toLocaleDateString());
console.log('LocalTimeString : %s',date.toLocaleTimeString());
console.log('year : %s',date.getFullYear());
console.log('month : %s',date.getMonth());
console.log('date : %s',date.getDate());
console.log('hours : %s',date.getHours());
console.log('minutes : %s',date.getMinutes());
console.log('seconds : %s',date.getSeconds());
/*세번째 문제*/
var arr = [95, 80, 88, 79, 50];
var max = 0;
var min = arr[0];


for(var i=0; i<arr.length; i++){
    if(arr[i]>max){
        max = arr[i];
    }
    if(arr[i]<min){
        min = arr[i];
    }
}
function sum(a,b){
    return a+b;
}

function average(a, b){
    var sum = a+b;
    return sum/2;
}

console.log('max : ' + max);
console.log('min : ' + min);
console.log('sum : ' + sum(max, min));
console.log('average : ' + average(max, min));

/*네번째 문제*/
const students = [
    {name: 'kyeongrok' , score: 85 },
    {name: 'jihyun' , score: 95 },
    {name: 'minsup' , score: 76 }
];

function getDegree(score){
    if(score >= 90){
        return 'A';
    }else if(score >= 80){
        return 'B';
    }else if(score>=60){
        return 'C';
    }else{
        return'F';
    }
}

students.forEach((ele) => { 
    const result = `name : ${ele.name} score : ${getDegree(ele.score)}`;
    console.log(result);
});



