import React, { useState, useEffect } from "react";
import { formatTime, formatMoney } from "../utils/formatString";
import { itemStatus } from "./Item";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { editItems } from "../utils/firebaseUtils";

const Row = ({ item }) => {
  const [amount, setAmount] = useState(item.startingPrice);
  const [bids, setBids] = useState(0);
  const [winner, setWinner] = useState("");
  const [timeLeft, setTimeLeft] = useState("5");

  useEffect(() => {
    const status = itemStatus(item);
    setAmount(formatMoney(item.currency, status.amount));
    setBids(status.bids);
    if (status.winner) {
      getDoc(doc(db, "users", status.winner)).then((user) => {
        setWinner(user.get("name"));
      });
    } else {
      setWinner("");
    }
  }, [item]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = item.endTime - now;

      if (remaining ) {
        setTimeLeft(formatTime(Math.abs(remaining/1000)));
        requestAnimationFrame(updateTimer);
      } else {
        setTimeLeft("Item Ended");
      }
    };

    requestAnimationFrame(updateTimer);
  }, [item.endTime]);

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{amount}</td>
      <td>{bids}</td>
      <td>{winner}</td>
      <td>{timeLeft}</td>
      <td>
        <button
          className="btn me-3"
          style={{backgroundColor:"#00bf00"}}
          onClick={() => editItems(item.id, true, false)}
        >
          Update
        </button>
        <button
          className="btn me-3"
          style={{backgroundColor:"#00bf00"}}
          onClick={() => editItems(item.id, false, true)}
        >
          Reset
        </button>
        <button
          className="btn"
          onClick={() => editItems(item.id, true, true)}
        >
          Update & Reset
        </button>
      </td>
    </tr>
  );
};

export default Row;
