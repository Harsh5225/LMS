import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("");

  //
  const [createCourse, { data, error, isLoading, isSuccess }] =
    useCreateCourseMutation();

  console.log("AddCourse rendered");
  const navigate = useNavigate();

  // backend api call to create course
  // this function will be called when the user clicks on the create button
  // it will call the createCourse mutation and pass the courseTitle and courseCategory as arguments
  const createCourseHandler = async () => {
    await createCourse({
      courseTitle: courseTitle,
      category: courseCategory,
    });
  };


  // this useEffect will be called when the createCourse mutation is successful
  // it will show a success message using the toast library

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully");
      navigate("/admin/course"); 
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);




  console.log("createCourse", createCourse);
  const getSelectedCategory = (value) => {
    // alert(`Selected category is ${value}`);
    setCourseCategory(value);
  };
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add course, add some basic details of your course
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
          explicabo!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-2">Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course Title"
          />
        </div>
        <div>
          <Label className="mb-2 ">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={() => navigate("/admin/course")}>
          Back
        </Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-2 animate-spin" />
              Please wait
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
