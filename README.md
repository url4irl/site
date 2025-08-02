This is url4irl's site code, powered by Next.js. 

## Getting Started

```bash
pnpm i
pnpm dev
```

"use client";

import { useState, useEffect } from "react";
import { TimezoneSearchEngine } from "../src/lib/search";
import { CONTINENT_OPTIONS } from "../src/lib/constants";
import { SearchFilters, TimezoneInfo } from "../src/lib/types";

const TimezoneDisplay = () => {
  const [searchEngine] = useState(() => new TimezoneSearchEngine());
  const [displayedTimezones, setDisplayedTimezones] = useState<TimezoneInfo[]>([]);
  const [userTimezone, setUserTimezone] = useState<string>("");
  const [preferredTimezones, setPreferredTimezones] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    continent: "",
    utcOffset: "",
    sortBy: "alphabetical"
  });

  useEffect(() => {
    // Detect user's current timezone
    const detectedTimezone = DateTime.local().zoneName || "UTC";
    setUserTimezone(detectedTimezone);

    // Load preferred timezones from localStorage
    const storedPreferredTimezones = localStorage.getItem("preferredTimezones");
    if (storedPreferredTimezones) {
      setPreferredTimezones(JSON.parse(storedPreferredTimezones));
    }

    // Initial load with all timezones
    setLoading(true);
    setTimeout(() => {
      performSearch("", filters);
      setLoading(false);
    }, 1000);
  }, []);

  // Update search when term or filters change
  useEffect(() => {
    if (!loading) {
      performSearch(searchTerm, filters);
    }
  }, [searchTerm, filters, loading]);

  // Refresh timezones every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      searchEngine.refreshTimezones();
      performSearch(searchTerm, filters);
    }, 30000);

    return () => clearInterval(interval);
  }, [searchTerm, filters]);

  const performSearch = (query: string, searchFilters: SearchFilters) => {
    const result = searchEngine.search(query, searchFilters);
    setDisplayedTimezones(result.timezones);
  };

  const handleAddPreferredTimezone = (timezoneName: string) => {
    const newPreferredTimezones = [
      ...new Set([...preferredTimezones, timezoneName]),
    ];
    setPreferredTimezones(newPreferredTimezones);
    localStorage.setItem(
      "preferredTimezones",
      JSON.stringify(newPreferredTimezones)
    );
  };

  const handleRemovePreferredTimezone = (timezoneName: string) => {
    const newPreferredTimezones = preferredTimezones.filter(
      (tz) => tz !== timezoneName
    );
    setPreferredTimezones(newPreferredTimezones);
    localStorage.setItem(
      "preferredTimezones",
      JSON.stringify(newPreferredTimezones)
    );
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getTimezoneCardStyle = (timezone: TimezoneInfo) => {
    const isUserTimezone = timezone.name === userTimezone;
    const isPreferred = preferredTimezones.includes(timezone.name);

    let baseClasses = "relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md ";

    if (isUserTimezone) {
      baseClasses += "bg-blue-50 border-blue-300 ring-2 ring-blue-200 ";
    } else if (isPreferred) {
      baseClasses += "bg-green-50 border-green-300 ring-1 ring-green-200 ";
    } else {
      baseClasses += "bg-white border-gray-200 hover:border-gray-300 ";
    }

    return baseClasses;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            Loading Timezones...
          </h2>
          <p className="text-gray-500 mt-2">
            Gathering timezone data from around the world
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌍 World Timezones
          </h1>
          <p className="text-gray-600">
            Explore time zones around the world with smart search and filtering
          </p>
          {userTimezone && (
            <p className="text-sm text-blue-600 mt-2">
              Your timezone: <span className="font-semibold">{userTimezone}</span>
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Timezones
              </label>
              <input
                type="text"
                placeholder="Search by city, timezone, or region (e.g., Wellington, Oceania, New York)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Continent Filter */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Continent
              </label>
              <select
                value={filters.continent || ""}
                onChange={(e) => updateFilters({ continent: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {CONTINENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* UTC Offset Filter */}
            <div className="lg:w-32">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UTC Offset
              </label>
              <select
                value={filters.utcOffset || ""}
                onChange={(e) => updateFilters({ utcOffset: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="-12">UTC-12</option>
                <option value="-11">UTC-11</option>
                <option value="-10">UTC-10</option>
                <option value="-9">UTC-9</option>
                <option value="-8">UTC-8</option>
                <option value="-7">UTC-7</option>
                <option value="-6">UTC-6</option>
                <option value="-5">UTC-5</option>
                <option value="-4">UTC-4</option>
                <option value="-3">UTC-3</option>
                <option value="-2">UTC-2</option>
                <option value="-1">UTC-1</option>
                <option value="0">UTC+0</option>
                <option value="1">UTC+1</option>
                <option value="2">UTC+2</option>
                <option value="3">UTC+3</option>
                <option value="4">UTC+4</option>
                <option value="5">UTC+5</option>
                <option value="6">UTC+6</option>
                <option value="7">UTC+7</option>
                <option value="8">UTC+8</option>
                <option value="9">UTC+9</option>
                <option value="10">UTC+10</option>
                <option value="11">UTC+11</option>
                <option value="12">UTC+12</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="lg:w-40">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy || "alphabetical"}
                onChange={(e) => updateFilters({ sortBy: e.target.value as SearchFilters["sortBy"] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="population">Population</option>
                <option value="continent">Continent</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {displayedTimezones.length} timezone{displayedTimezones.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </span>
            {preferredTimezones.length > 0 && (
              <span>
                {preferredTimezones.length} preferred timezone{preferredTimezones.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Preferred Timezones Section */}
        {preferredTimezones.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ⭐ Your Preferred Timezones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {preferredTimezones
                .map(name => searchEngine.getAllTimezones().find(tz => tz.name === name))
                .filter(Boolean)
                .map((timezone) => (
                  <div
                    key={timezone!.name}
                    className={getTimezoneCardStyle(timezone!)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {timezone!.displayName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {timezone!.continent}/{timezone!.city}
                        </p>
                        <p className="text-lg font-mono text-blue-600">
                          {timezone!.currentTime.toFormat("HH:mm:ss")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {timezone!.offset}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemovePreferredTimezone(timezone!.name)}
                        className="ml-2 p-1 text-red-400 hover:text-red-600 transition-colors"
                        title="Remove from preferred"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Timezones Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🌐 All Timezones
          </h2>
          {displayedTimezones.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No timezones found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedTimezones.map((timezone) => (
                <div
                  key={timezone.name}
                  className={getTimezoneCardStyle(timezone)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {timezone.displayName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {timezone.continent}/{timezone.city}
                      </p>
                      <p className="text-lg font-mono text-blue-600">
                        {timezone.currentTime.toFormat("HH:mm:ss")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {timezone.offset}
                      </p>
                      {timezone.population > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          Pop: {(timezone.population / 1000000).toFixed(1)}M
                        </p>
                      )}
                    </div>
                    <div className="ml-2 flex flex-col gap-1">
                      {timezone.name === userTimezone && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          You
                        </span>
                      )}
                      {preferredTimezones.includes(timezone.name) ? (
                        <button
                          onClick={() => handleRemovePreferredTimezone(timezone.name)}
                          className="p-1 text-green-600 hover:text-green-800 transition-colors"
                          title="Remove from preferred"
                        >
                          ⭐
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddPreferredTimezone(timezone.name)}
                          className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                          title="Add to preferred"
                        >
                          ☆
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimezoneDisplay;
    ];
    setPreferredTimezones(newPreferredTimezones);
    localStorage.setItem(
      "preferredTimezones",
      JSON.stringify(newPreferredTimezones)
    );
  };

  const handleRemovePreferredTimezone = (timezoneName: string) => {
    const newPreferredTimezones = preferredTimezones.filter(
      (zone) => zone !== timezoneName
    );
    setPreferredTimezones(newPreferredTimezones);
    localStorage.setItem(
      "preferredTimezones",
      JSON.stringify(newPreferredTimezones)
    );
  };

  // Use FlexSearch for search
  const getFlexSearchResults = (query: string): TimezoneInfo[] => {
    if (!searchIndex || !query.trim()) {
      return applyFilters(currentTimezones);
    }
    
    try {
      const normalizedQuery = query.trim().toLowerCase();
      
      // Check for city alias match first
      const matchedTimezone = cityTimezoneMap[normalizedQuery];
      if (matchedTimezone) {
        const foundTimezone = currentTimezones.find(tz => tz.name === matchedTimezone);
        if (foundTimezone) {
          return applyFilters([foundTimezone]);
        }
      }
      
      const searchResults = searchIndex.search(query.trim());
      // FlexSearch Document returns results in format { field: [results] }
      let timezoneNames: string[] = [];
      if (Array.isArray(searchResults)) {
        timezoneNames = searchResults.map((result: unknown) => 
          typeof result === 'string' ? result : String(result)
        );
      } else if (typeof searchResults === 'object' && searchResults && 'name' in searchResults) {
        const results = searchResults as {name: string[]};
        timezoneNames = results.name;
      }
      
      // Convert names back to timezone objects
      const foundTimezones = timezoneNames
        .map(name => currentTimezones.find(tz => tz.name === name))
        .filter(Boolean) as TimezoneInfo[];
        
      return applyFilters(foundTimezones);
    } catch (error) {
      console.error('FlexSearch error:', error);
      return applyFilters(currentTimezones);
    }
  };

  // Apply continent and UTC offset filters
  const applyFilters = (timezones: TimezoneInfo[]): TimezoneInfo[] => {
    return timezones.filter(zone => {
      const matchesContinent = !filterContinent || 
        zone.name.startsWith(filterContinent + "/") ||
        (continentOntology[filterContinent.toLowerCase()]?.some(cont => 
          zone.name.startsWith(cont + "/")
        ));
      
      const matchesUTCOffset = !filterUTCOffset || zone.utcOffset === filterUTCOffset;
      
      return matchesContinent && matchesUTCOffset;
    });
  };

  // Get filtered and search results
  const filteredTimezones = getFlexSearchResults(searchTerm);

  // Apply sorting
  const sortedTimezones = [...filteredTimezones].sort((a, b) => {
    if (sortType === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "population") {
      const popA = timezonePopulation[a.name] || 0;
      const popB = timezonePopulation[b.name] || 0;
      return popB - popA;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-lg">
          🌎 World Timezones
        </h1>

        <div className="mb-10 flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 justify-center items-stretch">
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2 flex items-center gap-2">
              <span role="img" aria-label="clock">
                🕒
              </span>{" "}
              Your Timezone
            </h2>
            <p className="text-lg font-mono text-gray-700">{userTimezone}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex-1 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2 flex items-center gap-2">
              <span role="img" aria-label="star">
                ⭐
              </span>{" "}
              Preferred Timezones
            </h2>
            {preferredTimezones.length === 0 ? (
              <p className="text-gray-500 italic">
                No preferred timezones added yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {preferredTimezones.map((zone) => (
                  <li
                    key={zone}
                    className="flex justify-between items-center bg-indigo-50 rounded px-3 py-2"
                  >
                    <span className="font-medium text-indigo-700">
                      {zone}:{" "}
                      <span className="font-mono text-gray-800">
                        {DateTime.local().setZone(zone).toFormat("HH:mm:ss")}
                      </span>
                    </span>
                    <button
                      onClick={() => handleRemovePreferredTimezone(zone)}
                      className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label={`Remove ${zone}`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6 flex items-center gap-2">
            <span role="img" aria-label="globe">
              🌐
            </span>{" "}
            All Timezones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-indigo-700 mb-1"
              >
                Search Timezone or City:
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. Europe, Tokyo, Wellington"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="continent"
                className="block text-sm font-medium text-indigo-700 mb-1"
              >
                Filter by Continent:
              </label>
              <select
                id="continent"
                value={filterContinent}
                onChange={(e) => setFilterContinent(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out bg-white shadow-sm"
              >
                <option value="">All</option>
                {continentOptions
                  .filter(
                    (opt) =>
                      opt.value === "" ||
                      currentTimezones.some((zone) =>
                        zone.name.startsWith(opt.value + "/")
                      )
                  )
                  .map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="utcOffset"
                className="block text-sm font-medium text-indigo-700 mb-1"
              >
                Filter by UTC Offset:
              </label>
              <select
                id="utcOffset"
                value={filterUTCOffset}
                onChange={(e) => setFilterUTCOffset(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out bg-white shadow-sm"
              >
                <option value="">All</option>
                {Array.from(
                  new Set(currentTimezones.map((zone) => zone.utcOffset))
                )
                  .sort((a, b) => {
                    // Sort UTC offsets numerically
                    const parseOffset = (offset: string) => {
                      const sign = offset[0] === "+" ? 1 : -1;
                      const [hours, minutes] = offset
                        .substring(1)
                        .split(":")
                        .map(Number);
                      return sign * (hours * 60 + minutes);
                    };
                    return parseOffset(a) - parseOffset(b);
                  })
                  .map((offset) => (
                    <option key={offset} value={offset}>
                      UTC{offset}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="sortType"
                className="block text-sm font-medium text-indigo-700 mb-1"
              >
                Sort by:
              </label>
              <select
                id="sortType"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150 ease-in-out bg-white"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="population">Population (major cities)</option>
              </select>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
              <span className="ml-4 text-indigo-700 text-lg font-semibold">
                Loading timezones...
              </span>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedTimezones.map((zone) => {
                return (
                  <li
                    key={zone.name}
                    className={`p-4 rounded-xl shadow border transition-all duration-200 flex flex-col items-start gap-2 relative group ${
                      zone.name === userTimezone
                        ? "bg-indigo-100 border-indigo-400 scale-105"
                        : "bg-gray-50 border-gray-200 hover:scale-105 hover:border-indigo-300"
                    }`}
                  >
                    <span className="font-bold text-indigo-700 text-lg">
                      {zone.name}
                    </span>
                    <span className="font-mono text-gray-800 text-base">
                      {zone.time}
                    </span>
                    <span className="text-xs text-gray-500">
                      UTC{zone.utcOffset}
                    </span>
                    {sortType === "population" &&
                      timezonePopulation[zone.name] && (
                        <span className="text-xs text-gray-500">
                          Population:{" "}
                          {timezonePopulation[zone.name].toLocaleString()}
                        </span>
                      )}
                    <button
                      onClick={() => handleAddPreferredTimezone(zone.name)}
                      disabled={preferredTimezones.includes(zone.name)}
                      className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
                      aria-label={`Add ${zone.name} to preferred`}
                    >
                      {preferredTimezones.includes(zone.name)
                        ? "Added"
                        : "Add to Preferred"}
                    </button>
                    {zone.name === userTimezone && (
                      <span
                        className="absolute top-2 right-2 text-indigo-500 text-xl"
                        title="Your timezone"
                      >
                        ★
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return <TimezoneDisplay />;
}
