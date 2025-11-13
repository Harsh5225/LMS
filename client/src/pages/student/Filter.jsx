import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    // Convert "all" back to empty string for the API
    const priceValue = selectedValue === "all" ? "" : selectedValue;
    setSortByPrice(priceValue);
    handleFilterChange(selectedCategories, priceValue);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortByPrice("");
    handleFilterChange([], "");
  };

  const hasActiveFilters = selectedCategories.length > 0 || sortByPrice;
  // Convert empty string to "all" for the Select component
  const selectValue = sortByPrice || "all";

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-lg">Filters</h1>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-7 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <div className="mb-4">
          <Label className="text-sm font-medium mb-2 block">Sort by Price</Label>
          <Select value={selectValue} onValueChange={selectByPriceHandler}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All prices</SelectItem>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
      </div>

      <div>
        <h2 className="font-semibold mb-3 text-sm text-slate-700 dark:text-slate-300">
          Categories
        </h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center space-x-2 p-2 rounded-lg transition ${
                selectedCategories.includes(category.id)
                  ? "bg-indigo-50 dark:bg-indigo-900/20"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm cursor-pointer flex-1"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
