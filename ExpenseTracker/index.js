function addNewExpense(e){
    e.preventDefault()
    const expenseDetails={
        expenseamount:e.target.expenseamount.value,
        description:e.target.description.value,
        category:e.target.category.value

    }
    axios.post("http://localhost:4000/expense/addexpense",expenseDetails)
    .then(response=>{
        console.log(response)
        if(response.status === 201){
            addNewExpensetoUI(response.data.expense)
        }

    }).catch(err=>{
        showError(err)
    })

}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('http://localhost:4000/expense/getexpenses').then(response =>{
        response.data.expenses.forEach(expense=>{
            addNewExpensetoUI(expense)
        })
    })
})
function addNewExpensetoUI(expense){
    const parentElement=document.getElementById('listofExpenses')
    const expenseElemId=`expense-${expense.id}`;
    parentElement.innerHTML +=`<li id=${expenseElemId}>
    ${expense.expenseamount} - ${expense.category} - ${expense.description}
    <button onClick='deleteExpense(event,${expense.id})'>Delete Expense</button>
    </li>`
}
function deleteExpense(e,expenseid){
    axios.delete(`http://localhost:4000/expense/deleteexpense/${expenseid}`).then(()=>{
        console.log(expenseid)
        removeExpensefromUI(expenseid)

    })
    .catch((err=>{
        showError(err)
    }))
}
function removeExpensefromUI(expenseid){
    const expenseElemId=`expense-${expenseid}`
    document.getElementById(expenseElemId).remove()
}
function showError(err){
    document.body.innerHTML+=`<div style="color:red;">${err}</div>`
}