"use client";
import { useState } from "react";
import { useIssueStore } from "@/store/issueStore";
import { useProfileStore } from "@/store/profileStore";

const statusColors: Record<string, string> = {
  backlog: "#94A3B8",
  todo: "#3B82F6",
  in_progress: "#F59E0B",
  in_review: "#8B5CF6",
  done: "#10B981",
};

const statusLabels: Record<string, string> = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

const statuses = ["backlog", "todo", "in_progress", "in_review", "done"];

export default function IssueStatusChart() {
  const { issues } = useIssueStore();
  const { profile } = useProfileStore();
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);

  const assignedIssues = issues.filter(
    (issue) => issue.assignee_id === profile?.id,
  );
  const total = assignedIssues.length;

  const counts = statuses.map(
    (status) => assignedIssues.filter((i) => i.status === status).length,
  );

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let currentAngle = -90;

  // Build segments, filtering out any null values
  const segments = statuses
    .map((status, index) => {
      const count = counts[index];
      if (count === 0) return null;
      const percentage = (count / total) * 100;
      const segmentLength = (percentage / 100) * circumference;
      const angle = currentAngle;
      currentAngle += (percentage / 100) * 360;
      return {
        status,
        count,
        percentage,
        segmentLength,
        angle,
        color: statusColors[status],
      };
    })
    .filter((seg): seg is NonNullable<typeof seg> => seg !== null);

  const hoveredData = segments.find((s) => s.status === hoveredStatus) ?? null;

  if (total === 0) {
    return (
      <div className="rounded-2xl  border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Your Issues
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          No issues assigned to you yet.
        </p>
      </div>
    );
  }

  if (segments.length === 0) {
    return (
      <div className="rounded-2xl border  border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Your Issues
        </h3>
        <p className="text-gray-500 dark:text-gray-400">No data to display.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border  border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <h3 className="mb-1 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Your Issues
      </h3>
      <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">
        Assigned to you
      </p>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        {/* Donut */}
        <div className="relative h-52 w-52 shrink-0">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            {segments.map((seg) => {
              if (!seg) return null;
              const isHovered = hoveredStatus === seg.status;
              return (
                <circle
                  key={seg.status}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="28"
                  strokeDasharray={`${seg.segmentLength} ${circumference - seg.segmentLength}`}
                  strokeDashoffset={-(seg.angle / 360) * circumference}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-300 ease-out"
                  style={{
                    transformOrigin: "100px 100px",
                    transform: isHovered ? "scale(1.06)" : "scale(1)",
                    opacity: hoveredStatus && !isHovered ? 0.5 : 1,
                    filter: isHovered
                      ? "drop-shadow(0 4px 12px rgba(0,0,0,0.15))"
                      : "none",
                  }}
                  onMouseEnter={() => setHoveredStatus(seg.status)}
                  onMouseLeave={() => setHoveredStatus(null)}
                />
              );
            })}
            <text
              x="100"
              y="94"
              textAnchor="middle"
              dominantBaseline="central"
              className="text-2xl font-bold fill-gray-900 dark:fill-white"
            >
              {total}
            </text>
            <text
              x="100"
              y="118"
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[10px] font-medium uppercase tracking-wider fill-gray-400 dark:fill-gray-500"
            >
              Issues
            </text>
          </svg>
        </div>

        {/* Legend + Tooltip */}
        <div className="flex-1 min-w-[140px]">
          <div className="space-y-2">
            {segments.map((seg) => {
              if (!seg) return null;
              return (
                <div
                  key={seg.status}
                  className="flex items-center justify-between text-sm cursor-pointer"
                  onMouseEnter={() => setHoveredStatus(seg.status)}
                  onMouseLeave={() => setHoveredStatus(null)}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {statusLabels[seg.status]}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {seg.count}
                  </span>
                </div>
              );
            })}
          </div>

          {hoveredData && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: hoveredData.color }}
                  />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {statusLabels[hoveredData.status]}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {hoveredData.percentage.toFixed(0)}%
                </span>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {hoveredData.count} issue
                {hoveredData.count !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
