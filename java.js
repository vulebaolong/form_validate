
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = getComputedStyle.bind();


const formElement = $(".form");
// const form_groupElement = formElement.querySelector('.form_group')
// const inputElement = form_groupElement.querySelector('.form_group')







const app = {
    Handle: function () {
        _this = this
        var min = 6;
        var Gmail = false;
        var Password = false;
        var RePassword = false;
        var valuePassword;

        var inputElement = document.querySelectorAll('input[name]');
        inputElement.forEach(function (e) {
            e.addEventListener('focusout', focusout)
            e.addEventListener('input', oninput)
        })
        function focusout(e) {
            ele = _this.getElement(e);
            result = _this.isRequired(ele.inputElement.value)
            _this.validate(result,
                ele.form_groupElement,
                ele.errorMesElement, ele);
            if (result == undefined) {
                Gmail = true
                Password = true
                RePassword = true
            }
            if (ele.nameInputEle == "Gmail" && Gmail == true) {
                result = _this.isGmail(ele.inputElement.value)
                _this.validate(result,
                    ele.form_groupElement,
                    ele.errorMesElement, ele);
                Gmail = false
            }
            if (ele.nameInputEle == "Password" && Password == true) {
                result = _this.isMinLength(ele.inputElement.value, min)
                _this.validate(result,
                    ele.form_groupElement,
                    ele.errorMesElement, ele);
                Password = false
                valuePassword = ele.inputElement.value;
                RePasElement = formElement.querySelector('input[Name ="Re-Password"]')
                if (RePasElement.value == valuePassword) {
                    RePasGroupElement = RePasElement.closest('.form_group');
                    RePaserrorMesElement = RePasGroupElement.querySelector('.error_mes')
                    RePasGroupElement.classList.remove('invalid')
                }
            }
            if (ele.nameInputEle == "Re-Password" && RePassword == true) {
                result = _this.isMinLength(ele.inputElement.value, min)
                if (!result) {
                    result = _this.isRepPssword(ele.inputElement.value, valuePassword)
                }
                _this.validate(result,
                    ele.form_groupElement,
                    ele.errorMesElement, ele);
                RePassword = false
            }
        }
        function oninput(e) {
            ele = _this.getElement(e);
            value = ele.inputElement.value;
            ele.form_groupElement.classList.remove('invalid')
        }
    },

    getElement: function (e) {
        inputElement = e.target
        form_groupElement = inputElement.closest('.form_group')
        errorMesElement = form_groupElement.querySelector('.error_mes')
        nameInputEle = inputElement.getAttribute("name");
        return {
            inputElement: inputElement,
            form_groupElement: form_groupElement,
            errorMesElement: errorMesElement,
            nameInputEle: nameInputEle,
        }
    },


    validate: function (result, form_groupElement, errorMesElement, ele) {
        if (result) {
            errorMesElement.innerHTML = result;
            form_groupElement.classList.add('invalid')
        }
    },

    isRequired: function (value) {
        if (value.trim()) {
            return undefined;
        }
        return 'Vui lòng nhập trường này'
    },

    isGmail: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(value)) {
            return undefined;
        }
        return 'Vui lòng nhập đúng Gmail'
    },

    isMinLength: function (value, min) {
        if (value.length >= min) {
            return undefined;
        }
        return `Vui lòng nhập tối thiểu ${min} ký tự`
    },

    isRepPssword: function (value, valuePassword) {
        if (value == valuePassword) {
            return undefined;
        }
        return 'Mật khẩu nhập lại không khớp'
    },

    start: function () {
        this.Handle()
    }
}




app.start();


