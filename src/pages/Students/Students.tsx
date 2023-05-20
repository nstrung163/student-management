import { getStudents } from "apis/students.api";
import classNames from "classnames";
import Skeleton from "pages/Skeleton";
import { useQueryString } from "pages/utils/utils";
import { Fragment } from "react";
// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Students as StudentType } from "types/student.type";

const TOTAL_RECORD_A_PAGE = 10;

export default function Students() {
  // const [students, setStudents] = useState<StudentType[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   getStudents(1, 10)
  //     .then((res) => {
  //       setStudents(res.data);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  const queryObj = useQueryString();
  const page = Number(queryObj.page) || 1;
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents(page, TOTAL_RECORD_A_PAGE),
    // staleTime: 60 * 1000,
    // cacheTime: 5 * 1000,
    keepPreviousData: true,
  });
  const totalRecord = Number(data?.headers["x-total-count"] || 0);
  const totalPage = Math.ceil(totalRecord / TOTAL_RECORD_A_PAGE);
  const students: StudentType[] = data?.data || [];
  console.log(
    "data",
    data?.data,
    "isLoading",
    isLoading,
    "isFetching",
    isFetching
  );
  return (
    <div>
      <h1 className="text-lg">Students</h1>
      {isLoading && <Skeleton />}
      {!isLoading && (
        <Fragment>
          <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Avatar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{student.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={student.avatar}
                        alt="student"
                        className="h-5 w-5"
                      />
                    </td>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {student.last_name}
                    </th>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/students/${student.id}`}
                        className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </Link>
                      <button className="font-medium text-red-600 dark:text-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li>
                  {page === 1 ? (
                    <span className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Previous
                    </span>
                  ) : (
                    <Link
                      to={`/students?page=${page - 1}`}
                      className="rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Previous
                    </Link>
                  )}
                </li>
                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = page === pageNumber;
                    return (
                      <li key={pageNumber}>
                        <Link
                          className={classNames(
                            "border border-gray-300  px-3 py-2 leading-tight hover:bg-gray-100 hover:text-gray-700",
                            {
                              "bg-gray-100 text-gray-700": isActive,
                              "bg-white text-gray-500": !isActive,
                            }
                          )}
                          to={`/students?page=${pageNumber}`}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    );
                  })}
                <li>
                  {page === totalPage ? (
                    <span className="cursor-not-allowed rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Next
                    </span>
                  ) : (
                    <Link
                      className="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      to={`/students?page=${page + 1}`}
                    >
                      Next
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </Fragment>
      )}
    </div>
  );
}
