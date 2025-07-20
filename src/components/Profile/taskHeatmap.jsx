"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import {
    eachDayOfInterval,
    format,
    subYears,
    getDay,
    startOfWeek,
    endOfWeek,
} from 'date-fns';

/**
 * Custom TaskHeatMap Component
 *
 * A React component that visualizes daily task completion using a custom-built heatmap.
 * It displays a calendar-like grid for a full year, coloring each day based on
 * the number of tasks completed.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.taskRecords - An array of task record objects,
 * each with 'date' (ISO string or Date object) and 'completedTasks' (number).
 * Example: [{ date: '2023-01-01T00:00:00.000Z', completedTasks: 2 }]
 */
const TaskHeatMap = ({ taskRecords = [] }) => {
    // Helper to normalize date to YYYY-MM-DD string for map keys
    const formatDateKey = (date) => format(new Date(date), 'yyyy-MM-dd');

    // Create a map for quick lookup of completed tasks by date
    const taskCountsByDate = useMemo(() => {
        const map = new Map();
        taskRecords.forEach(record => {
            const dateKey = formatDateKey(record.date);
            map.set(dateKey, record.completedTasks);
        });
        return map;
    }, [taskRecords]);

    // Determine the max count for coloring
    const maxCount = useMemo(() => {
        // Ensure maxCount is at least a reasonable number for color scaling, e.g., 5
        return Math.max(...Array.from(taskCountsByDate.values()), 5);
    }, [taskCountsByDate]);

    // Define color classes based on intensity
    const getColorClass = useCallback((count) => {
        if (count === 0) return 'bg-gray-200';
        const percentage = count / maxCount;
        if (percentage <= 0.2) return 'bg-blue-200';
        if (percentage <= 0.4) return 'bg-blue-400';
        if (percentage <= 0.6) return 'bg-blue-600';
        if (percentage <= 0.8) return 'bg-blue-700';
        return 'bg-blue-800';
    }, [maxCount]);

    // --- Date Range Calculation ---
    const endDate = new Date();
    const startDate = subYears(endDate, 1);
    const firstDayOfGrid = startOfWeek(startDate, { weekStartsOn: 0 }); // Start on Sunday
    const lastDayOfGrid = endOfWeek(endDate, { weekStartsOn: 0 });
    const daysToRender = useMemo(() => {
        return eachDayOfInterval({ start: firstDayOfGrid, end: lastDayOfGrid });
    }, [firstDayOfGrid, lastDayOfGrid]);

    // --- Month Labels Calculation ---
    const monthLabels = useMemo(() => {
        const labels = [];
        const monthData = {}; // Stores { 'MMM-yyyy': { startCol } }

        daysToRender.forEach((date, index) => {
            const monthKey = format(date, 'MMM-yyyy');
            if (!monthData[monthKey]) {
                const colIndex = Math.floor(index / 7);
                monthData[monthKey] = { startCol: colIndex };
            }
        });

        const monthKeys = Object.keys(monthData);
        const totalColumns = Math.ceil(daysToRender.length / 7);

        monthKeys.forEach((key, index) => {
            const { startCol } = monthData[key];
            const isLastMonth = index === monthKeys.length - 1;

            const nextMonthStartCol = isLastMonth
                ? totalColumns
                : monthData[monthKeys[index + 1]].startCol;

            const widthInCols = nextMonthStartCol - startCol;

            if (widthInCols > 0) {
                labels.push({
                    label: key.split('-')[0], // 'Jul'
                    year: key.split('-')[1], // '2025'
                    startCol: startCol,
                    widthInCols: widthInCols,
                });
            }
        });

        return labels;
    }, [daysToRender]);

    // --- Tooltip State and Refs ---
    const [tooltipContent, setTooltipContent] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const heatmapGridRef = useRef(null);

    useEffect(() => {
        if (heatmapGridRef.current) {
            // Instantly scroll the container to the far right
            heatmapGridRef.current.scrollLeft = heatmapGridRef.current.scrollWidth;
        }
    }, []);

    const handleMouseEnter = (event, date, count) => {
        if (!heatmapGridRef.current) return;
        const cellRect = event.currentTarget.getBoundingClientRect();
        const gridRect = heatmapGridRef.current.getBoundingClientRect();

        setTooltipPos({
            x: cellRect.left - gridRect.left + cellRect.width / 2,
            y: cellRect.top - gridRect.top - 10,
        });
        setTooltipContent(`${count} tasks on ${format(date, 'MMM do, yyyy')}`);
    };

    const handleMouseLeave = () => setTooltipContent(null);
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // --- Component Render ---
    return (
        <div className="w-full relative overflow-hidden">
            <div className="flex items-start">
                {/* Day of Week Labels (Left Side) */}
                <div className="flex flex-col justify-between h-[calc(7*var(--cell-size,1.5rem)+6*var(--cell-spacing,0.125rem))] mr-2 mt-7 sm:mr-4 text-xs text-gray-500 font-medium">
                    {dayLabels.map((label, index) => (
                        <div
                            key={label}
                            className="h-[var(--cell-size,1.5rem)] flex items-center justify-center text-center"
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* Heatmap Grid Container (Scrollable) */}
                <div ref={heatmapGridRef} className="flex-grow overflow-x-auto relative pb-4">
                    {/* Month Labels (Top) */}
                    <div className="absolute top-0 flex h-8 text-xs text-gray-600 font-semibold z-10">
                        {monthLabels.map(({ label, year, startCol, widthInCols }) => {
                            // Each column is 1.5rem wide + 1px gap.
                            const CELL_PLUS_GAP_REM = 1.5 + (1 / 16);
                            const leftPos = startCol * CELL_PLUS_GAP_REM;
                            const width = widthInCols * CELL_PLUS_GAP_REM;

                            return (
                                <span
                                    key={`${label}-${year}`}
                                    className="absolute text-left"
                                    style={{
                                        left: `${leftPos}rem`,
                                        width: `${width}rem`,
                                    }}
                                >
                                    {label}
                                </span>
                            );
                        })}
                    </div>

                    {/* Heatmap Cells */}
                    <div
                        className="grid grid-flow-col gap-px"
                        style={{
                            gridTemplateRows: `repeat(7, 1.5rem)`,
                            gridAutoColumns: `1.5rem`,
                            paddingTop: '2rem', // Space for month labels
                        }}
                    >
                        {daysToRender.map((date, index) => {
                            const dateKey = formatDateKey(date);
                            const count = taskCountsByDate.get(dateKey) || 0;
                            const isWithinRange = date >= startDate && date <= endDate;
                            const isNewMonth = date.getDate() === 1;
                            const colIndex = Math.floor(index / 7);

                            return (
                                <div
                                    key={dateKey}
                                    className={`
                                        w-[1.5rem] h-[1.5rem] rounded-sm transition-colors
                                        ${isWithinRange ? getColorClass(count) : 'bg-gray-100'}
                                        ${!isWithinRange ? 'opacity-50' : ''}
                                        ${isNewMonth && colIndex > 0 ? 'border-l-2 border-dashed border-gray-300' : ''}
                                    `}
                                    onMouseEnter={(e) => handleMouseEnter(e, date, count)}
                                    onMouseLeave={handleMouseLeave}
                                ></div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {tooltipContent && (
                <div
                    className="absolute z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap -translate-x-1/2"
                    style={{ left: tooltipPos.x, top: tooltipPos.y, pointerEvents: 'none' }}
                >
                    {tooltipContent}
                </div>
            )}

            {/* Legend */}
            <div className="flex justify-end items-center mt-2 pr-4 text-xs text-gray-600">
                <span className="mr-2">Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-800 rounded-sm"></div>
                </div>
                <span className="ml-2">More</span>
            </div>
        </div>
    );
};

export default TaskHeatMap;
