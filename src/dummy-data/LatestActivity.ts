interface ITransactions {
  id: number;
  title: string;
  type: "credit" | "debit";
  amount: number;
  descriptions?: string;
  timestamp: string; // Time in HH:mm:ss format
  color: string; // Tailwind color class
}

interface ILatestActivityObject {
  id: number;
  day: "Today" | "Yesterday";
  transactions: ITransactions[];
}

type TLatestActivityObject = ILatestActivityObject[];

const formatTime = (date: Date): string => {
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const getColorByType = (type: "credit" | "debit"): string => {
  return type === "debit" ? "sky-500" : "red-500"; // Adjust colors as needed
};

const obj: TLatestActivityObject = [
  {
    id: 0,
    day: "Today",
    transactions: [
      {
        id: 1,
        title: "Got Money Back",
        type: "debit",
        amount: 250,
        timestamp: formatTime(new Date()), // Current time
        color: getColorByType("debit"),
      },
      {
        id: 2,
        title: "Spent on Sunday Market",
        type: "credit",
        amount: 500,
        timestamp: formatTime(new Date(Date.now() - 3600 * 1000)), // 1 hour ago
        color: getColorByType("credit"),
      },
      {
        id: 3,
        title: "Spent on Ranchers",
        type: "credit",
        amount: 1000,
        timestamp: formatTime(new Date(Date.now() - 7200 * 1000)), // 2 hours ago
        color: getColorByType("credit"),
      },
    ],
  },
  {
    id: 1,
    day: "Yesterday",
    transactions: [
      {
        id: 4,
        title: "Spent on Medications",
        type: "credit",
        amount: 540,
        timestamp: formatTime(new Date(Date.now() - 86400 * 1000)), // 1 day ago
        color: getColorByType("credit"),
      },
      {
        id: 5,
        title: "Received Salary",
        type: "debit",
        amount: 2000,
        timestamp: formatTime(
          new Date(Date.now() - 86400 * 1000 + 1800 * 1000),
        ), // 30 minutes ago
        color: getColorByType("debit"),
      },
      {
        id: 6,
        title: "Bought Groceries",
        type: "credit",
        amount: 150,
        timestamp: formatTime(
          new Date(Date.now() - 86400 * 1000 + 7200 * 1000),
        ), // 2 hours ago
        color: getColorByType("credit"),
      },
      {
        id: 7,
        title: "Paid Utility Bills",
        type: "credit",
        amount: 300,
        timestamp: formatTime(
          new Date(Date.now() - 86400 * 1000 + 3600 * 1000),
        ), // 1 hour ago
        color: getColorByType("credit"),
      },
    ],
  },
];

export default obj;
