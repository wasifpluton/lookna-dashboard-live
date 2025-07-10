import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type RevenueChartProps = {
    currentRevenue: string;
    percentageChange: string;
    date: string;
    positive?: boolean;
    startDate?: string;
    endDate?: string;
    onDateChange?: (startDate: string, endDate: string) => void;
};

const generateChartData = (startDate: string, endDate: string) => {
    const [startMonth, startYear] = startDate.split("/").map(Number);
    const [endMonth, endYear] = endDate.split("/").map(Number);

    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    const monthsArray = Array.from({ length: totalMonths }, (_, i) => {
        const month = ((startMonth - 1 + i) % 12) + 1;
        const year = startYear + Math.floor((startMonth - 1 + i) / 12);
        return { month, year };
    });

    const generateTrendData = (months: number) => {
        const baseValue = Math.floor(Math.random() * 50) + 50;
        const trendPoints = [baseValue];

        for (let i = 1; i < months; i++) {
            const momentum = (trendPoints[i - 1] - baseValue) * 0.3;
            const newValue = trendPoints[i - 1] + momentum + (Math.random() * 30 - 15);
            trendPoints.push(Math.max(10, Math.min(200, newValue)));
        }

        return trendPoints;
    };

    const revenueData = generateTrendData(totalMonths);
    const expenseData = generateTrendData(totalMonths).map((v) => v * 0.8);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return monthsArray.map(({ month, year }, index) => {
        return {
            name: monthNames[month - 1],
            revenue: revenueData[index] * 1000,
            expenses: expenseData[index] * 1000,
            month: month,
            year: year,
        };
    });
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const revenue = payload[0]?.value;
        const formattedRevenue = revenue ? `$${(revenue / 1000).toFixed(1)}k` : "$0";

        const percentChange = (Math.random() * 20 - 5).toFixed(1);
        const isPositive = parseFloat(percentChange) > 0;

        const month = label;
        const day = Math.floor(Math.random() * 28) + 1;
        const year = payload[0]?.payload.year;
        const formattedDate = `${month} ${day}, ${year}`;

        return (
            <div className="bg-white shadow-md rounded-md p-3 border border-gray-100 min-w-[150px]" style={{ zIndex: 50 }}>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold mb-1">{formattedRevenue}</p>
                    <div className="flex items-center gap-1 mb-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${isPositive ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"}`}>{isPositive ? `${percentChange}% ↗` : `${Math.abs(parseFloat(percentChange))}% ↘`}</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm">{formattedDate}</p>
            </div>
        );
    }
    return null;
};

const RevenueChart = ({ currentRevenue, percentageChange, date, positive = true, startDate = "01/2023", endDate = "12/2023", onDateChange }: RevenueChartProps) => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
    const [data, setData] = useState(generateChartData(startDate, endDate));

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setData(generateChartData(startDate, endDate));
    }, [startDate, endDate]);

    const handleDateChange = (start: string, end: string) => {
        if (onDateChange) {
            onDateChange(start, end);
        }
    };

    const isSmallScreen = windowWidth < 640;

    return (
        <div style={{ padding: "1rem", height: "100%", display: "flex", flexDirection: "column" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ marginBottom: "1.5rem" }}>
                <div>
                    <h2 className="text-sm text-gray-600">Total revenue</h2>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-semibold">{currentRevenue}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${positive ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"}`}>{percentageChange}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className={`flex ${isSmallScreen ? "flex-col" : "flex-row"} items-start sm:items-center gap-2`}>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#8884d8]" style={{ marginRight: "4px" }}></div>
                            <span className="text-xs text-gray-600">Revenue</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#f472b6]" style={{ marginRight: "4px" }}></div>
                            <span className="text-xs text-gray-600">Expenses</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ flexGrow: 1, minHeight: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#f472b6" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} tickFormatter={(value) => (isSmallScreen && windowWidth < 400 ? value.substr(0, 1) : value)} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} tickFormatter={(value) => `${value === 0 ? "0" : value / 1000 + "k"}`} />
                        <Tooltip content={<CustomTooltip />} offset={10} wrapperStyle={{ zIndex: 100, pointerEvents: "none" }} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            strokeWidth={2}
                            activeDot={{
                                r: 8,
                                fill: "#8884d8",
                                stroke: "white",
                                strokeWidth: 2,
                                strokeOpacity: 1,
                            }}
                        />
                        <Area type="monotone" dataKey="expenses" stroke="#f472b6" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(RevenueChart), { ssr: false });
