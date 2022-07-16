function fibonacci(i){
    if(i<=2){
        return 1;
    }else{
        return fibonacci(i-2) + fibonacci(i-1);
    }
}
for(var i = 1; i<10; i += 1){
    console.log(fibonacci(i));
}
