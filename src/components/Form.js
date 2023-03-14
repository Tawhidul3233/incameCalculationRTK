import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../features/Transaction/transactionsSlice";

export default function Form() {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    // console.log(type)

    const dispatch = useDispatch()
    const { isLoading, isError, error } = useSelector((state) => state.transaction)

    const handelCreate = (e) => {
        e.preventDefault()
        dispatch(addTransaction({
            name,
            type,
            amount: Number(amount)
        }))
        setAmount('')
        setName('')
        setType('')
    }



    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={handelCreate}>
                <div className="form-group">
                    <label >Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label >Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            checked={type === 'expense'}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label >Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label >Amount</label>
                    <input
                        required
                        type="number"
                        placeholder="Enter amount"
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </div>

                <button disabled={isLoading} className="btn" type="submit">Add Transaction</button>
                {!isLoading && isError && <p className="error"> {error}</p>}
            </form>

            <button className="btn cancel_edit">Cancel Edit</button>
        </div>
    );
}
