import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

const TaskHeatmap = ({ taskData }) => {
    const formattedData = taskData.map((record) => ({
        value: record.completedTasks,
        day: new Date(record.date).toISOString().split("T")[0]
    }));
    console.log(formattedData);
    return (
        <div className='h-48 w-full'>
            <ResponsiveCalendar
                data={formattedData}
                from="2024-01-01"
                to="2024-12-31"
                emptyColor="#f0f0f0"
                colors={["#d1e7dd", "#82c091", "#4e944f", "#256e38"]}
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                monthBorderColor="#ffffff"
                monthSpacing={3}
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "row",
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: "right-to-left",
                    },
                ]}
            />
        </div>
    );
};

export default TaskHeatmap;
