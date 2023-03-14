import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/Transaction/transactionsSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const { transactions, isLoading, isError, error } = useSelector((state) => state.transaction)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch])

    // what to render
    let content = null;
    if (isLoading) content = <p> Loading........</p>
    if (!isLoading && isError) content = <p> {error} </p>
    if (!isLoading && !isError && transactions.length === 0) content = <p> No items found</p>
    if (!isLoading && !isError && transactions.length > 0)
        content = transactions.map(transaction => <Transaction transaction={transaction} key={transaction.id} />)

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
