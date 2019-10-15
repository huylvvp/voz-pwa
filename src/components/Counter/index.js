import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./Counter.css";

function Index() {
    const count = useSelector(state => state);
    const dispatch = useDispatch();

    const onIncrement = () => {
        dispatch({ type: 'INCREMENT' });
        console.log(count);
    }

    const onDecrement = () => {
        dispatch({ type: 'DECREMENT' })
    }

    return (
        <div className="Counter">
            This is clicked {count.count} times!
            <div>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        </div>
    );
}

export default Index;
