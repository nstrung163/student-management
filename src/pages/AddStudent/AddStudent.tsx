import { addStudent, getStudent, updateStudent } from "apis/students.api";
import { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMatch, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Student } from "types/student.type";

type FormStateType = Omit<Student, "id"> | Student;

const initFormState: FormStateType = {
  avatar: "",
  btc_address: "",
  country: "",
  email: "",
  first_name: "",
  gender: "other",
  last_name: "",
};

type FormError =
  | {
      [key in keyof FormStateType]: string;
    }
  | null;

export default function AddStudent() {
  const [formState, setFormState] = useState<FormStateType>(initFormState);
  const match = useMatch("/students/add");
  const isAddMode = Boolean(match);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const addStudentMutation = useMutation({
    mutationKey: "addStudent",
    mutationFn: (body: FormStateType) => addStudent(body),
  });

  const updateStudentMutation = useMutation({
    mutationKey: ["updateStudent", id],
    mutationFn: (_) => updateStudent(id as string, formState as Student),
    onSuccess: (data) => {
      queryClient.setQueryData(["student", id], data);
    },
  });

  const studentQuery = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id as string),
    enabled: id !== undefined,
    staleTime: 10 * 1000,
  });

  // Set formState using prefetching data in Students
  useEffect(() => {
    if (studentQuery.data) {
      setFormState(studentQuery.data.data);
    }
  }, [studentQuery.data]);

  const errorForm: FormError = useMemo(() => {
    const error = isAddMode
      ? addStudentMutation.error
      : updateStudentMutation.error;
    if (
      isAxiosError<{ error: FormError }>(error) &&
      error.response?.status === 422
    ) {
      return error.response.data?.error;
    }
    return null;
  }, [isAddMode, addStudentMutation.error, updateStudentMutation.error]);

  const handleOnChange =
    (name: keyof FormStateType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: event.target.value }));
      console.log("errorForm", errorForm);
      if (errorForm) {
        addStudentMutation.reset();
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // try {
    //   const data = await mutateAsync(formState);
    //   console.log("Success", data);
    //   setFormState(initFormState);
    // } catch (error) {
    //   console.log(error);
    // }
    if (isAddMode) {
      addStudentMutation.mutate(formState, {
        onSuccess: (data) => {
          toast.success("Added student");
          setFormState(initFormState);
        },
      });
    } else {
      updateStudentMutation.mutate(undefined, {
        onSuccess: (data) => {
          toast.success("Updated student");
          setFormState(initFormState);
        },
      });
    }
  };

  return (
    <div>
      <h1 className="text-lg">{isAddMode ? "Add" : "Edit"} Student</h1>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formState.email}
            onChange={handleOnChange("email")}
          />
          <label
            htmlFor="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Email address
          </label>
          {errorForm && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Error </span>
              {errorForm.email}
            </p>
          )}
        </div>

        <div className="group relative z-0 mb-6 w-full">
          <div>
            <div>
              <div className="mb-4 flex items-center">
                <input
                  id="gender-1"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formState.gender === "Male"}
                  onChange={handleOnChange("gender")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  id="gender-2"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formState.gender === "Female"}
                  onChange={handleOnChange("gender")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="gender-3"
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formState.gender === "Other"}
                  onChange={handleOnChange("gender")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-3"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="country"
            id="country"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formState.country}
            onChange={handleOnChange("country")}
          />
          <label
            htmlFor="country"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Country
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formState.first_name}
              onChange={handleOnChange("first_name")}
            />
            <label
              htmlFor="first_name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              First Name
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formState.last_name}
              onChange={handleOnChange("last_name")}
            />
            <label
              htmlFor="last_name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Last Name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="avatar"
              id="avatar"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formState.avatar}
              onChange={handleOnChange("avatar")}
            />
            <label
              htmlFor="avatar"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Avatar Base64
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="btc_address"
              id="btc_address"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formState.btc_address}
              onChange={handleOnChange("btc_address")}
            />
            <label
              htmlFor="btc_address"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              BTC Address
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          {isAddMode ? "Submit" : "Update"}
        </button>
      </form>
    </div>
  );
}
