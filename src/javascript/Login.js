// đối tượng validate
function validator(options) {
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    var selectorRules = {}

    function validate(inputElement, rule) {
        var errorMessage
        // var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)

        // var lay ra tung rule cua selector
        var rules = selectorRules[rule.selector]
        for(var i=0;i < rules.length ; i++){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    )
                    break
                default: 
                errorMessage = rules[i](inputElement.value)
            }
            if(errorMessage) break
        } 

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ""
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage
    }
    var formElement = document.querySelector(options.form)

    if (formElement) {
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)
                if(!isValid){
                    isFormValid = false
                }
            })
            
            if(isFormValid){
                if(typeof options.onSubmit ==='function'){
                    var enableInput = formElement.querySelectorAll('[name]')
                    var formValue = Array.from(enableInput).reduce(function(values, input){
                        switch(input.type){
                            case 'radio':
                            case 'checkbox':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value 
                                break
                            default:
                                values[input.name] = input.value
                        }

                        return values
                    }, {});

                    options.onSubmit(formValue)
                }
            }
        }

        options.rules.forEach(function(rule) {
            // lưu lại các rules cho mỗi input

            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }else{
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElements = formElement.querySelectorAll(rule.selector)
           
            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
            Array.from(inputElements).forEach(function(inputElement){
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }
                // xử lý mỗi khi nguoif dùng nhập vào input
                inputElement.oninput = function() {
                    errorElement.innerText = ""
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })
            if (inputElement) {
                

            }
        });
    }
}

validator.isEmail = function(selector,message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || "Mục này phải là Email!"
        }
    }
}
validator.isRequired = function(selector,message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined :message ||  'Mục này không được để trống!'
        }
    }
}
validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Mật khẩu phải có ít nhất ${min} ký tự!`
        }
    }
}
validator.isConfirm = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || `Giá trị nhập vào không chính xác!`
        }
    }
}