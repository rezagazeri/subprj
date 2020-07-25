const Handlebars = require('handlebars');
const fs = require("fs")
const moment = require('moment-jalaali')

async function surathesabYekHesab(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تاریخ</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">زمان تراکنش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره جایگاه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره سریال
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شرح
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بستانکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بدهکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مانده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">درگاه
            </span>
            </font></font></font>
            </p>
            </td>
            
        </tr>
    </thead>
    {{#each items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{bankAccount.bank.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber identifier}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber sourceTransactionId}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{concessionaire.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.customerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{description}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber amount}}
                    {{else}}
                    {{PersianNumber 0}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                        {{PersianNumber 0}}
                    {{else}}
                        {{PersianNumber amount}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{newBalance}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{method.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/each}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function bankAccountList(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجوز دسته چک
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مالی حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">منطقه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ناحیه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4" style="border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber accountNumber}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{ownerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                     {{#if hasChequePermission}}
                    دارد
                    {{else}}
                    ندارد
                    {{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{financialType.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3" style="border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{accountType.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function customerList(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if customerName}}{{customerName}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if concessionaire.name}}{{concessionaire.name}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if depositId}}{{depositId}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if extraInfo.financialCode}}{{extraInfo.financialCode}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if extraInfo.salesCode}}{{extraInfo.salesCode}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if supplyChannel.name}}{{supplyChannel.name}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if customerType.name}}{{customerType.name}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if extraInfo.address}}{{extraInfo.address}}{{else}}-{{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function areaList(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام ناحیه</span>
            </font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام منطقه</span>
            </font></font></font>
            </p>
            </td>
            
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت 
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تعداد مشتری
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{parent.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    نامشخص
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#if publicDepositId}}
                        {{publicDepositId}}
                    {{else}}
                        نامشخص
                    {{/if}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{financialCode}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{salesCode}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber bankAccounts}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function regionList(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام ناحیه</span>
            </font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام منطقه</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت عمومی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تعداد مشتری
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function surathesabManateghvaNavahi(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تاریخ
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">زمان
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام شعبه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد حسابگری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره سریال
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شرح
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بستانکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بدهکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مانده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">درگاه
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#each items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber bankAccount.accountNumber}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{bankAccount.bank.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber identifier}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber sourceTransactionId}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.customerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{description}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber amount}}
                    {{else}}
                    {{PersianNumber 0}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                        {{PersianNumber 0}}
                    {{else}}
                        {{PersianNumber amount}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{newBalance}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{method.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/each}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function surathesabMoshtari(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تاریخ
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">زمان
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام شعبه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد حسابگری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره سریال
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شرح
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بستانکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بدهکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مانده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">درگاه
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{source.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{identifier}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{sourceTransactionId}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.customerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{description}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                        {{PersianNumber amount}}
                    {{else}}
                        {{PersianNumber 0}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                        {{PersianNumber 0}}
                    {{else}}
                        {{PersianNumber amount}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber newBalance}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{method.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
/*Not Implemented*/async function VaziatGardeshManateghVaNavahi(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                    <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                        <span lang="fa-IR">ردیف
                    </span></font></font></font>
                </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
/*Not Implemented*/async function VaziatGardeshManategh(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
/*Not Implemented*/async function KholaseAmalkard(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
/*Not Implemented*/async function BalanceTransfer(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function MandeHesabYektarafeManateghVaNavahi(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function CorporateStationsAccountBalance(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function TransactionInquiry(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تاریخ
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">زمان
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">نام شعبه
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">کد حسابگری
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره سریال
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شرح
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بستانکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بدهکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مانده
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber customerId}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.customerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{surce.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber identifier}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber sourceTransactionId}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.customerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{description}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber amount}}
                    {{else}}
                    {{PersianNumber 0}}
                    {{/ifEquals}}                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber 0}}
                    {{else}}
                    {{PersianNumber amount}}
                    {{/ifEquals}}                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PerianNumber newBalance}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function AccountsWithoutCheque(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مالی خساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجوز دسته چک
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تعداد برگه چک صادر شده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تاریخ صدور
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber accountNumber}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{ownerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{financialType.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    ندارد
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    نامشخص
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    نامشخص
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
/*Not Implemented*/async function CustomerDepositStats(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">ردیف
            </span></font></font></font>
            </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام مشتری</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام صاحب امتیاز
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره حساب
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شناسه پرداخت
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد مالی
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد فروش
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مجرای عرضه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نوع مشتری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">آدرس
            </span>
            </font></font></font>
            </p>
            </td>
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{@index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function InvalidCustomerDeposits(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                    <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR">ردیف
                    </span></font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">شماره حساب
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">نام مشتری
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تاریخ</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">زمان
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام شعبه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد حسابگری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره سریال
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شرح
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بستانکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">مبلغ بدهکار
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">مانده
                </span>
                </font></font></font>
                </p>
            </td>
            
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber bankAccount.accountNumber}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.customerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{source.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber identifier}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber sourceTransactionId}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.concessionaire.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{description}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber amount}}
                    {{else}}
                    {{PersianNumber 0}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber 0}}
                    {{else}}
                    {{PersianNumber amount}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{newBalance}}
                    </span>
                    </font></font></font>
                </p>
            </td>
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}
async function CorrectiveTransactions(json){
    //console.log(json)
    const tblTpl = header+`<table dir="rtl" width="100%" cellpadding="7" cellspacing="0" style="font-family: IRANSansWeb, sans-serif">
    <thead>
        <tr>
            <td width="1%" height="21" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                    <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR">ردیف
                    </span></font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">شماره حساب
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">نام مشتری
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="1%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">تاریخ</span>
            </font></font></font>
            </p>
            </td>
            <td width="20%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">زمان
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="19%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام شعبه
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">کد حسابگری
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شماره سریال
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">نام واریز کننده
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">شرح
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
            <p align="center">
            <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
            <span lang="fa-IR">مبلغ بستانکار
            </span>
            </font></font></font>
            </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">مبلغ بدهکار
                </span>
                </font></font></font>
                </p>
            </td>
            <td width="21%" bgcolor="#4472c4" style="background: #4472c4;border: none; padding: 0in">
                <p align="center">
                <font color="#ffffff"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                <span lang="fa-IR">مانده
                </span>
                </font></font></font>
                </p>
            </td>
            
        </tr>
    </thead>
    {{#items}}
    <tbody>
        <tr>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{inc @index}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber bankAccount.accountNumber}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="1%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif">
                    <font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.customerName}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToDate sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{convToTime sourceCreatedAt}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{source.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    -
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber identifier}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{PersianNumber sourceTransactionId}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{customer.concessionaire.name}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{description}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber amount}}
                    {{else}}
                    {{PersianNumber 0}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{#ifEquals type.effect 'decrease'}}
                    {{PersianNumber 0}}
                    {{else}}
                    {{PersianNumber amount}}
                    {{/ifEquals}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            <td width="12%" height="14" bgcolor="#d9e2f3" style="background: #d9e2f3;border: none; padding: 0in">
                <p align="center">
                    <font color="#212529"><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">
                    <span lang="fa-IR" style="font-weight: normal">
                    {{newBalance}}
                    </span>
                    </font></font></font>
                </p>
            </td>
            
        </tr>
    </tbody>
    {{/items}}
</table>`+footer
    return Handlebars.compile(tblTpl)(json)
}

Handlebars.registerHelper("inc", function(value, options)
{
    return PersianDate(parseInt(value) + 1);
});
Handlebars.registerHelper("convToDate", function(value, options)
{
    return PersianDate(moment(value).format('jYYYY/jMM/jDD',{ trim: false }))
});
Handlebars.registerHelper("convToTime", function(value, options)
{
    return PersianDate(moment(value).format('HH:mm',{ trim: false }))
});
Handlebars.registerHelper("PersianNumber", function(value, options)
{
    return value.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
});
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
function PersianDate(value) {
    value = value.toString().replace(':',":")
    return value.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}
function makeid(length) {
    let result           = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const header =`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>SAP - Report</title>
    <meta name="generator" content="LibreOffice 6.3.5.2 (Linux)"/>
    <meta name="author" content="Windows User"/>
    <meta name="created" content="2020-05-06T08:47:00"/>
    <meta name="changed" content="2020-05-06T15:13:06.552552541"/>
    <meta name="AppVersion" content="15.0000"/>
    <meta name="DocSecurity" content="0"/>
    <meta name="HyperlinksChanged" content="false"/>
    <meta name="LinksUpToDate" content="false"/>
    <meta name="ScaleCrop" content="false"/>
    <meta name="ShareDoc" content="false"/>
    <style type="text/css">
   
    @page { size: 8.5in 11in; margin-left: 0.25in; margin-right: 0.25in; margin-top: 0.31in; margin-bottom: 0.19in }
    p { margin-bottom: 0.1in; background: transparent; direction: rtl; line-height: 115%; text-align: left; orphans: 2; widows: 2; background: transparent }
    p.western { font-size: 12pt }
    p.ctl { font-size: 12pt }
    td p { background: transparent; background: transparent }
    a:link { color: #000080; so-language: zxx; text-decoration: underline }
    a:visited { color: #800000; so-language: zxx; text-decoration: underline }
    </style>
</head>
<body lang="fa-IR" link="#000080" vlink="#800000" dir="rtl">
    <table width="776" cellpadding="7" cellspacing="0" style="page-break-before: always">
<col width="443"/>

<col width="305"/>

<tr>
<td rowspan="2" width="305" style="border: none; padding: 0in">
<span class="sd-abs-pos" style="position: absolute; top: 0.52in; /*left: 5.11in*/; width: 307px">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATMAAAA0CAIAAABpSEgFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFNTEyMDRGOERDMzExRUE5MDcwQTRCRDZBNzcyMzE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFNTEyMDUwOERDMzExRUE5MDcwQTRCRDZBNzcyMzE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEU1MTIwNEQ4REMzMTFFQTkwNzBBNEJENkE3NzIzMTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEU1MTIwNEU4REMzMTFFQTkwNzBBNEJENkE3NzIzMTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7NBJjqAAAjXElEQVR42uxdB3hU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" 
name="Picture 19" width="307" height="52" border="0"/>
</span>
<p align="center">
<br/>

</p>
</td>
<td width="443" height="34" style="border: none; padding: 0in">

<p align="center">
<span id="Frame1" dir="rtl" style="float: left; width: 4.38in; height: 0.3in; border: 1px solid #000000; padding: 0in; background: #ffffff"><p align="center">
<font color="#000000"><font face="IRANSansWeb(FaNum), sans-serif"><font size="2" style="font-size: 11pt"><span lang="fa-IR"><b>گزارش
{{report_title}}</b></span></font></font></font></p>
</span><br/>

</p>
</td>
</tr>
<tr>
<td width="443" height="34" style="border: none; padding: 0in">
<p align="center">
<span id="Frame2" dir="rtl" style="float: left; width: 1.27in; height: 0.55in; border: none; padding: 0in; background: #ffffff"><p align="right" style="margin-bottom: 0.2in">
<font color="#000000">
<font face="IRANSansWeb(FaNum), sans-serif">
<span ><font face="IRANSansWeb(FaNum), sans-serif">
<font size="1" style="font-size: 7pt">
<span lang="fa-IR">از
تاریخ
</span>
</font></font></span></font>
<font face="IRANSansWeb(FaNum), sans-serif">
<font size="1" style="font-size: 7pt">:</font>
</font>
</font>
</p>
<p align="right"><font color="#000000"><font face="IRANSansWeb(FaNum), sans-serif"><span >
<font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 7pt"><span lang="fa-IR">تا
تاریخ</span></font></font></span></font><font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 7pt">:</font></font></font></p>
</span>
<span id="Frame3" dir="rtl" style="float: left; width: 3.1in; height: 0.45in; border: none; padding: 0in; background: #ffffff"><p align="right" style="margin-bottom: 0.2in">
<font color="#000000"><font face="IRANSansWeb(FaNum), sans-serif">

<font face="IRANSansWeb(FaNum), sans-serif">
<font size="1" style="font-size: 8pt">
<span lang="fa-IR">توضیحات</span>
</font></font></font>
<font face="IRANSansWeb(FaNum), sans-serif"><font size="1" style="font-size: 8pt">:</font></font></font></p>
<p align="right"><br/>

</p>
</span><br/>

</p>
</td>
</tr>
</table>
    <p dir="rtl" class="western" align="right" style="margin-bottom: 0in; line-height: 100%">
    <br/>
    
    </p>
    <p dir="rtl" class="western" align="right" style="margin-bottom: 0in; line-height: 100%">
    <br/>
    
    </p>
    <p dir="rtl" class="western" align="right" style="margin-bottom: 0in; line-height: 100%">
<br/>

</p>`
const footer =
    `<div title="footer">
        <p dir="rtl" class="western" align="right" style="margin-top: 0.2in; margin-bottom: 0in; line-height: 100%">
            <br/>
        </p>
    <table dir="rtl" width="100%" cellpadding="4" cellspacing="0">
<col width="128*"/>

<col width="128*"/>

<tr valign="top">
<td width="50%" height="10" style="background: transparent" style="border: none; padding: 0in"><p align="center" style="font-variant: normal; text-decoration: none">
<font color="#000000"><font face="IRANSansWeb(FaNum), sans-serif"><span lang="fa-IR">صفحه
<span style="background: #c0c0c0"><sdfield type=PAGE subtype=RANDOM format=PAGE><font face="Liberation Serif, serif">1</font></sdfield></span>
از <span style="background: #c0c0c0"><sdfield type=DOCSTAT subtype=PAGE format=PAGE><font face="Liberation Serif, serif">2</font></sdfield></span></span></font></font></p>
</td>
<td width="50%" style="background: transparent;border: 1px solid #000000; padding-top: 0.04in; padding-bottom: 0.04in; padding-left: 0in; padding-right: 0.04in">
<p align="center" style="font-variant: normal; font-style: normal; font-weight: normal; text-decoration: none;text-align: center;">
<font color="#000000"><font face="Liberation Serif, serif"><font size="3" style="font-size: 12pt">fg</font></font></font></p>
</td>
</tr>
</table>
    </div>
</body>
</html>`

module.exports = {
    surathesabYekHesab,
    bankAccountList,
    customerList,
    areaList,
    regionList,
    surathesabManateghvaNavahi,
    surathesabMoshtari,
    VaziatGardeshManateghVaNavahi,
    VaziatGardeshManategh,
    KholaseAmalkard,
    BalanceTransfer,
    MandeHesabYektarafeManateghVaNavahi,
    CorporateStationsAccountBalance,
    TransactionInquiry,
    AccountsWithoutCheque,
    CustomerDepositStats,
    InvalidCustomerDeposits,
    CorrectiveTransactions,
    makeid
}
