import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [queues, setQueues] = useState<number[][]>([[], [], []]);
  const [value, setValue] = useState<number>(10);

  const addToSmallestQueue = (value: number) => {
    if (value === 0) return;
    const queueTotals = queues.map((shopper) =>
      shopper.reduce((acc, curr) => acc + curr, 0)
    );
    const smallestQueue = queueTotals.indexOf(Math.min(...queueTotals));

    const newQueues = queues.map((shopper, index) =>
      index === smallestQueue ? [...shopper, value] : shopper
    );

    setQueues(newQueues);
  };

  const reduceByOneFromAllQueues = () => {
    // Decrement the value of the first index in every queue
    const newQueues = queues.map((shopper) => {
      if (shopper.length > 0) {
        shopper[0] = shopper[0] - 1;
        if (shopper[0] === 0) {
          // Remove the list from the queue
          shopper.shift();
        }
      }
      return shopper;
    });

    setQueues(newQueues);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      reduceByOneFromAllQueues();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [queues]);

  return (
    <>
      <h1>Shopping</h1>

      <input
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(Number(e.target.value))
        }
      />
      <button
        onClick={() => {
          setValue(Math.floor(Math.random() * 5) + 5);
          addToSmallestQueue(value);
        }}
      >
        Add
      </button>
      <div id="queues">
        {queues.map((shopper, index) => (
          <div key={index} id="queue">
            <h2>Queue</h2>

            {shopper &&
              shopper.map((item, index) => (
                <div id="shopper" key={index}>
                  {item}
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
