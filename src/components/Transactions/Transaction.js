import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { removeTransaction } from "../../features/Transaction/transactionsSlice";

export default function Transaction({ transaction }) {
    const { amount, name, type, id } = transaction || {}

    const dispatch = useDispatch()

    const handelDelete = () => {
        dispatch(removeTransaction(id))
    }
    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount.toLocaleString()}</p>
                <button className="link">
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button onClick={handelDelete} className="link">
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
