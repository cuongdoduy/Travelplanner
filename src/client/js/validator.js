export function Validator(options){
    function validate (inputElement,rule)
    { 
            var ParentElement=inputElement.parentElement;
            var formmessage=ParentElement.querySelector('.form-message');
            var errorMessage = rule.test(inputElement.value);
                    if (errorMessage)
                    {
                        formmessage.textContent=errorMessage;
                        ParentElement.classList.add("invalid");
                    }
                    else
                    {   
                        formmessage.textContent=errorMessage;
                        ParentElement.classList.remove("invalid");
                    }  
    };
    var formElement=document.querySelector(options.form);
    if (formElement)
    {
        options.rules.forEach(function(rule){
            var inputElement= formElement.querySelector(rule.selector);
            if (inputElement)
            {
                
                inputElement.onblur=function()
                {
                    validate (inputElement,rule);                    
                }
                inputElement.oninput=function()
                {
                    var formmessage=inputElement.parentElement.querySelector('.form-message');
                    formmessage.textContent="";
                    inputElement.parentElement.classList.remove("invalid");
                }
            }
        });
    }

}
Validator.isRequired = function(selector){
    return{
        selector:selector,
        test: function(value){
            return value.trim() ? undefined:'Please fill in the blank';
        }
    };
}
Validator.pickerDay = function(selector){
    return{
        selector:selector,
        test: function(value){
            return value.trim() ? undefined:'Please pick the day';
        }
    };
}
Validator.checkDay = function(selector){
    return{        
        selector:selector,
        test: function(value){
            let d = new Date();
            const day=parseInt(value[8]+value[9]);
            const month=parseInt(value[5]+value[6]);
            const year=parseInt(value[0]+value[1]+value[2]+value[3]);
            if (year<parseInt(d.getFullYear())) 
            {
                return 'The day is invalid';
            }
            if (year==parseInt(d.getFullYear()))
            {
                if (month<(parseInt(d.getMonth())+1)) return 'The day is invalid';
                if (month==(parseInt(d.getMonth())+1))
                {
                    if (day<parseInt(d.getDate()))
                    {
                        return 'The day is invalid';
                    }
                }
            }
        }
    };
}
