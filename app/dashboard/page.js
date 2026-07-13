"use client";

import { useMemo, useState } from "react";
import { useEmployees } from "../../hooks/useEmployees";
import DashboardCards from "../../components/DashboardCards";
import EmployeeTable from "../../components/EmployeeTable";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import SortControl from "../../components/SortControl";
import EmployeeModal from "../../components/EmployeeModal";
import DistributionChart from "../../components/DistributionChart";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import ErrorState from "../../components/ErrorState";
import DarkModeToggle from "../../components/DarkModeToggle";

const PAGE_SIZE = 5;

// The top bar humburger icon
function TopBar({ isDark, onOpenSidebar, onToggleDark }) {
  function handleAddEmployeeClick() {
    alert(
      "This is a demo dashboard using a read-only API, so new employees can't be permanently saved. This button shows where that feature would go in a real app."
    );
  }

  return (
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} className="md:hidden text-gray-600">
          ☰
        </button>
        <h1 className="text-xl md:text-2xl font-semibold">Employee Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
        <button
          onClick={handleAddEmployeeClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>
    </div>
  );
}


function EmployeeListHeader({ shownCount, totalCount, search, onSearchChange, sortBy, onSortChange, statusFilter, onStatusFilterChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h2 className="text-lg font-semibold">All Employees</h2>
        <p className="text-xs text-gray-400">
          Showing {shownCount} of {totalCount}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <SearchBar value={search} onChange={onSearchChange} />
        <SortControl
          sortBy={sortBy}
          onSortChange={onSortChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
        />
      </div>
    </div>
  );
}

// footer section
function PageFooter({ isDark }) {
  let footerStyle;
  if (isDark) {
    footerStyle = "border-gray-700 text-gray-500";
  } else {
    footerStyle = "border-gray-200 text-gray-400";
  }

  return (
    <footer className={`mt-8 pt-4 border-t text-center text-xs ${footerStyle}`}>
      Employee Hub — Built with Next.js, Tailwind CSS, and JSONPlaceholder API
    </footer>
  );
}

function LoadingScreen({ isSidebarOpen, onCloseSidebar }) {
  return (
    <div className="flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={onCloseSidebar} />
      <div className="flex-1 p-4 md:p-8 min-h-screen bg-gray-50">
        <Loader />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { employees, loading, error, refetch } = useEmployees();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search
  const searchedEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return employees;
    }
    return employees.filter((emp) => {
      const matchesName = emp.name.toLowerCase().includes(query);
      const matchesEmail = emp.email.toLowerCase().includes(query);
      const matchesCompany = emp.company.name.toLowerCase().includes(query);
      return matchesName || matchesEmail || matchesCompany;
    });
  }, [employees, search]);

  // Filter
  const filteredEmployees = useMemo(() => {
    if (statusFilter === "all") {
      return searchedEmployees;
    }
    const wantActive = statusFilter === "active";
    return searchedEmployees.filter((emp) => {
      const isActive = emp.id % 3 !== 0;
      return isActive === wantActive;
    });
  }, [searchedEmployees, statusFilter]);

  // Sort
  const sortedEmployees = useMemo(() => {
    const list = [...filteredEmployees];
    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "company") {
      list.sort((a, b) => a.company.name.localeCompare(b.company.name));
    }
    return list;
  }, [filteredEmployees, sortBy]);

  function handleSearchChange(newValue) {
    setSearch(newValue);
    setPage(1);
  }

  function handleStatusFilterChange(newStatus) {
    setStatusFilter(newStatus);
    setPage(1);
  }

  function handleSortChange(newSortBy) {
    setSortBy(newSortBy);
    setPage(1);
  }

  function openSidebar() {
    setIsSidebarOpen(true);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  function toggleDarkMode() {
    setIsDark(!isDark);
  }

  if (loading) {
    return <LoadingScreen isSidebarOpen={isSidebarOpen} onCloseSidebar={closeSidebar} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const pagedEmployees = sortedEmployees.slice(startIndex, startIndex + PAGE_SIZE);

  let pageBackground;
  let contentBackground;
  let subtitleColor;
  if (isDark) {
    pageBackground = "bg-gray-900";
    contentBackground = "bg-gray-900 text-white";
    subtitleColor = "text-gray-400";
  } else {
    pageBackground = "bg-gray-50";
    contentBackground = "bg-gray-50 text-gray-900";
    subtitleColor = "text-gray-500";
  }

  return (
    <div className={`flex ${pageBackground}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className={`flex-1 p-4 md:p-8 min-h-screen ${contentBackground}`}>
        <TopBar isDark={isDark} onOpenSidebar={openSidebar} onToggleDark={toggleDarkMode} />

        <p className={`mb-6 ${subtitleColor}`}>
          Here's what's happening across your team today.
        </p>

        <DashboardCards employees={employees} />
        <DistributionChart employees={employees} />

        <EmployeeListHeader
          shownCount={sortedEmployees.length}
          totalCount={employees.length}
          search={search}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
        />

        <EmployeeTable employees={pagedEmployees} onViewDetails={setSelectedEmployee} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />

        <PageFooter isDark={isDark} />
      </div>
    </div>
  );
}