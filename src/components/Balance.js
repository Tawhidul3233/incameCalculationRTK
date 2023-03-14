import { useSelector } from "react-redux";

export default function Balance() {

    const { transactions } = useSelector((state) => state.transaction)
    // console.log(transactions)

    const netBalance = (transactions) => {
        let balance = 0;
        transactions.forEach(transaction => {
            const { type, amount } = transaction;
            if (type === 'income') {
                balance += amount;
            } else {
                balance -= amount;
            }
        })
        return balance.toLocaleString();
    }

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span> Net Balance ৳ </span>
                {transactions.length > 0 ? <span> {netBalance(transactions)} </span> : 0}
            </h3>
        </div>
    );
}
